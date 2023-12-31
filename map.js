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

export function updateMap(totals) {

    // reset lines
    document.getElementsByTagName("iframe")[0].contentWindow.resetLines();

    // add lines
    totals.forEach(function(i) {
        if(i.target.building.name !== "Output" && i.source.building.x !== undefined && i.target.building.x !== undefined) {
           document.getElementsByTagName("iframe")[0].contentWindow.addLine([i.source.building.x, i.source.building.y], [i.target.building.x, i.target.building.y], colorList[i.source.building.color]);
        }
    });
}