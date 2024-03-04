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
import { toggleIgnoreHandler } from "./events.js"
import { spec } from "./factory.js"
import { Rational, zero, one } from "./rational.js"
import { colors } from "./colors.js"

class Header {
    constructor(text, colspan) {
        this.text = text
        this.colspan = colspan
    }
}

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
    colors.Indigo[100],
    colors["Deep Orange"][300],
    colors.Lime[400],
    colors.Indigo[200],
    colors["Deep Orange"][300]
]

function changeOverclock(d) {
    let hundred = Rational.from_float(100)
    let twoFifty = Rational.from_float(250)
    let x = Rational.from_string(this.value).floor()
    if (x.less(one)) {
        x = one
    }
    if (twoFifty.less(x)) {
        x = twoFifty
    }
    x = x.div(hundred)
    spec.setOverclock(d.recipe, x)
    spec.updateSolution()
}

// Remember these values from update to update, to make it simpler to reuse
// elements.
let displayedItems = []

function renderIngredient(ingSpan) {
    ingSpan.classed("ingredient", true)
        .attr("title", d => d.item.name)
        .text(d => d.total.toLocaleString() + "x " + d.item.name)
        .filter(d => !d.used)
        .classed("notused", true)
}


function renderTrips(ingSpan) {
    ingSpan.classed("ingredient", true)
        .attr("title", d => d.item.name)
        .text(d => d.triptext)
}

