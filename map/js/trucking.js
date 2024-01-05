var polylines = [];

function resetLines() {
    polylines.forEach(function (item) {
        window.mainMap.removeLayer(item)
    });
    polylines = [];
}

function addLine(source, target, color) {
    var polyline = L.polyline([source,target], {
        color: color,
        opacity: 0.7,
        weight: 12,
        clickable: false
    }).arrowheads({size:"8px", frequency: "12px", offset: {start: "10px", end: "10px"}, fill: "true", opacity: 0}).addTo(window.mainMap);
    polylines.push(polyline);
};