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
import { DEFAULT_RATE, DEFAULT_RATE_PRECISION, DEFAULT_COUNT_PRECISION, longRateNames } from "./align.js"
import { dropdown } from "./dropdown.js"
import { DEFAULT_TAB, clickTab } from "./events.js"
import { spec, resourcePurities, DEFAULT_BELT } from "./factory.js"
import { Rational } from "./rational.js"
import { colors } from "./colors.js"

// There are several things going on with this control flow. Settings should
// work like this:
// 1) Settings are parsed from the URL fragment into the settings Map.
// 2) Each setting's `render` function is called.
// 3) If the setting is not present in the map, a default value is used.
// 4) The setting is applied.
// 5) The setting's GUI is placed into a consistent state.
// Remember to add the setting to fragment.js, too!

// tab

const colorList = [
    colors.Red[700], // base
    colors.Blue[700], // foundry
    colors.Purple[800], // factory
    colors.Green[700], // sorting
    colors.Yellow[800], // filtering
    colors.Brown[600], // quarry
    colors.Orange[700], // sawmill
    colors.Cyan[700], // treated water
    colors.Pink[700], // house
    colors["Deep Purple"][700], // illegal
    colors["Blue Grey"][700], // oil
    colors["Light Green"][700], // food
    colors.Orange[700], // logs
    colors.Cyan[800], // water
]

function renderTab(settings) {
    let tabName = DEFAULT_TAB
    if (settings.has("tab")) {
        tabName = settings.get("tab")
    }
    clickTab(tabName)
}

// build targets

function renderTargets(settings) {
    spec.buildTargets = []
    d3.select("#targets li.target").remove()

    let targetSetting = settings.get("items")
    if (targetSetting !== undefined && targetSetting !== "") {
        let targets = targetSetting.split(",")
        for (let targetString of targets) {
            let parts = targetString.split(":")
            let itemKey = parts[0]
            let target = spec.addTarget(itemKey)
            let type = parts[1]
            if (type === "f") {
                target.setBuildings(parts[2])
            } else if (type === "r") {
                target.setRate(parts[2])
            } else {
                throw new Error("unknown target type")
            }
        }
    } else {
        spec.addTarget()
    }
}

// ignore

function renderIgnore(settings) {
    spec.ignore.clear()
    // UI will be rendered later, as part of the solution.
    let ignoreSetting = settings.get("ignore")
    if (ignoreSetting !== undefined && ignoreSetting !== "") {
        let ignore = ignoreSetting.split(",")
        for (let recipeKey of ignore) {
            let recipe = spec.recipes.get(recipeKey)
            spec.ignore.add(recipe)
        }
    }
}

// overclock

function renderOverclock(settings) {
    spec.overclock.clear()
    // UI will be rendered later, as part of the solution.
    let overclockSetting = settings.get("overclock")
    if (overclockSetting !== undefined && overclockSetting !== "") {
        let overclock = overclockSetting.split(",")
        for (let pair of overclock) {
            let [recipeKey, percentString] = pair.split(":")
            let recipe = spec.recipes.get(recipeKey)
            let percent = Rational.from_string(percentString).div(Rational.from_float(1))
            spec.setOverclock(recipe, percent)
        }
    }
}

// display rate

function rateHandler() {
    spec.format.setDisplayRate(this.value)
    spec.updateSolution()
}

function renderRateOptions(settings) {
    let rateName = DEFAULT_RATE
    if (settings.has("rate")) {
        rateName = settings.get("rate")
    }
    spec.format.setDisplayRate(rateName)
    let rates = []
    for (let [rateName, longRateName] of longRateNames) {
        rates.push({rateName, longRateName})
    }
    let form = d3.select("#display_rate")
    form.selectAll("*").remove()
    let rateOption = form.selectAll("span")
        .data(rates)
        .join("span")
    rateOption.append("input")
        .attr("id", d => d.rateName + "_rate")
        .attr("type", "radio")
        .attr("name", "rate")
        .attr("value", d => d.rateName)
        .attr("checked", d => d.rateName === rateName ? "" : null)
        .on("change", rateHandler)
    rateOption.append("label")
        .attr("for", d => d.rateName + "_rate")
        .text(d => "items/" + d.longRateName)
    rateOption.append("br")
}