export function displayItems(spec, totals, ignore) {
    let headers = [
        new Header("",1),
        new Header("Recipe",1),
        new Header("Ingredients",1),
        new Header("Trips", 1),
        new Header("Per Trip",1),
        new Header("Produces",1),
        new Header("Cost", 1),
        new Header("Revenue", 1),
        new Header("Location", 2),
    ]
    let totalCols = 0
    for (let header of headers) {
        totalCols += header.colspan
    }
    displayedItems = [];//displayedItems.slice(0, totals.topo.length)
    /*while (displayedItems.length < totals.topo.length) {
        displayedItems.push({})
    }*/
    let totalAveragePower = zero
    let totalPeakPower = zero
    
    // totals
    let totalCost = 0
    let totalRevenue = 0
    let totalTax = 0
    let totalProfit = 0
    let totalAmount = 0
    let totalWeight = 0
    let totalTrips = 0

    for (let [recipe, rate] of totals.rates) {
        let building = spec.getBuilding(recipe)
        rate = totals.itemRates[recipe.key]['_rate']
        let count = spec.getCount(recipe, rate)
        let resource = false;
        // sources
        if(recipe.ingredients.length === 0) {
            resource = true
        }
        var tripDetails = null
        var trips = null
        var [tripDetails, trips] = spec.getMagicTrip(recipe, rate.toFloat())
        let textoffset = (Math.max(recipe.ingredients.length, 1) * 10);

        let display = {}

        display.recipe = { ...recipe}

        for(let item of display.recipe.ingredients) {
            item.total = item.amount.mul(rate).toFloat()
            if(item.item.key in totals.items) {
                item.used = true
            }
        }
        for(let item of display.recipe.products) {
            item.total = item.amount.mul(rate).toFloat()
            if(item.item.key in totals.items) {
                item.used = true
            }
        }

        display.cost = parseInt(recipe.cost) * rate
        display.pays = parseInt(recipe.pays) * rate

        // totals sum
        totalCost += display.cost
        totalRevenue += display.pays
        totalTax += display.pays * (api.factiontax / 100)
        totalProfit = totalRevenue - totalCost - totalTax
        totalAmount += 0//display.itemRate
        totalWeight += 0//display.weight
        if(trips) {
            totalTrips += trips
        }

        display.tripDetails = tripDetails
        display.trips = trips
        display.recipe = recipe
        display.ignore = ignore.has(recipe)
        display.rate = rate
        display.building = spec.getBuilding(recipe)
        display.count = spec.getCount(recipe, rate)
        display.overclock = null
        display.average = null//average
        display.peak = null//peak
        displayedItems.push(display)
    }

    let table = d3.select("table#totals")

    let headerRow = table.selectAll("thead tr").selectAll("th")
        .data(headers)
    headerRow.exit().remove()
    headerRow.join("th")
        .text(d => d.text)
        .attr("colspan", d => d.colspan)

    // create missing rows
    table.selectAll("tbody").selectAll("tr").remove()
    let rows = table.selectAll("tbody").selectAll("tr").data(displayedItems)
    //rows.exit().remove()
    let row = rows.enter()
        .append("tr")
            .classed("display-row", true)
            
    row.append("td")
        .attr("style", d => ("width:10px; padding:0px; background-color: " + d3.rgb(colorList[d.building.color]).darker()))


    // items
    row.append("td")
        .classed("left-align", true)
        .append("tt")
            .classed("item", true)
            //.on("click", toggleIgnoreHandler)

    // amount
    row.append("td")
        .classed("right-align", true)
        .append("tt")
            .classed("ingredients", true)

    // trips
    row.append("td")
        .classed("right-align", true)
        .append("tt")
            .classed("trips", true)

    // per trip
    row.append("td")
    .classed("right-align", true)
    .append("tt")
        .classed("per-trip", true)

    // amount
    row.append("td")
        .classed("right-align", true)
        .append("tt")
            .classed("products", true)

    // cost
    row.append("td")
        .classed("right-align", true)
        .append("tt")
            .classed("cost", true)

    // revenue
    row.append("td")
        .classed("right-align", true)
        .append("tt")
            .classed("revenue", true)

    // buildings
    let buildingCell = row.append("td")
        .classed("pad building", true)

    row.append("td")
        .classed("left-align building", true)
        .append("tt")
            .classed("source", true)
    
    /*
    row.filter(d => d.building === null)
        .append("td")
            .attr("colspan", 4)
    */
    // overclock
    /*
    let overclockCell = row.append("td")
        .classed("pad building", true)
    overclockCell.append("input")
        .classed("overclock", true)
        .attr("type", "number")
        .attr("title", "")
        .attr("min", 1)
        .attr("max", 250)
        .on("input", changeOverclock)
    overclockCell.append(() => new Text("%"))
    // power
    row.append("td")
        .classed("right-align pad building", true)
        .append("tt")
            .classed("power", true)
    */

    // update rows
    row = table.select("tbody").selectAll("tr")
        .classed("nobuilding", d => d.building === null)

    row.filter(d => d.multirow).classed("multirow",true)

/*

    row.selectAll("img.item-icon")
        .classed("ignore", d => d.ignore)
        .attr("src", d => d.item.iconPath())
        .attr("title", d => d.item.name)
*/
    row.selectAll("tt.item")
        .html(d => `${d.rate.toFloat().toLocaleString()}x ${d.recipe.name}`)


    let ingredients = row.selectAll("tt.ingredients")
        .selectAll("div")
        .data(d => d.recipe.ingredients)
        .join("div")
    renderIngredient(ingredients)

    let products = row.selectAll("tt.products")
        .selectAll("div")
        .data(d => d.recipe.products)
        .join("div")
    renderIngredient(products)




/*
    row.selectAll("tt.amount")
        .html(d => `${d.itemRate.toLocaleString()}<small>x</small>`)

    row.selectAll("tt.itemWeight")
        .html(d => d.itemWeight > 0 ? `${d.itemWeight.toLocaleString()} <small>kg</small>` : ``)

    row.selectAll("tt.weight")
        .html(d => d.weight >= 1000 ? `${Math.round(d.weight/1000).toLocaleString()} <small>t</small>` : `${(d.weight).toLocaleString()} <small>kg</small>`)
    */
    row.selectAll("tt.trips").filter(d => d.trips)
        .html(d => `${d.trips.toLocaleString()}<small>x</small>`)

    row.selectAll("tt.per-trip")
        .html(d => d.pertrip > 0 ? `${d.pertrip.toLocaleString()}<small>x</small>` : ``)

    let perTrip= row.selectAll("tt.per-trip")
        .filter(d => d.trips)
        .selectAll("div")
        .data(d => d.tripDetails)
        .join("div")
    renderTrips(perTrip)
   
    row.selectAll("tt.cost").filter(d => !d.multirow)
        .text(d => d.cost > 0 ? `$ ${d.cost.toLocaleString()}` : `-`)

    row.selectAll("tt.revenue").filter(d => !d.multirow)
        .text(d => d.pays > 0 ? `$ ${d.pays.toLocaleString() }` : `-`)




    let buildingRow = buildingCell.filter(d => d.building !== null && !d.multirow)
    buildingRow.append("img")
        .classed("icon building-icon", true)
        .attr("width", 32)
        .attr("height", 32)
    buildingRow.append(d => new Text(""))

            
    buildingRow.selectAll("img.building-icon")
        .attr("src", d => d.building.iconPath())
        .attr("title", d => d.building.name)
        .filter(d => d.building.iconPath().startsWith('images/storage'))
        .style("display","none")

    row.selectAll("tt.source").filter(d => !d.multirow)
        .text(d => d.building.name)



    buildingRow.selectAll("input.overclock")
        .attr("value", d => d.overclock)
    buildingRow.selectAll("tt.power")
        .text(d => spec.format.alignCount(d.average) + " MW")

    d3.select("tt#total_trips").html(`${totalTrips}<small>x</small>`)
    d3.select("tt#total_cost").text(totalCost > 0 ? `$ ${totalCost.toLocaleString()}` : `-`)
    d3.select("tt#total_revenue").text(totalRevenue > 0 ? `$ ${totalRevenue.toLocaleString() }` : `-`)
    d3.select("tt#total_tax").text(`$ ${totalTax.toLocaleString()}`)
    d3.select("tt#total_profit").text(`$ ${totalProfit.toLocaleString()}`)
}
