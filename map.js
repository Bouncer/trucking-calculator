import { colors } from "./colors.js"

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

var offsets = {};

function offset(pos) {
    var name = pos.building.category.replace("-resource","");
    if(!(name in offsets)) {
        offsets[name] = [pos.index];
    }
    if(!offsets[name].includes(pos.index)) {
        offsets[name].push(pos.index)
    }
    var offset = offsets[name].indexOf(pos.index);
    // alternate
    if(offset % 2 === 0) {
        return offset * -10
    } else {
        return offset * 10;
    }
}

export function updateMap(totals) {

    offsets = {};

    // reset lines
    document.getElementsByTagName("iframe")[0].contentWindow.resetLines();

    // add lines
    totals.forEach(function(i) {
        if(i.target.building.name !== "Output" && i.source.building.x !== undefined && i.target.building.x !== undefined) {
           document.getElementsByTagName("iframe")[0].contentWindow.addLine([i.source.building.x + offset(i.source), i.source.building.y + offset(i.source)], [i.target.building.x + offset(i.target), i.target.building.y + offset(i.target)], colorList[i.source.building.color]);
        }
    });
}