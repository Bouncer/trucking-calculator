/*Copyright 2019 Kirk McDonald

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.*/
import { Formatter } from "./align.js"
import { displayItems } from "./display.js"
import { formatSettings } from "./fragment.js"
import { Rational, zero, half, one } from "./rational.js"
import { BuildTarget } from "./target.js"
import { Totals } from "./totals.js"
import { renderTotals } from "./visualize.js"

const DEFAULT_ITEM_KEY = "concrete"

let minerCategories = new Set(["mineral", "oil"])

export let resourcePurities = [
    {key: "0", name: "Impure", factor: half},
    {key: "1", name: "Normal", factor: one},
    {key: "2", name: "Pure", factor: Rational.from_float(2)},
]

export let DEFAULT_PURITY = resourcePurities[1]

export let DEFAULT_BELT = "mk14"

class FactorySpecification {
    constructor() {
        // Game data definitions
        this.items = null
        this.recipes = null
        this.buildings = null
        this.belts = null

        this.itemTiers = []

        this.buildTargets = []

        // Map resource recipe to {miner, purity}
        this.miners = new Map()
        this.minerSettings = new Map()

        // Map recipe to overclock factor
        this.overclock = new Map()

        // Map item to recipe
        this.altRecipes = new Map()

        this.belt = null

        // cargo capacity
        
        this.capacity = {
            "fixed": false,
            "strength": 30,
            "premium": 0,
            "strengthperk": 0,
            "truck": 0,
            "postop": 0,
            "trailer": 0,
            "total": Rational.from_float(0)
        }

        if(localStorage.capacity) {
            this.capacity = JSON.parse(localStorage.getItem("capacity"))
        }
        this.updateCapacity()
        this.ignore = new Set()

        this.format = new Formatter()
    }
    setData(items, recipes, buildings, belts) {
        this.items = items
        let tierMap = new Map()
        for (let [itemKey, item] of items) {
            // ignore -1
            if(item.tier >= 0) {
                let tier = tierMap.get(item.tier)
                if (tier === undefined) {
                    tier = []
                    tierMap.set(item.tier, tier)
                }
                tier.push(item)
            }
        }
        this.itemTiers = []
        for (let [tier, tierItems] of tierMap) {
            tierItems = tierItems.sort((a, b) => a.key > b.key)
            this.itemTiers.push(tierItems)
        }
        this.itemTiers.sort((a, b) => a[0].tier - b[0].tier)
        this.recipes = recipes
        this.buildings = new Map()
        for (let building of buildings) {
            let category = this.buildings.get(building.category)
            if (category === undefined) {
                category = []
                this.buildings.set(building.category, category)
            }
            category.push(building)
            if (minerCategories.has(building.category)) {
                this.miners.set(building.key, building)
            }
        }
        this.belts = belts
        this.updateCapacity()
        this.belt = belts.get(DEFAULT_BELT)
        this.capacity.trailer = this.belt.rate.toFloat()
        this.initMinerSettings()
    }
    initMinerSettings() {
        this.minerSettings = new Map()
        for (let [recipeKey, recipe] of this.recipes) {
            if (minerCategories.has(recipe.category)) {
                let miners = this.buildings.get(recipe.category)
                // Default to miner mk1.
                let miner = miners[0]
                // Default to normal purity.
                let purity = DEFAULT_PURITY
                this.minerSettings.set(recipe, {miner, purity})
            }
        }
    }
    getRecipe(item) {
        // TODO: Alternate recipes.
        let recipe = this.altRecipes.get(item)
        if (recipe === undefined) {
            return item.recipes[0]
        } else {
            return recipe
        }
    }
    setRecipe(recipe) {
        let item = recipe.product.item
        if (recipe === item.recipes[0]) {
            this.altRecipes.delete(item)
        } else {
            this.altRecipes.set(item, recipe)
        }
    }
    getBuilding(recipe) {
        if (recipe.category === null) {
            return null
        } else if (this.minerSettings.has(recipe)) {
            return this.minerSettings.get(recipe).miner
        } else {
            // NOTE: Only miners offer alternative buildings. May need to
            // revisit this if higher tiers of constructors are added.
            return this.buildings.get(recipe.category)[0]
        }
    }
    getOverclock(recipe) {
        return one;
        //return this.overclock.get(recipe) || one
    }
    setOverclock(recipe, overclock) {
        if (overclock.equal(one)) {
            this.overclock.delete(recipe)
        } else {
            this.overclock.set(recipe, overclock)
        }
    }
    // Returns the recipe-rate at which a single building can produce a recipe.
    // Returns null for recipes that do not have a building.
    getRecipeRate(recipe) {
        let building = this.getBuilding(recipe)
        if (building === null) {
            return null
        }
        return building.getRecipeRate(this, recipe)
    }
    getResourcePurity(recipe) {
        return one;
        //return this.minerSettings.get(recipe).purity
    }
    setMiner(recipe, miner, purity) {
        this.minerSettings.set(recipe, {miner, purity})
    }
    getCount(recipe, rate) {
        let building = this.getBuilding(recipe)
        if (building === null) {
            return zero
        }
        return building.getCount(this, recipe, rate)
    }
    getBeltCount(rate) {
        return rate.div(Rational.from_float(this.capacity.total))
    }
    getPerTrip(weight) {
        return Math.floor(this.capacity.total / weight.toFloat());
    }
    getPowerUsage(recipe, rate, itemCount) {
        let building = this.getBuilding(recipe)
        if (building === null) {
            return {average: zero, peak: zero}
        }
        let count = this.getCount(recipe, rate)
        let average = building.power.mul(count)
        let peak = building.power.mul(count.ceil())
        let overclock = this.overclock.get(recipe)
        if (overclock !== undefined) {
            // The result of this exponent will typically be irrational, so
            // this approximation is a necessity. Because overclock is limited
            // to the range [1.0, 2.5], any imprecision introduced by this
            // approximation is minimal (and is probably less than is present
            // in the game itself).
            let overclockFactor = Rational.from_float(Math.pow(overclock.toFloat(), 1.6))
            average = average.mul(overclockFactor)
            peak = peak.mul(overclockFactor)
        }
        return {average, peak}
    }
    addTarget(itemKey) {
        if (itemKey === undefined) {
            itemKey = DEFAULT_ITEM_KEY
        }

        // if it can be exported, use that instead
        var item = this.items.get("export-"+itemKey)
        if(item === undefined) {
            item = this.items.get(itemKey)
        }

        let target = new BuildTarget(this.buildTargets.length, itemKey, item, this.itemTiers)
        this.buildTargets.push(target)
        d3.select("#targets").insert(() => target.element, "#plusButton")
        return target
    }
    removeTarget(target) {
        this.buildTargets.splice(target.index, 1)
        for (let i=target.index; i < this.buildTargets.length; i++) {
            this.buildTargets[i].index--
        }
        d3.select(target.element).remove()
    }
    toggleIgnore(recipe) {
        if (this.ignore.has(recipe)) {
            this.ignore.delete(recipe)
        } else {
            this.ignore.add(recipe)
        }
    }
    solve() {
        let totals = new Totals()
        for (let target of this.buildTargets) {
            let subtotals = target.item.produce(this, target.getRate(), this.ignore, totals.itemRates, target.item.key)
            //if(totals.rates.has(target.recipe))
            /*
            if(totals.topo[target.item.key]) {
                console.log(target.item.key)
            }
            */
            totals.combine(subtotals)
        }
        return totals
    }
    setHash() {
        window.location.hash = "#" + formatSettings()
    }
    updateCapacity() {
        this.capacity.total = Math.round((this.capacity.strength * 10 * (1 + this.capacity.strengthperk + this.capacity.premium)) + (this.capacity.truck * (1 + this.capacity.postop + this.capacity.premium)) + (this.capacity.trailer * (1 + this.capacity.premium + this.capacity.postop)))
        
        localStorage.setItem("capacity", JSON.stringify(this.capacity));
        
        let form = d3.select("#capacity").property("value", this.capacity.total)
    }
    updateSolution() {
        if(!this.capacity.fixed) {
            this.updateCapacity()
        }
        let totals = this.solve()
        displayItems(this, totals, this.ignore)
        renderTotals(totals, this.buildTargets, this.ignore)
        this.setHash()
    }
}

export let spec = new FactorySpecification()
window.spec = spec
