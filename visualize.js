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

const nodePadding = 100
const nodePaddingCalc = 80

const columnWidth = 150
const maxNodeHeight = 100
const minNodeHeight = 38

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

var svg = d3.select("svg#graph")
    .attr("viewBox", `0,0,0,0`)
    .style("width", `100px`)
    .style("height", `100px`)

var link = svg.append("g")
        .classed("links", true)
var rects = svg.append("g")
        .classed("nodes", true)

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
            "textoffset": 10,
        }
    }

    let nodeMap = new Map()
    //nodeMap.set("output", nodes[0])
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

        // debug
        let debugText = "";
        for(let i of recipe.ingredients) {
            debugText += `${i.amount}x ${i.item.name.substr('0','10')}, `
        }
        debugText += ` = `
        for(let i of recipe.products) {
            debugText += `${i.amount}x ${i.item.name.substr('0','10')}, `
        }

        debugText = null
        let node = {
            "key": recipe.key,
            "name": recipe.name,
            "ingredients": recipe.ingredients,
            "recipe": recipe,
            "building": building,
            "count": count,
            "rate": rate,
            "textoffset": textoffset,
            "trips": trips,
            "resource": resource,
            "pertrip": tripDetails,
            "debug": debugText
        }
        nodes.push(node)
        nodeMap.set(recipe.key, node)
    }

    let links = []
    for (let node of nodes) {
        var recipe = node.recipe
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
            for (let subRecipe of ing.item.recipes) {
                // if this is a storage, only use if its meant for this recipe
                if(subRecipe.key.startsWith('storage|')) {
                    let targetRecipe = subRecipe.key.split('|')[2]
                    if(recipe.key != targetRecipe) {
                        continue
                    }
                }
                if (subRecipe.key in totals.itemRates && ing.item.key in totals.itemRates[subRecipe.key]) {
                    if (node.name == "output") {
                        rate = ing.amount
                    } else {
                        //rate = totals.rates.get(recipe).mul(ing.amount)
                        //rate = rate.mul(ing.item.weight)


                        //rate = totals.rates.get(recipe).mul(subRecipe.gives(ing.item, spec))
                        if(recipe.key in totals.itemRates[subRecipe.key][ing.item.key]) {
                            rate = totals.itemRates[subRecipe.key][ing.item.key][recipe.key].mul(subRecipe.gives(ing.item, spec))
                        } else {
                            rate = totals.itemRates[subRecipe.key]['_rate'].mul(subRecipe.gives(ing.item, spec))
                        }
                    }
                    var ratio = rate.div(totalRate)
                    var subRate = totals.rates.get(subRecipe).mul(subRecipe.gives(ing.item, spec)).mul(ratio)
                    let link = {
                        "name": ing.item.name,
                        "source": nodeMap.get(subRecipe.key),
                        "target": node,
                        "value": Math.min(100,Math.max(40,rate.mul(ing.item.weight).toFloat())),
                        "rate": rate,
                        "weight": subRate.mul(ing.item.weight),
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
    let total = nodePaddingCalc * (rank.length - 1)
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

    var anim = d3.transition()
    .duration(2000);

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
    let maxTextWidth = 140

    let nodeWidth = iconSize + maxTextWidth + 20
    let width = maxRank * (nodeWidth + columnWidth) + nodeWidth
    let svgWidth = Math.max(width + 300, window.innerWidth - 20)
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
    let svgHeight = Math.max(height + 300, window.innerHeight - 150)

    svg.attr("viewBox", `-50,-50,${svgWidth},${svgHeight}`)
        .style("width", `${svgWidth}px`)
        .style("height", `${svgHeight}px`)

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

    function dragmove(d) {
        var rectY = d3.select(this).select("rect").attr("y");
        var rectX = d3.select(this).select("rect").attr("x");
        d.y0 = d.y0 + d3.event.dy;
        d.x1 = d.x1 + d3.event.dx;
        d.x0 = d.x0 + d3.event.dx;
        var yTranslate = d.y0 - rectY;
        var xTranslate = d.x0 - rectX;
        d3.select(this).attr('transform', "translate(" + (xTranslate) + "," + (yTranslate) + ")");
        link.selectAll('.paths').attr('d', d3.sankeyLinkHorizontal());
        link.selectAll('.path-text')
        .attr("x", d => d.source.x1 + 6)
        .attr("y", d => d.y0)
        sankey.update(data);
    }
    
    // Link paths
    let linkData = link.selectAll("g")
        .data(links, function(d) { return `${d.source.key}-${d.target.key}`; })
        .join(
            function(enter) {
                let l = enter.append('g')
                l.append('path')
                .classed('paths',true)
                .attr("d", d3.sankeyLinkHorizontal())
                .attr("fill", "none")
                .attr("stroke-opacity", 0.3)
                .attr("stroke", d => d3.color(colorList[d.source.building.color]).brighter())
                .attr("stroke-width", d => Math.max(2, d.width) - 1)
                .on("click", function(d) {
                    if(d3.select(this).attr("stroke-opacity") == 0.3) {
                        d3.select(this).attr("stroke-opacity", 0.1)
                    } else {
                        d3.select(this).attr("stroke-opacity", 0.3)
                    }
                  })

            // Don't draw belts if we have less than three pixels per belt.
/*
            if ((d => d.belts) >= 3) {
                l.append("g")
                    .selectAll("path")
                    .data(d => d.belts)
                    .join("path")
                        .attr("fill", "none")
                        .attr("stroke-opacity", 0.3)
                        .attr("d", beltPath)
                        .attr("stroke", d => color(d.link.source.name))
                        .attr("stroke-width", 1)
            }
        */
            l.append("text")
                .attr("x", d => d.source.x1 + 6)
                .attr("y", d => d.y0)
                .classed('path-text',true)
                .attr("dy", "0.35em")
                .attr("text-anchor", "start")
                .text(d => d.name + ' ' + d.rate.ceil().toFloat().toLocaleString() + 'x, ' + (d.weight >= 1000 ? Math.round(d.weight.ceil().toFloat()/1000).toLocaleString() + 't' : d.weight.ceil().toFloat().toLocaleString() + 'kg'))
        
            
              return l
            },
            function(update) {
                update.select('.paths').transition(anim)
                .attr("d", d3.sankeyLinkHorizontal())
                .attr("stroke-width", d => Math.max(2, d.width) - 1)

                update.select('.path-text').transition(anim)
                .attr("x", d => d.source.x1 + 6)
                .attr("y", d => d.y0)
                .text(d => d.name + ' ' + d.rate.ceil().toFloat().toLocaleString() + 'x, ' + (d.weight >= 1000 ? Math.round(d.weight.ceil().toFloat()/1000).toLocaleString() + 't' : d.weight.ceil().toFloat().toLocaleString() + 'kg'))
        
                sankey.update(data);

              return update
            },
            function(exit) {
              return exit.transition(anim).style('opacity',0).remove();
            }
          )


    // Node rects
    let rectsData = rects.selectAll(".node")
        .data(nodes, function(d) { return d.key; })
        .join(
            function(enter) {

                let r = enter.append('g')
                .classed("node", true)
                .call(d3.drag()
                .subject(d => d)
                .on('start', function () { this.parentNode.appendChild(this); })
                .on('drag', dragmove))
                .on("click", function(d) {
                    if(d3.select(this).select("rect").style('opacity') == 0.9) {
                        d3.select(this).select("rect").style('opacity',0.3)
                    } else {
                        d3.select(this).select("rect").style('opacity',0.9)
                    }
                  })
        
                r.append("rect")
                    .attr("x", d => d.x0)
                    .attr("y", d => d.y0)
                    .attr("height", d => Math.max(d.y1 - d.y0, minNodeHeight))
                    .attr("width", d => d.x1 - d.x0)
                    .attr("fill", d => d.name == "output" ? d3.rgb("#AAAAAA").darker() : d3.rgb(colorList[d.building.color]).darker())
                    .attr("stroke", d => d.name == "output" ? d3.rgb("#AAAAAA") : d3.color(colorList[d.building.color]))
                    .style('opacity',0.9)

                r.filter(d => d.name != "output")
                    .append("image")
                        .classed("ignore", d => ignore.has(d.recipe))
                        .attr("x", d => d.x0 + 2)
                        .attr("y", d => (d.y0 + d.y1) / 2 - d.textoffset + 0)
                        .attr("height", iconSize)
                        .attr("width", iconSize)
                        .attr("xlink:href", d => (d.count.isZero() ? `` : `${d.building.iconPath()}`))
                r.filter(d => d.name != "output").append("text")
                        .attr("x", d => d.x0 + iconSize + 4)
                        .attr("y", d => (d.y0 + d.y1) / 2 - d.textoffset - 10)
                        .attr("dy", "0.35em")
                        .attr("text-anchor", "start")
                        .style("font-size","8px")
                        .text(d => d.debug)
                r.filter(d => d.name != "output").append("text")
                    .attr("x", d => d.x0 + iconSize + 4)
                    .attr("y", d => (d.y0 + d.y1) / 2 - d.textoffset + 0)
                    .attr("dy", "0.35em")
                    .attr("text-anchor", "start")
                    .attr("class", "item-name")
                    .text(d => (d.count.isZero() ? `${d.name}` : `${d.rate.toFloat().toLocaleString()}x ${d.name}`))
                r.append("text")
                            .attr("x", d => d.x0 + iconSize + 4)
                            .attr("y", d => (d.y0 + d.y1) / 2 - d.textoffset + 12)
                            .attr("dy", "0.35em")
                            .attr("text-anchor", "start")
                            .attr("class", "item-location")
                            .text(d => (d.count.isZero() ? `${d.building.name}` : `${d.building.name}`))
                r.filter(d => d.pertrip).append("text")
                    .attr("x", d => d.x0 + iconSize + 4)
                    .attr("y", d => (d.y0 + d.y1) / 2 - d.textoffset + 24)
                    .attr("dy", "0.35em")
                    .attr("text-anchor", "start")
                    .attr("class", "item-ingredient")
                    .text(d => `${d.trips} trip` + (d.trips > 1 ? `s` : ``) + ` of` + (d.trips > 1 ? ` max` : ``) + `:` + (d.resource || (d.pertrip && d.pertrip.length <= 1) ? ` ${d.pertrip[0].triptext.toLocaleString()}` : ``))
                r.filter(d => !d.resource && d.pertrip && d.pertrip.length > 1).append("g").selectAll("text").data(d => d.pertrip).join("text")
                    .attr("x", d => d.x0 + iconSize + 4)
                    .attr("y", d => (d.y0 + d.y1) / 2 - d.textoffset + 30)
                    .attr("class", "item-trips")
                    .attr("text-anchor", "start")
                    .text(d => `${d.item.name}: ${d.triptext}`)

              return r
            },
            function(update) {

            update.attr("transform","").call(d3.drag()
            .subject(d => d)
            .on('start', function () { this.parentNode.appendChild(this); })
            .on('drag', dragmove))
            .transition(anim)
            update.select('rect').transition(anim)
                .attr("x", d => d.x0)
                .attr("y", d => d.y0)
                .attr("height", d => Math.max(d.y1 - d.y0, minNodeHeight))
                .attr("width", d => d.x1 - d.x0)
            update.select('image').transition(anim)
                .attr("x", d => d.x0 + 2)
                .attr("y", d => (d.y0 + d.y1) / 2 - d.textoffset + 0)
            update.select('.item-name').transition(anim)
                .attr("x", d => d.x0 + iconSize + 4)
                .attr("y", d => (d.y0 + d.y1) / 2 - d.textoffset + 0)
                .text(d => (d.count.isZero() ? `${d.name}` : `${d.rate.toFloat().toLocaleString()}x ${d.name}`))
            update.select('.item-location').transition(anim)
                .attr("x", d => d.x0 + iconSize + 4)
                .attr("y", d => (d.y0 + d.y1) / 2 - d.textoffset + 12)
                .text(d => (d.count.isZero() ? `${d.building.name}` : `${d.building.name}`))
            update.select('.item-ingredient').transition(anim)
                .attr("x", d => d.x0 + iconSize + 4)
                .attr("y", d => (d.y0 + d.y1) / 2 - d.textoffset + 24)
                .text(d => `${d.trips} trip` + (d.trips > 1 ? `s` : ``) + ` of` + (d.trips > 1 ? ` max` : ``) + `:` + (d.resource || (d.pertrip && d.pertrip.length <= 1) ? ` ${d.pertrip[0].triptext.toLocaleString()}` : ``))
            update.select('g').selectAll(".item-trips").transition(anim)
                    .attr("x", d => d.x0 + iconSize + 4)
                    .attr("y", d => (d.y0 + d.y1) / 2 - d.textoffset + 30)
                    .text(d => `${d.item.name}: ${d.triptext}`)

              return update
            },
            function(exit) {
              return exit.transition(anim).style('opacity',0).remove();
            }
          )


        
        
        
        
        /*
        r.filter(d => !d.resource && d.pertrip && d.pertrip.length > 1).append("g").selectAll("text").data(d => d.pertrip).join("text")
            .attr("x", d => d.x0 + iconSize + 4)
            .attr("y", d => (d.y0 + d.y1) / 2 - d.textoffset + 30)
            .attr("class", "item-ingredient")
            .attr("text-anchor", "start")
            .text(d => `${d.item.name}: ${d.triptext}`)
*/

        
            

    // Overlay transparent rect on top of each node, for click events.
    /*
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
*/

    // update map
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