// precisions

function renderPrecisions(settings) {
    spec.format.ratePrecision = DEFAULT_RATE_PRECISION
    if (settings.has("rp")) {
        spec.format.ratePrecision = Number(settings.get("rp"))
    }
    d3.select("#rprec").attr("value", spec.format.ratePrecision)
    spec.format.countPrecision = DEFAULT_COUNT_PRECISION
    if (settings.has("cp")) {
        spec.format.countPrecision = Number(settings.get("cp"))
    }
    d3.select("#cprec").attr("value", spec.format.countPrecision)
}

// belt

function beltHandler(belt) {
    spec.capacity.belt = belt
    spec.capacity.fixed = false
    spec.capacity.trailer = belt.rate.toFloat()
    //spec.updateCapacity()
    spec.updateSolution()
}

function renderBelts(settings) {

    let belts = []
    for (let [beltKey, belt] of spec.belts) {
        belts.push(belt)
    }
    let form = d3.select("#belt_selector")
    form.selectAll("*").remove()
    let beltOption = form.selectAll("span")
        .data(belts)
        .join("span")
    beltOption.append("input")
        .attr("id", d => "trailer-" + d.key)
        .attr("type", "radio")
        .attr("name", "belt")
        .attr("value", d => d.key)
        //.attr("checked", d => d === spec.belt ? "" : null)
        .on("change", beltHandler)
    beltOption.append("label")
        .attr("for", d => "trailer-" + d.key)

//        .append("img")
            .classed("icon", true)
            .attr("src", d => d.iconPath())
            .attr("width", 32)
            .attr("height", 32)
            .text(d => d.name)
}

// alternate recipes

function changeAltRecipe(recipe) {
    log.add('log',`Changed recipe ${recipe.key}`)
    spec.setRecipe(recipe)
    spec.updateSolution()
}

function renderIngredient(ingSpan) {
    ingSpan.classed("ingredient", true)
        .attr("title", d => d.item.name)
        .text(d => spec.format.count(d.amount) + "x " + d.item.name)
}

