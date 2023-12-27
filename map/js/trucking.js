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
        opacity: 0.9,
        weight: 10,
        clickable: false
    }).addTo(window.mainMap);
    polylines.push(polyline);
};