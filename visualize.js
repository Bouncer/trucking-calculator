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
import { Ingredient } from "./recipe.js"
import { colors } from "./colors.js"
import { updateMap } from "./map.js"

const iconSize = 20

const nodePadding = 80

const columnWidth = 120
const maxNodeHeight = 100
const minNodeHeight = 28

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

function makeGraph(totals, targets, ignore) {
    let outputs = []
    let rates = new Map()
    for (let target of targets) {
        let rate = rates.get(target.item)
        if (rate === undefined) {
            rate = zero
        }
        rate = rate.add(target.getRate())
        rates.set(target.item, rate)
    }
    for (let [item, rate] of rates) {
        let ing = new Ingredient(item, rate)
        outputs.push(ing)
    }

    // only add output on export
    let nodes = []
    // if output is exportable, remove it from output list.
    var filteredOutputs = [];
    for(let output of outputs) {
        if(!output.item.key.startsWith("export-") && output.item.key != "house") {
            filteredOutputs.push(output);
        }
    }
    outputs = filteredOutputs;

    if(outputs.length > 0) {
        nodes[0] = {
            "name": "output",
            "ingredients": outputs,
            "building": {"name":"Storage"},
            "count": one,
            "rate": null,
        }
    }

    let nodeMap = new Map()
    //nodeMap.set("output", nodes[0])
    for (let [recipe, rate] of totals.rates) {
        let building = spec.getBuilding(recipe)
        let count = spec.getCount(recipe, rate)
        let pertrip = 0
        var weight = zero
        for(let i of recipe.ingredients) {
            weight = weight.add(i.item.weight.mul(i.amount))
        }
        // sources
        if(recipe.ingredients.length === 0) {
            for(let i of recipe.products) {
                weight = weight.add(i.item.weight.mul(i.amount))
            }
        }
        let groupCapacity = spec.getPerTrip(weight)
        let beltCountExact = spec.getBeltCount(weight.mul(rate));
        let beltCount = beltCountExact.toFloat();
        let trips = Math.ceil(beltCount);
        for(let i of recipe.ingredients) {
            i.pertrip = Math.min(rate.mul(i.amount).toFloat(),groupCapacity * i.amount.toFloat())
        }
        if(recipe.ingredients.length === 0) {
            pertrip = Math.min(rate.mul(recipe.products[0].amount).toFloat(),groupCapacity * recipe.products[0].amount.toFloat())
        }

        let textoffset = recipe.ingredients.length;
        if(trips < 2) {
            textoffset = 0;
        }

        let node = {
            "name": recipe.name,
            "ingredients": recipe.ingredients,
            "recipe": recipe,
            "building": building,
            "count": count,
            "rate": rate,
            "weight": weight,
            "textoffset": textoffset,
            "trips": trips,
            "pertrip": pertrip
        }
        nodes.push(node)
        nodeMap.set(recipe.name, node)
    }

    let links = []
    for (let node of nodes) {
        let recipe = node.recipe
        if (ignore.has(recipe)) {
            continue
        }
        for (let ing of node.ingredients) {
            let rate
            var totalRate = zero
            for (let subRecipe of ing.item.recipes) {
                if (totals.rates.has(subRecipe)) {
                    totalRate = totalRate.add(totals.rates.get(subRecipe).mul(subRecipe.gives(ing.item, spec)))
                }
            }
            //console.log(totalRate)
            for (let subRecipe of ing.item.recipes) {
                if (totals.rates.has(subRecipe)) {
                    if (node.name == "output") {
                        rate = ing.amount
                    } else {
                        rate = totals.rates.get(recipe).mul(ing.amount)
                        //rate = rate.mul(ing.item.weight)
                    }
                    var ratio = rate.div(totalRate)
                    var subRate = totals.rates.get(subRecipe).mul(subRecipe.gives(ing.item, spec)).mul(ratio)
                    let link = {
                        "name": ing.item.name,
                        "source": nodeMap.get(subRecipe.name),
                        "target": node,
                        "value": Math.min(500,Math.max(40,rate.mul(ing.item.weight).toFloat())),
                        "rate": subRate,
                        "weight": rate.mul(ing.item.weight),
                        "amount": ing.amount
                    }
                    let belts = [];
                    let beltCountExact = spec.getBeltCount(link.weight);
                    let beltCount = beltCountExact.toFloat();
                    link.trips = Math.ceil(beltCount);
                    for (let j = one; j.less(beltCountExact); j = j.add(one)) {
                        let i = j.toFloat()
                        belts.push({link, i, beltCount})
                    }
                    link.belts = belts
                    links.push(link)
                }
            }
        }
    }
    return {"nodes": nodes, "links": links}
}

