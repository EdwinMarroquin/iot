<template>
  <div id="map"></div>
</template>

<script setup>
import 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
import leaflet from "leaflet"
import { onMounted } from "vue"
// import geojson from "@/data/bogotaShape.geojson";

console.log(leaflet)
onMounted(()=> {
  L.map("map", {center: [31.262218, 34.801472], zoom: 17})
})
</script>

<style>
@import url(https://unpkg.com/leaflet@1.7.1/dist/leaflet.css);
#map  {
  width:100%;
  height:100%;
}
</style>
