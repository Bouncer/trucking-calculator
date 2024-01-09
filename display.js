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

class Header {
    constructor(text, colspan) {
        this.text = text
        this.colspan = colspan
    }
}

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

export function displayItems(spec, totals, ignore) {
    let headers = [
        new Header("Item",1),
        new Header("Weight",1),
        new Header("Amount", 1),
        new Header("Per Trip", 1),
        new Header("Trips", 1),
        new Header("Total Weight", 1),
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
    let totalProfit = 0
    let totalAmount = 0
    let totalWeight = 0
    let totalTrips = 0
    for (let i = 0; i < totals.topo.length; i++) {
        let recipe = totals.topo[i]
        for(let p in recipe.products) {
            let product = recipe.products[p]
            let display = {}
            let rate = totals.rates.get(recipe)
            let item = product.item
            let itemRate = rate.mul(recipe.gives(item))
            let overclock = spec.getOverclock(recipe)
            let overclockString = overclock.mul(Rational.from_float(100)).toString()
            let {average, peak} = spec.getPowerUsage(recipe, rate, totals.topo.length)
            totalAveragePower = totalAveragePower.add(average)
            totalPeakPower = totalPeakPower.add(peak)
            
            // item data
            display.item = item
            display.itemRate = itemRate.toFloat();
            display.itemWeight = item.weight.toFloat();
            display.weight = itemRate.mul(item.weight).toFloat()
            let beltCountExact = spec.getBeltCount(itemRate.mul(item.weight));
            let beltCount = beltCountExact.toFloat();
            display.trips = Math.ceil(beltCount);
            display.pertrip = spec.getPerTrip(item.weight)
            if(recipe.products.length > 1) {
                var groupWeight = zero
                var thisRate = zero
                for(let i of recipe.products) {
                    if(i.item.key == item.key) {
                        thisRate = i.amount
                    }
                    groupWeight = groupWeight.add(i.item.weight.mul(i.amount))
                }
                let groupCapacity = spec.getPerTrip(groupWeight)
                let beltCountExact = spec.getBeltCount(groupWeight.mul(rate));
                let beltCount = beltCountExact.toFloat();
                display.trips = Math.ceil(beltCount);
                display.pertrip = groupCapacity * thisRate.toFloat()
            }
            display.cost = parseInt(recipe.cost) * rate
            display.pays = parseInt(recipe.pays) * rate

            display.multirow = false;
            if(p > 0) {
                display.cost = 0
                display.pays = 0
                display.trips = 0
                display.multirow = true
            }

            // totals sum
            totalCost += display.cost
            totalRevenue += display.pays
            totalProfit = totalRevenue - totalCost
            totalAmount += display.itemRate
            totalWeight += display.weight
            totalTrips += display.trips

            display.recipe = recipe
            display.ignore = ignore.has(recipe)
            display.rate = rate
            display.building = spec.getBuilding(recipe)
            display.count = spec.getCount(recipe, rate)
            display.overclock = overclockString
            display.average = average
            display.peak = peak
            displayedItems.push(display)
        }
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
    // items
    row.append("td")
        .classed("left-align", true)
        .append("tt")
            .classed("item", true)
            .on("click", toggleIgnoreHandler)


    // amount
    row.append("td")
        .classed("right-align", true)
        .append("tt")
            .classed("itemWeight", true)

    // amount
    row.append("td")
        .classed("right-align", true)
        .append("tt")
            .classed("amount", true)

    // per trip
    row.append("td")
        .classed("right-align", true)
        .append("tt")
            .classed("per-trip", true)

    // trips
    row.append("td")
        .classed("right-align", true)
        .append("tt")
            .classed("trips", true)

    // weight
    row.append("td")
        .classed("right-align", true)
        .append("tt")
            .classed("weight", true)

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

    row.selectAll("img.item-icon")
        .classed("ignore", d => d.ignore)
        .attr("src", d => d.item.iconPath())
        .attr("title", d => d.item.name)

    row.selectAll("tt.item")
        .html(d => d.item.name)

    row.selectAll("tt.amount")
        .html(d => `${d.itemRate.toLocaleString()}<small>x</small>`)

    row.selectAll("tt.itemWeight")
        .html(d => d.itemWeight > 0 ? `${d.itemWeight.toLocaleString()} <small>kg</small>` : ``)

    row.selectAll("tt.weight")
        .html(d => d.weight >= 1000 ? `${Math.round(d.weight/1000).toLocaleString()} <small>t</small>` : `${(d.weight).toLocaleString()} <small>kg</small>`)

    row.selectAll("tt.trips").filter(d => !d.multirow)
        .html(d => `${d.trips.toLocaleString()}<small>x</small>`)

    row.selectAll("tt.per-trip")
        .html(d => d.pertrip > 0 ? `${d.pertrip.toLocaleString()}<small>x</small>` : ``)

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

    row.selectAll("tt.source").filter(d => !d.multirow)
        .text(d => d.building.name)



    buildingRow.selectAll("input.overclock")
        .attr("value", d => d.overclock)
    buildingRow.selectAll("tt.power")
        .text(d => spec.format.alignCount(d.average) + " MW")

    d3.select("tt#total_amount").html(`${totalAmount.toLocaleString()}<small>x</small>`)
    d3.select("tt#total_weight").html(totalWeight >= 1000 ? `${Math.round(totalWeight/1000).toLocaleString()} <small>t</small>` : `${(totalWeight).toLocaleString()} <small>kg</small>`)
    //d3.select("tt#total_trips").html(`${totalTrips}<small>x</small>`)
    d3.select("tt#total_cost").text(totalCost > 0 ? `$ ${totalCost.toLocaleString()}` : `-`)
    d3.select("tt#total_revenue").text(totalRevenue > 0 ? `$ ${totalRevenue.toLocaleString() }` : `-`)
    d3.select("tt#total_profit").text(`$ ${totalProfit.toLocaleString()}`)
}
