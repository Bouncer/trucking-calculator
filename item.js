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
        // keep track for this recipe which we are going to get from storage
        var storageShopList = {}
        for (let ing of recipe.ingredients) {
            // do we have this item in storage?
            var target = rate.mul(ing.amount).toFloat()

            if(ing.item.key in spec.storageUsed) {
                // how many we have, sort from largest to smallest location
                for(let storage in spec.storageUsed[ing.item.key]) {
                    var storageName = `${spec.storageUsed[ing.item.key][storage][0]}|${recipe.key}`
                    // any available?
                    if(spec.storageUsed[ing.item.key][storage][1] > 0 && target > 0) {                        
                        console.log(`available: ${spec.storageUsed[ing.item.key][storage][1]} at ${storageName}`)
                        var capable = Math.min(spec.storageUsed[ing.item.key][storage][1], target)
                        target -= capable;
                        spec.storageUsed[ing.item.key][storage][1] -= capable

                        if(!(storageName in storageShopList)) {
                            storageShopList[storageName] = []
                        }
                        //ing.recipes = []
                        // check if ingredient is already listed
                        if(totals.rates.has(ing)) {
                        }
                        storageShopList[storageName].push(new Ingredient(ing.item, Rational.from_float(capable)))
                    }
                }
            }

            if(target > 0) {
                let subtotals = ing.item.produce(spec, Rational.from_float(target), ignore, totals.itemRates, recipe.key, null)
                totals.combine(subtotals)
            }
        }
        // for each storage, add a recipe
        for(let storage in storageShopList) {
            console.log(`storage: ${storage}`)
            console.log(storageShopList[storage])
            // add location
            let storageId = storage.split('|')[1]

            let title = 'Storage'
            let color = 14
            if(storageId == 'biz_train') {
                color = 15
            } else if(storageId == 'inventory') {
                title = 'Inventory'
                color = 16
            } else if(storageId.startsWith('vehicle-')) {
                title = 'Vehicle'
                color = 17
            } else if(storageId.startsWith('faq_')) {
                color = 18
            }

            var recipeLocation = {
                "name": 'Storage',
                "key_name": storage,
                "title": spec.getStorageInfo(storageId).name,
                "category": storage,
                "power": 1,
                "max": 1,
                "color": 14,
                "x": 0,
                "y": 0
            }
            spec.addStorageLocation(recipeLocation)
            // check if recipe exists
            console.log(recipeLocation.key_name)
            console.log(spec.recipes)
            if(!spec.recipes.get(recipeLocation.key_name)) {
                var subRecipe = makeStorageRecipe(recipeLocation, storageShopList[storage])
            } else {
                var subRecipe = spec.recipes.get(recipeLocation.key_name)
                console.log('---This should never happen')
            }
            for(let ing of storageShopList[storage]) {
                //ing.item.target = recipe.key
                if(!(subRecipe.key in itemRates)) {
                    let subtotals = ing.item.produce(spec, one, ignore, totals.itemRates, subRecipe.key, subRecipe)
                    totals.combine(subtotals)
                } else {
                    console.log('blap')
                    console.log(subRecipe)
                    //totals.addItemRate(subRecipe.key, one, ing.item.key, subRecipe.key)
                    //totals.rates.set(subRecipe, one)
                }
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
