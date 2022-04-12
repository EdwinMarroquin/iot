<template>
  <div id="map"></div>
</template>

<script setup>
// import 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
import leaflet from "leaflet";
import { onMounted } from "vue";
// import geojson from "@/data/bogotaShape.geojson";

console.log(leaflet);
onMounted(() => {
  // Initialize leaflet.js

  // Initialize the map
  var map = leaflet.map("map", {
    scrollWheelZoom: false,
  });

  // Set the position and zoom level of the map
  map.setView([4.711, -74.639], 10);

  // Initialize the base layer
  var osm_mapnik = leaflet.tileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        'By <a href="https://edwinmarroquin.github.io/iot/#/">Edwin Marroquin</a> |',
    }
  ).addTo(map);
});
</script>

<style>
@import url(https://unpkg.com/leaflet@1.7.1/dist/leaflet.css);

#map {
  width: 100%;
  height: 100%;
}

#map > div.leaflet-control-container > div.leaflet-bottom.leaflet-right > div > a:nth-child(1) {
  display:none;
}
</style>
