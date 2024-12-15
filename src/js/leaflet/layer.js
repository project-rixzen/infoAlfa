var indomaret = new L.LayerGroup();
var jalan = new L.LayerGroup();
var kelurahan = new L.LayerGroup();
var sungai = new L.LayerGroup();

var map = L.map('map', {
    center: [-6.152774156483126, 106.78470822205712],
    zoom: 13,
    zoomControl: false,
    layers: [indomaret]
});

var GoogleMaps = new L.TileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    opacity: 1.0,
    attribution: 'Google Maps'
}).addTo(map);

var GoogleSatelliteHybrid = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 22,
    attribution: 'Google Satellite'
});

var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
});

var GoogleRoads = new L.TileLayer('https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}', {
    opacity: 1.0,
    attribution: 'Google Roads'
});

var baseLayers = {
    'Google Satellite Hybrid': GoogleSatelliteHybrid,
    'OpenStreetMap': OpenStreetMap,
    'Google Maps': GoogleMaps,
    'Google Roads': GoogleRoads
};

var groupedOverlays = {
    "Peta Dasar": {
        'Indomaret': indomaret,
        'Kelurahan': kelurahan,
        'Jalan Jakarta Barat': jalan,
        'Sungai Jakarta Barat': sungai,
    }
};

// L.control.layers(baseLayers, overlayLayers, {collapsed: true}).addTo(map);
L.control.groupedLayers(baseLayers, groupedOverlays, {collapsed: true}).addTo(map);

/* 
GEOJSON LAYER 
*/
var baseUrl = window.location.origin;
console.log(baseUrl);

$.getJSON(baseUrl + '/src/assets/gis/geojson/indomaret_locations.geojson', function (data) {
    var ratIcon = L.icon({
        iconUrl: '/src/assets/gis/marker.png',
        iconSize: [24, 24]
    });
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            var marker = L.marker(latlng, { icon: ratIcon });
            marker.bindPopup(feature.properties.name);
            return marker;
        }
    }).addTo(indomaret);
});

$.getJSON(baseUrl +'/src/assets/gis/geojson/jalan_jakarta_barat.geojson', function (data) {
    L.geoJson(data, {
        style: function (feature) {
            var color,
                kode = feature.properties.kode;
            if (kode < 2) color = "#707070";
            else if (kode > 0) color = "#707070";
            else color = "#707070"; // no data
            return { color: color, weight: 1, fillOpacity: 0.8 };
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Informasi yang ingin ditampilkan");
        }
    }).addTo(jalan); 
});

$.getJSON(baseUrl +'/src/assets/gis/geojson/sungai_jakarta_barat.geojson', function (data) {
    L.geoJson(data, {
        style: function (feature) {
            var color,
                kode = feature.properties.kode;
            if (kode < 2) color = "#0000FF";
            else if (kode > 0) color = "#0000FF";
            else color = "#0000FF"; // no data
            return { color: color, weight: 1, fillOpacity: 0.8 };
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Informasi yang ingin ditampilkan");
        }
    }).addTo(sungai); 
});


$.getJSON(baseUrl + '/src/assets/gis/geojson/batas_kelurahan.geojson', function (kode) {
    L.geoJson(kode, {
        style: function (feature) {
            return { color: "#FF5733", weight: 3, fillOpacity: 0 }; // orang border, transparent fill, no dashes
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.tebet);
        }
    }).addTo(kelurahan);
});