function recipeValue(recipe, rate, ignore) {
    let inputValue = zero
    if (!ignore.has(recipe)) {
        for (let ing of recipe.ingredients) {
            inputValue = inputValue.add(rate.mul(ing.amount))
        }
    }
    let outputValue = rate.mul(recipe.products[0].amount)
    if (inputValue.less(outputValue)) {
        return outputValue
    } else {
        return inputValue
    }
}

function rankHeightEstimate(rank, valueFactor) {
    let total = nodePadding * (rank.length - 1)
    for (let value of rank) {
        total += value.mul(valueFactor).toFloat()
    }
    return total
}

function nodeText(d) {
    return d.name;
    /*
    if (d.count.isZero()) {
        if (d.rate === null) {
            return ""
        } else {
            return `\u00d7 ${spec.format.rate(d.rate)}/${spec.format.rateName}`
        }
    } else {
        return "\u00d7 " + spec.format.count(d.count)
    }
    */
}

// This is basically an educated guess, but seems to match whatever Chrome and
// Firefox do pretty well.
function beltPath(d) {
    let x0 = d.link.source.x1
    let y0 = d.link.y0
    let y0top = y0 - d.link.width / 2
    let x1 = d.link.target.x0
    let y1 = d.link.y1
    let nodeHeight = y1 - y0;
    let y1top = y1 - d.link.width / 2
    let mid = (x1 - x0) / 2
    let slope = (y1 - y0) / (x1 - x0)

    let dy = d.link.width / d.beltCount
    let y_offset = d.i*dy
    let y0belt = y0top + y_offset
    let y1belt = y1top + y_offset

    let midAdjust = (d.link.width/2 - y_offset) * slope
    let x_control = x0 + mid + midAdjust
    return `M ${x0},${y0belt} C ${x_control},${y0belt},${x_control},${y1belt},${x1},${y1belt}`
}

let color = d3.scaleOrdinal(colorList)

