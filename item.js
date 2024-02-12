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
import { Totals } from "./totals.js"
import { Ingredient, makeStorageRecipe } from "./recipe.js"
import { Rational, zero, one } from "./rational.js"

export class Item {
    constructor(key, name, tier, weight) {
        this.key = key
        this.name = name
        this.tier = tier
        this.weight = Rational.from_string(weight)
        this.recipes = []
        this.uses = []
    }
    addRecipe(recipe) {
        this.recipes.push(recipe)
    }
    addUse(recipe) {
        this.uses.push(recipe)
    }
    produce(spec, rate, ignore, itemRates, parent, recipe) {
        let totals = new Totals()
        totals.itemRates = itemRates
        if(!recipe) {
            recipe = spec.getRecipe(this)
        }
        let gives = recipe.gives(this)
        totals.addItemRate(recipe.key, rate.div(gives), this.key, parent)
        let itemRate = totals.itemRates[recipe.key]['_rate']
        rate = itemRate
        rate = rate.ceil()
        // keep track of item rates to combine them
        totals.add(recipe, rate)
        totals.updateHeight(recipe, 0)
        if (ignore.has(recipe)) {
            return totals
        }
        if(recipe.ingredients.length > 0) {
            var ingredients = recipe.ingredients.map(function(r) { return new Ingredient(r.item, one) })
            console.log(ingredients)
        }
        // keep track for this recipe which we are going to get from storage
        var storageShopList = {}
        for (let ing of recipe.ingredients) {
            // do we have this item in storage?
            var target = rate.mul(ing.amount).toFloat()
            if(ing.item.key in spec.storageUsed) {
                console.log(`in store: ${ing.item.key} ${spec.storageUsed[ing.item.key][0][1]}`)
                // how many we have, sort from largest to smallest location
                for(let storage in spec.storageUsed[ing.item.key]) {

                    var storageName = `${recipe.key}-${spec.storageUsed[ing.item.key][storage][0]}`
                    // any available?
                    if(spec.storageUsed[ing.item.key][storage][1] > 0 && target > 0) {                        
                        console.log(`available: ${spec.storageUsed[ing.item.key][storage][1]}`)
                        var capable = Math.min(spec.storageUsed[ing.item.key][storage][1], target)
                        target -= capable;
                        spec.storageUsed[ing.item.key][storage][1] -= capable

                        if(!(storageName in storageShopList)) {
                            storageShopList[storageName] = []
                        }
                        storageShopList[storageName].push({'item': ing.item, 'amount': capable})
                    }
                }
            }

            if(target > 0) {
                let subtotals = ing.item.produce(spec, Rational.from_float(target), ignore, totals.itemRates, recipe.key, null)
                totals.combine(subtotals)
            }
        }
        console.log(recipe)
        // for each storage, add a recipe
        console.log(storageShopList)
        for(let storage in storageShopList) {
            // add location
            var recipeLocation = {
                "name": storage,
                "key_name": storage,
                "category": storage,
                "power": 1,
                "max": 1,
                "color": 14,
                "x": 0,
                "y": 0
            }
            spec.addStorageLocation(recipeLocation)           
            let subRecipe = makeStorageRecipe(recipeLocation.key_name, ingredients, recipeLocation.key_name)
            for(let ing of storageShopList[storage]) {
                let subtotals = ing.item.produce(spec, Rational.from_float(ing.amount), ignore, totals.itemRates, recipe.key, subRecipe)
                totals.combine(subtotals)
            }
            }

        return totals
    }
    iconPath() {
        return "images/item.png"
        //return "images/" + this.name + ".png"
    }
}

export function getItems(data) {
    let items = new Map()
    for (let d of data.items) {
        items.set(d.key_name, new Item(d.key_name, d.name, d.tier, d.weight))
    }
    return items
}
