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
import { Rational, zero } from "./rational.js"

export class Totals {
    constructor() {
        this.rates = new Map()
        this.heights = new Map()
        this.unfinished = new Map()
        this.waste = new Map()
        this.topo = []
        this.itemRates = {}
    }
    add(recipe, rate) {
        this.topo.push(recipe)
        this.rates.set(recipe, rate)
    }
    addUnfinished(recipe, rate) {
        this.unfinished.set(recipe, (this.unfinished.get(recipe) || zero).add(rate))
    }
    addWaste(recipe, rate) {
        this.waste.set(recipe, (this.waste.get(recipe) || zero).add(rate))
    }
    addItemRate(recipe, amount, item, path) {

        if(!(recipe in this.itemRates)) {
            this.itemRates[recipe] = {'_rate': zero}
        }
        if(!(item in this.itemRates[recipe])) {
            this.itemRates[recipe][item] = {}
        }
        this.itemRates[recipe][item][path] = amount
        this.itemRates[recipe][item]['_rate'] = zero
        for (let i in this.itemRates[recipe][item]) {
            if(i != "_rate") {
                this.itemRates[recipe][item]['_rate'] = this.itemRates[recipe][item]['_rate'].add(this.itemRates[recipe][item][i]);
            }
        }
        for(let i in this.itemRates[recipe]) {
            if(i != "_rate") {
                if(this.itemRates[recipe]['_rate'].less(this.itemRates[recipe][i]['_rate'])) {
                    this.itemRates[recipe]['_rate'] = this.itemRates[recipe][i]['_rate']
                }
            }
        }
        
    }
    getWaste(itemName) {
        var waste = this.waste[itemName]
        if (!waste) {
            return zero
        }
        return waste
    }
    updateHeight(recipe, height) {
        let knownHeight = this.heights.get(recipe)
        if (knownHeight === undefined || knownHeight < height) {
            this.heights.set(recipe, height)
        }
    }
    combine(other) {
        let newTopo = []
        for (let recipe of this.topo) {
            if (!other.rates.has(recipe)) {
                newTopo.push(recipe)
            }
        }
        newTopo = newTopo.concat(other.topo)
        // sort from largest to smallest rate to be able to combine rates
        //other.rates = new Map([...other.rates.entries()].sort((a, b) => b[1].toFloat() - a[1].toFloat()));
        //console.log(other)
        for (var item in other.itemRates) {
            //this.addItemRate(item, other.itemRates[item])
        }
        for (let [recipe, rate] of other.rates) {
            this.add(recipe, rate)
        }
        for (let [item, rate] of other.unfinished) {
            this.addUnfinished(item, rate)
        }
        for (let [item, rate] of other.waste) {
            this.addWaste(item, rate)
        }
        this.topo = newTopo
        for (let [recipe, height] of other.heights) {
            this.updateHeight(recipe, height + 1)
        }
    }
}