function renderAltRecipes(settings) {
    spec.altRecipes = new Map()
    if (settings.has("alt")) {
        if(settings.get("alt").length > 0) {
            let alt = settings.get("alt").split(",")
            for (let recipeKey of alt) {
                let recipe = spec.recipes.get(recipeKey)
                spec.setRecipe(recipe)
            }
        }
    }


    // get all alt recipes and group by building
    let buildingAltRecipes = {}
    for (let tier of spec.itemTiers) {
        for (let item of tier) {
            if (item.recipes.length > 1) {
                for(let recipe of item.recipes) {
                    let building = spec.buildings.get(recipe.category)[0]
                    recipe.color = building.color

                    /*
                    // this breaks stuff
                    if(recipe.key == "flint") {
                        recipe.category = "deep-quarry"
                        building = spec.buildings.get(recipe.category)[0]
                    } else if(recipe.key == "substitute-gold") {
                        recipe.category = "sorting-facility"
                        building = spec.buildings.get(recipe.category)[0]
                    }
                    */

                    if(!(recipe.category in buildingAltRecipes)) {
                        buildingAltRecipes[recipe.category] = {
                            'building': building,
                            'recipes': []
                        }
                    }
                    if(!buildingAltRecipes[recipe.category]['recipes'].includes(recipe)) {
                        buildingAltRecipes[recipe.category]['recipes'].push(recipe)
                    }
                }
            }
        }
    }

    let div = d3.select("#alt_recipe_settings")
    div.selectAll("*").remove()
    let buildings = div.selectAll("div")
        .data(Object.values(buildingAltRecipes))
        .join("div")
    var locationbox = buildings
        .attr('class', d => 'alt-location-' + d.building.key)
        .append('div')
    /*
        .classed("alt-recipe-location", true)
    locationbox.append("img")
            .attr("src", d => d.building.iconPath())
            .attr("title", d => d.building.name)
    locationbox.append("span")
            .text(d => d.building.name)
    */
    var recipeboxlist = buildings.append("div")
        .attr('class','alt-recipe-list')
        .selectAll("div")
        .data(d => d.recipes)
        .join('div')

    let recipelabel = recipeboxlist.classed("alt-recipe-label",true)
        .attr("style", d => ("background-color: " + d3.rgb(colorList[d.color]).darker())+ "; border: 1px solid " + d3.color(colorList[d.color]))
        
    recipelabel.append("input")
        .on("change", function(d, i, nodes) {
            changeAltRecipe(d)
        })
        .attr("id", d => "input-" + d.key)
        .attr("name", d => d.key)
        .attr("type", "checkbox")
            .filter(d => d.key in spec.altRecipeList)
            .property("checked", true)

    let labelbox = recipelabel.append("label")
        .attr("for", d => "input-" + d.key)

    labelbox.append("div")
        .classed("alt-recipe-title", true)
        .text(d => d.name)
    let recipebox = labelbox.append("div")
        .classed("alt-recipe-box", true)
    
    var locationbox = recipebox.append("div")
        .classed("alt-recipe-location", true)
    locationbox.append("img")
        .attr("src", d => spec.buildings.get(d.category)[0].iconPath())
        .attr("title", d => spec.buildings.get(d.category)[0].name)
    locationbox.append("span")
        .text(d => spec.buildings.get(d.category)[0].name)

    recipebox.append("div")
        .classed("alt-recipe-cost", true)
        .text(d => d.cost > 0 ? `$ ${d.cost.toLocaleString()}` : `Free`)

    let ingredientSpan = recipebox.append("span")
        .classed("alt-ingredients", true)
        .selectAll("span")
        .data(d => d.ingredients)
        .join("div")
    renderIngredient(ingredientSpan)
    recipebox.append("span")
        .classed("arrow", true)
        .text(" \u2192 ")
    let productSpan = recipebox.append("span")
        .classed("alt-ingredients", true)
        .selectAll("span")
        .data(d => d.products)
        .join("div")
    renderIngredient(productSpan)

    buildings.append('hr')
}

// miners

function renderConfiguration(settings) {

    // load url settings or cache?
    var loadCache = (spec.cache && (settings.size == 0 || (settings.size == 1 && settings.has("tab"))))
    if(settings.has("strength")) {
        d3.select("#strength").property("value", settings.get("strength"))
        spec.capacity.strength = parseInt(settings.get("strength"))
    } else if(loadCache) {
        d3.select("#strength").property("value",spec.cache.strength)
        spec.capacity.strength = spec.cache.strength
    }

    if(settings.has("truck") || (loadCache && spec.cache.truck == 6900)) {
        d3.select("#truck-mk15").property("checked",true)
        spec.capacity.truck = 6900
    } else {
        d3.select("#truck-none").property("checked",true)
        spec.capacity.truck = 0
    }

    let beltKey = DEFAULT_BELT
    if(settings.has("trailer")) {
        d3.select("#trailer-"+settings.get("trailer")).property("checked",true)
        beltKey = settings.get("trailer")
    } else if(loadCache && spec.cache.belt !== 0) {
        d3.select("#trailer-"+spec.cache.belt.key).property("checked",true)
        beltKey = spec.cache.belt.key
    } else {
        d3.select("#trailer-mk14").property("checked",true)
    }
    spec.capacity.belt = spec.belts.get(beltKey)
    beltHandler(spec.capacity.belt)

    if(settings.has("premium") || (loadCache && spec.cache.premium === 0)) {
        d3.select("#premium").property("checked",false)
        spec.capacity.premium = 0
    } else {
        d3.select("#premium").property("checked",true)
        spec.capacity.premium = 0.15
    }

    if(settings.get("perk") == "strength" || (loadCache && spec.cache.perk == "strength")) {
        d3.select("#perk-strength").property("checked",true)
        spec.capacity.perk = "strength"
        spec.capacity.strengthperk = 1; 
        spec.capacity.postop = 0; 
    } else if(settings.get("perk") == "postop" || (loadCache && spec.cache.perk == "postop")) {
        d3.select("#perk-postop").property("checked",true)
        spec.capacity.perk = "postop"
        spec.capacity.strengthperk = 0;
        spec.capacity.postop = 0.15; 
    } else {
        d3.select("#perk-none").property("checked",true)
        spec.capacity.perk = "none"
        spec.capacity.strengthperk = 0;
        spec.capacity.postop = 0;
    }
    
    spec.updateSolution()

}

