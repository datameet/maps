L.mapbox.accessToken = 'pk.eyJ1Ijoib3BlbnN0cmVldG1hcCIsImEiOiJhNVlHd29ZIn0.ti6wATGDWOmCnCYen-Ip7Q';
var map = L.mapbox.map('map');
L.mapbox.tileLayer('openstreetmap.1b68f018').addTo(map);

$.getJSON(map_path, function(geojson) {
    var geojsonLayer = L.mapbox.featureLayer(geojson).addTo(map);
    geojsonLayer.setStyle({
        fillColor: '#ffffff',
        fillOpacity: 0,
        opacity: 0.99,
        color: '#666',
        weight:1
    });
    var bounds = geojsonLayer.getBounds();
    if (bounds.isValid()) {
        map.fitBounds(geojsonLayer.getBounds());
    } else {
        map.setView([0, 0], 2);
    }
    geojsonLayer.eachLayer(function(l) {
        showProperties(l);
    });
});

function showProperties(l) {
    var properties = l.toGeoJSON().properties;
    var table = document.createElement('table');
    table.setAttribute('class', 'marker-properties display')
    for (var key in properties) {
        var tr = createTableRows(key, properties[key]);
        table.appendChild(tr);
    }
    if (table) l.bindPopup(table);
}

function createTableRows(key, value) {
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    var td = document.createElement('td');
    key = document.createTextNode(key);
    value = document.createTextNode(value);
    th.appendChild(key);
    td.appendChild(value);
    tr.appendChild(th);
    tr.appendChild(td);
    return tr
}