export function renderTotals(totals, targets, ignore) {
    let data = makeGraph(totals, targets, ignore)

    let maxRank = 0
    let ranks = new Map()
    let largestValue = zero
    for (let [recipe, rank] of totals.heights) {
        let rankList = ranks.get(rank)
        if (rankList === undefined) {
            rankList = []
            ranks.set(rank, rankList)
        }
        if (rank > maxRank) {
            maxRank = rank
        }
        let rate = totals.rates.get(recipe)
        let value = recipeValue(recipe, rate, ignore)
        if (largestValue.less(value)) {
            largestValue = value
        }
        rankList.push(value)
    }
    if (largestValue.isZero()) {
        return
    }
    let beltDensity = maxNodeHeight / spec.getBeltCount(largestValue).toFloat()
    // The width of the display is the number of ranks, times the width of each
    // rank, plus a small constant for the output node.
    let maxTextWidth = 0
    let testSVG = d3.select("body").append("svg")
    for (let node of data.nodes) {
        let text = testSVG.append("text")
            .text(nodeText(node))
        let textWidth = text.node().getBBox().width
        text.remove()
        if (textWidth > maxTextWidth) {
            maxTextWidth = textWidth
        }
    }
    testSVG.remove()
    let nodeWidth = iconSize + maxTextWidth + 20
    let width = maxRank * (nodeWidth + columnWidth) + nodeWidth
    // The height of the display is normalized by the height of the tallest box
    // in the graph. We define it to be (approximately) maxNodeHeight pixels
    // high.
    let valueFactor = Rational.from_float(maxNodeHeight).div(largestValue)
    let largestEstimate = 0
    for (let [rank, rankList] of ranks) {
        let estimate = rankHeightEstimate(rankList, valueFactor)
        if (estimate > largestEstimate) {
            largestEstimate = estimate
        }
    }
    let height = largestEstimate * Math.min(1.5,maxRank/2)

    let svg = d3.select("svg#graph")
        .attr("viewBox", `0,0,${width+20},${height+50}`)
        .style("width", `${width+20}px`)
        .style("height", `${height+50}px`)

    svg.selectAll("g").remove()

    let sankey = d3.sankey()
        .nodeWidth(nodeWidth)
        .nodePadding(nodePadding)
        .nodeAlign(d3.sankeyRight)
        .extent([[10, 10], [width + 10, height + 20]])
    let {nodes, links} = sankey(data)

    for(let node in nodes) {
        for(let ing in nodes[node].ingredients) {
            nodes[node].ingredients[ing].textoffset = nodes[node].textoffset
            nodes[node].ingredients[ing].x0 = nodes[node].x0
            nodes[node].ingredients[ing].x1 = nodes[node].x1
            nodes[node].ingredients[ing].y0 = nodes[node].y0 + (ing * 10) + 10
            nodes[node].ingredients[ing].y1 = nodes[node].y1 + (ing * 10) + 10
        }
    }
    
    // Node rects
    let rects = svg.append("g")
        .classed("nodes", true)
        .selectAll("rect")
        .data(nodes)
        .join("g")
            .classed("node", true)

    rects.append("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("height", d => Math.max(d.y1 - d.y0, minNodeHeight))
        .attr("width", d => d.x1 - d.x0)
        .attr("fill", d => d.name == "output" ? d3.rgb("#AAAAAA").darker() : d3.rgb(colorList[d.building.color]).darker())
        .attr("stroke", d => d.name == "output" ? d3.rgb("#AAAAAA") : d3.color(colorList[d.building.color]))
    rects.filter(d => d.name != "output")
        .append("image")
            .classed("ignore", d => ignore.has(d.recipe))
            .attr("x", d => d.x0 + 2)
            .attr("y", d => ((d.y1 - d.y0 > minNodeHeight) ? (d.y0 + d.y1) / 2 - 8 + (d.textoffset * -10) : d.y0 + 4))
            .attr("height", iconSize)
            .attr("width", iconSize)
            .attr("xlink:href", d => (d.count.isZero() ? d.count : `${d.building.iconPath()}`))
    rects.filter(d => d.name != "output").append("text")
        .attr("x", d => d.x0 + iconSize + 4)
        .attr("y", d => (d.y1 - d.y0 > minNodeHeight) ? (d.y0 + d.y1) / 2 - 6 + (d.textoffset * -10) : d.y0 + 8)
        .attr("dy", "0.35em")
        .attr("text-anchor", "start")
        .attr("class", "item-name")
        .text(d => (d.count.isZero() ? d.count : `${d.rate.toFloat().toLocaleString()}x ${d.name}`))
    rects.append("text")
                .attr("x", d => d.x0 + iconSize + 4)
                .attr("y", d => ((d.y1 - d.y0 > minNodeHeight) ? (d.y0 + d.y1) / 2 + 6 + (d.textoffset * -10) : d.y0 + 20))
                .attr("dy", "0.35em")
                .attr("text-anchor", "start")
                .attr("class", "item-location")
                .text(d => (d.count.isZero() ? d.count : `${d.building.name}`))
    rects.filter(d => d.trips > 1)
        .append("text")
        .attr("x", d => d.x0 + iconSize + 4)
        .attr("y", d => ((d.y1 - d.y0 > minNodeHeight) ? (d.y0 + d.y1) / 2 + 18 + (d.textoffset * -10) : d.y0 + 40))
        .attr("dy", "0.35em")
        .attr("text-anchor", "start")
        .attr("class", "item-ingredient")
        .text(d => `${d.trips} trips of max` + (d.pertrip > 0 ? ` ${d.pertrip.toLocaleString()}x` : `:`))
    rects.filter(d => d.trips > 1).append("g").selectAll("text").data(d => d.ingredients).join("text")
            .attr("x", d => d.x0 + iconSize + 4)
            .attr("y", d => ((d.y1 - d.y0 > minNodeHeight) ? (d.y0 + d.y1) / 2 + 20 + (d.textoffset * -10) : d.y0 + 40))
            .attr("dy", "0.35em")
            .attr("class", "item-ingredient")
            .attr("text-anchor", "start")
            .text(d => `${d.pertrip.toLocaleString()}x ${d.item.name}`)
        

        //.text(nodeText)


    // Link paths
    let link = svg.append("g")
        .classed("links", true)
        .selectAll("g")
        .data(links)
        .join("g")
            //.style("mix-blend-mode", "multiply")
    link.append("path")
        .attr("fill", "none")
        .attr("stroke-opacity", 0.3)
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke", d => d3.color(colorList[d.source.building.color]).brighter())
        .attr("stroke-width", d => Math.max(2, d.width) - 1)
    // Don't draw belts if we have less than three pixels per belt.
    if (beltDensity >= 3) {
        link.append("g")
            .selectAll("path")
            .data(d => d.belts)
            .join("path")
                .attr("fill", "none")
                .attr("stroke-opacity", 0.3)
                .attr("d", beltPath)
                .attr("stroke", d => color(d.link.source.name))
                .attr("stroke-width", 1)
    }
    link.append("title")
        .text(d => `${d.source.name} \u2192 ${d.target.name}\n${spec.format.rate(d.rate)}`)
    link.append("text")
        .attr("x", d => d.source.x1 + 6)
        .attr("y", d => d.y0)
        .attr("dy", "0.35em")
        .attr("text-anchor", "start")
        .attr("class", "item-ingredient")
        .text(d => d.name + ' ' + d.rate.ceil().toFloat().toLocaleString() + 'x, ' + (d.weight >= 1000 ? Math.round(d.weight.ceil().toFloat()/1000).toLocaleString() + 't' : d.weight.ceil().toFloat().toLocaleString() + 'kg'))
    /*link.filter(d => d.trips > 1)
        .append("text")
            .attr("x", d => d.source.x1 + 6)
            .attr("y", d => d.y0 + 12)
            .attr("dy", "0.35em")
            .attr("text-anchor", "start")
            .text(d => `${d.trips} trips`)
            */

    // Overlay transparent rect on top of each node, for click events.
    let rectElements = svg.selectAll("g.node").nodes()
    let overlayData = []
    // Flash the graph tab to be visible, so that the graph is laid out and
    // the BBox is not empty.
    let graphTab = d3.select("#graph_tab")
    let origDisplay = d3.style(graphTab.node(), "display")
    graphTab.style("display", "block")
    for (let i = 0; i < nodes.length; i++) {
        let rect = rectElements[i].getBBox()
        let node = nodes[i]
        let recipe = node.recipe
        if (recipe !== undefined) {
            overlayData.push({rect, node, recipe})
        }
    }
    graphTab.style("display", origDisplay)


    // update map
    //console.log(links);
    updateMap(links)

    /*
    svg.append("g")
        .classed("overlay", true)
        .selectAll("rect")
        .data(overlayData)
        .join("rect")
            .attr("stroke", "none")
            .attr("fill", "transparent")
            .attr("x", d => d.rect.x)
            .attr("y", d => d.rect.y)
            .attr("width", d => d.rect.width)
            .attr("height", d => d.rect.height)
            .on("click", toggleIgnoreHandler)
            .append("title")
                .text(d => d.node.name + (d.node.count.isZero() ? "" : `\n${d.node.building.name} \u00d7 ${spec.format.count(d.node.count)}`))
    */
}