function mineHandler(d) {
    spec.setMiner(d.recipe, d.miner, d.purity)
    spec.updateSolution()
}

function renderResources(settings) {
    spec.initMinerSettings()
    if (settings.has("miners")) {
        let miners = settings.get("miners").split(",")
        for (let minerString of miners) {
            let [recipeKey, minerKey, purityKey] = minerString.split(":")
            let recipe = spec.recipes.get(recipeKey)
            let miner = spec.miners.get(minerKey)
            let purity = resourcePurities[Number(purityKey)]
            spec.setMiner(recipe, miner, purity)
        }
    }

    let div = d3.select("#resource_settings")
    div.selectAll("*").remove()
    let resources = []
    for (let [recipe, {miner, purity}] of spec.minerSettings) {
        let minerDefs = spec.buildings.get(recipe.category)
        let purities = []
        for (let purityDef of resourcePurities) {
            let miners = []
            for (let minerDef of spec.buildings.get(recipe.category)) {
                let selected = miner === minerDef && purity === purityDef
                miners.push({
                    recipe: recipe,
                    purity: purityDef,
                    miner: minerDef,
                    selected: selected,
                    id: `miner.${recipe.key}.${purityDef.key}.${minerDef.key}`
                })
            }
            purities.push({miners, purityDef})
        }
        resources.push({recipe, purities, minerDefs})
    }
    let resourceTable = div.selectAll("table")
        .data(resources)
        .join("table")
            .classed("resource", true)
    let header = resourceTable.append("tr")
    header.append("th")
        .append("img")
            .classed("icon", true)
            .attr("src", d => d.recipe.iconPath())
            .attr("width", 32)
            .attr("height", 32)
            .attr("title", d => d.recipe.name)
    header.selectAll("th")
        .filter((d, i) => i > 0)
        .data(d => d.minerDefs)
        .join("th")
            .append("img")
                .classed("icon", true)
                .attr("src", d => d.iconPath())
                .attr("width", 32)
                .attr("height", 32)
                .attr("title", d => d.name)
    let purityRow = resourceTable.selectAll("tr")
        .filter((d, i) => i > 0)
        .data(d => d.purities)
        .join("tr")
    purityRow.append("td")
        .text(d => d.purityDef.name)
    let cell = purityRow.selectAll("td")
        .filter((d, i) => i > 0)
        .data(d => d.miners)
        .join("td")
    cell.append("input")
        .attr("id", d => d.id)
        .attr("type", "radio")
        .attr("name", d => d.recipe.key)
        .attr("checked", d => d.selected ? "" : null)
        .on("change", mineHandler)
    cell.append("label")
        .attr("for", d => d.id)
        .append("svg")
            .attr("viewBox", "0,0,32,32")
            .style("width", 32)
            .style("height", 32)
            .append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", 32)
                .attr("height", 32)
                .attr("rx", 4)
                .attr("ry", 4)
}

export function renderSettings(settings) {
    renderTargets(settings)
    renderIgnore(settings)
    //renderOverclock(settings)
    //renderRateOptions(settings)
    //renderPrecisions(settings)
    renderBelts(settings)
    renderAltRecipes(settings)
    renderResources(settings)
    renderConfiguration(settings)
    renderTab(settings)
}