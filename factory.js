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
import { api } from "./api.js"
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
        this.altRecipeList = {}

        // cargo capacity settings
        this.capacity = {
            "fixed": false,
            "belt": 0,
            "strength": 30,
            "premium": 0,
            "perk": "none",
            "strengthperk": 0,
            "truck": 0,
            "postop": 0,
            "trailer": 0,
            "totaltrunk": 0,
            "totaltrailer": 0,
            "totalinv": 0,
            "total": Rational.from_float(0)
        }

                
        if(localStorage.capacity) {
            this.cache = JSON.parse(localStorage.getItem("capacity"))
        } else {
            this.cache = false
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
        this.capacity.belt = belts.get(DEFAULT_BELT)
        this.capacity.trailer = this.capacity.belt.rate.toFloat()
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
        // remove
        if(recipe.key in this.altRecipeList) {
            for(let i of recipe.products) {
                this.altRecipes.delete(i.item, recipe)
            }
            delete this.altRecipeList[recipe.key]
        } else {
            for(let i of recipe.products) {
                this.altRecipes.set(i.item, recipe)
            }
            this.altRecipeList[recipe.key] = recipe
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
    getMagicTrip(items, rate) {
        // theoretical maximum rate
        var recipeWeight = 0
        for(let i of items) {
            recipeWeight += i.weight.toFloat()
        }
        items.sort((a,b) => b.weight.toFloat() - a.weight.toFloat())

        if(recipeWeight > 0) {
            var tripRate = Math.floor(this.capacity.total / recipeWeight);
        } else {
            var tripRate = rate;
        }
        
        // because we cannot split items in pieces, calculate how to distribute
        var searching = true;
        while(searching) {
            // start with heaviest ingredients
            var attempt = true;
            var storages = [
                ['inventory', this.capacity.totalinv],
                ['trunk', this.capacity.totaltrunk],
                ['trailer', this.capacity.totaltrailer]
            ]
            storages.sort((a,b) => a[1] - b[1])

            for(let i in items) {
                items[i]["storage"] = {
                    'inventory': 0,
                    'trunk': 0,
                    'trailer': 0,
                    'total': 0
                }

                if(recipeWeight > 0) {
                    var target = items[i].amount.toFloat() * tripRate;
                    for(var s in storages) {
                        // is there still room?
                        if(storages[s][1] >= items[i].item.weight.toFloat()) {
                            // how much can we add?
                            var capable = Math.min(Math.floor(storages[s][1] / items[i].item.weight.toFloat()), target)
                            target -= capable;
                            items[i].storage[storages[s][0]] += capable
                            items[i].storage['total'] += capable
                            storages[s][1] -= capable * items[i].item.weight.toFloat()
                            //console.log(s[1])
                        }
                    }
                    // try a smaller rate if it doesn't fit
                    if(target >= items[i]['storage']['total']) {
                        tripRate -= 1;
                        attempt = false;
                        break
                    }
                } else {
                    items[i]["storage"]["inventory"] = rate;
                    items[i]["storage"]["total"] = rate;
                }
            }
            if(tripRate <= 1 || attempt) {
                searching = false;
                var tripCount = Math.ceil(rate / tripRate)

                for(let item in items) {
                    let triptext = [];
                    if(this.capacity.totaltrailer > 0) {
                        triptext.push(`${items[item]['storage']['trailer'].toLocaleString()}x`)
                    }
                    if(this.capacity.totaltrunk > 0) {
                        triptext.push(`${items[item]['storage']['trunk'].toLocaleString()}x`)
                    }
                    if(this.capacity.totalinv > 0) {
                        triptext.push(`${items[item]['storage']['inventory'].toLocaleString()}x`)
                    }
                    items[item]['triptext'] = triptext.join(' + ')
                }

                return [items, tripCount]
            }
        }
    }
    getPerTrip(weight) {
        // how many times could we fit this in one trip?
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
        log.add('log',`Added target ${itemKey}`)
        return target
    }
    removeTarget(target) {
        this.buildTargets.splice(target.index, 1)
        for (let i=target.index; i < this.buildTargets.length; i++) {
            this.buildTargets[i].index--
        }
        d3.select(target.element).remove()
        log.add('log',`Removed target ${target.itemKey}`)
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
//        this.capacity.total = Math.round((this.capacity.strength * 10 * (1 + this.capacity.strengthperk + this.capacity.premium)) + (this.capacity.truck * (1 + this.capacity.postop + this.capacity.premium)) + (this.capacity.trailer * (1 + this.capacity.premium + this.capacity.postop)))
        this.capacity.totalinv = Math.floor(this.capacity.strength * 10 * (1 + this.capacity.strengthperk + this.capacity.premium))
        this.capacity.totaltrunk = Math.floor(this.capacity.truck * (1 + this.capacity.postop + this.capacity.premium))
        this.capacity.totaltrailer = Math.floor(this.capacity.trailer * (1 + this.capacity.premium + this.capacity.postop))
        this.capacity.total = Math.floor(this.capacity.totalinv + this.capacity.totaltrunk + this.capacity.totaltrailer)
        localStorage.setItem("capacity", JSON.stringify(this.capacity));
        
        d3.select("#capacity-inventory").text(`${this.capacity.totalinv.toLocaleString()} kg`)
        d3.select("#capacity-trunk").text(`${this.capacity.totaltrunk.toLocaleString()} kg`)
        d3.select("#capacity-trailer").text(`${this.capacity.totaltrailer.toLocaleString()} kg`)
        d3.select("#capacity").text(`${this.capacity.total.toLocaleString()} kg`)
    }
    updateSolution() {
        if(!this.capacity.fixed) {
            this.updateCapacity()
        }
        let totals = this.solve()
        displayItems(this, totals, this.ignore)
        renderTotals(totals, this.buildTargets, this.ignore)
        this.setHash()
        api.update(totals)
    }
}

export let spec = new FactorySpecification()
window.spec = spec
