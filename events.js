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
import { spec } from "./factory.js"
import { formatSettings } from "./fragment.js"
import { api } from "./api.js"

// build target events

export function plusHandler() {
    spec.addTarget()
    spec.updateSolution()
}

// tab events

export const DEFAULT_TAB = "graph"

export let currentTab = DEFAULT_TAB

export function clickTab(tabName) {
    currentTab = tabName
    d3.selectAll(".tab")
        .style("display", "none")
    d3.selectAll(".tab_button")
        .classed("active", false)
    d3.select("#" + tabName + "_tab")
        .style("display", "block")
    d3.select("#" + tabName + "_button")
        .classed("active", true)
    spec.setHash()
}

// shared events

export function toggleIgnoreHandler(d) {
    spec.toggleIgnore(d.recipe)
    spec.updateSolution()
}

// setting events

export function changeStrength(event) {
    log.add('log',`Strength set to ${event.target.value}`)
    spec.capacity.fixed = false

    spec.capacity.strength = Number(event.target.value)
    spec.updateSolution()
}
export function changePremium(event) {
    spec.capacity.fixed = false
    if(event.target.checked) {
        spec.capacity.premium = 0.15
        log.add('log','Premium enabled')
    } else {
        spec.capacity.premium = 0
        log.add('log','Premium enabled')
    }
    spec.updateSolution()
}

export function changePerk(event) {
    spec.capacity.fixed = false

    if(event.target.value == "strength") {
        spec.capacity.perk = "strength"
        spec.capacity.strengthperk = 1; 
        spec.capacity.postop = 0;
        log.add('log','Perk set to strength')
    } else if(event.target.value == "postop") {
        spec.capacity.perk = "postop"
        spec.capacity.strengthperk = 0;
        spec.capacity.postop = 0.15; 
        log.add('log','Perk set to postop')
    } else {
        spec.capacity.perk = "none"
        spec.capacity.strengthperk = 0;
        spec.capacity.postop = 0;
        log.add('log','Perks removed')
    }
    spec.updateSolution()
}


export function changeTruck(event) {
    spec.capacity.fixed = false
    spec.capacity.truck = Number(event.target.value)
    log.add('log',`Truck capacity set to ${event.target.value}`)
    spec.updateSolution()
}

export function changeCapacity(event) {
    spec.capacity.fixed = true
    spec.capacity.total = Number(event.target.value)
    spec.updateSolution()
}