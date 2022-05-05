<template>
  <div id="map"></div>
</template>

<script setup>
import pointGrid from '@turf/point-grid'
import isobands from '@turf/isobands'

import leaflet from "leaflet";
import { onMounted, ref } from "vue";

import layers from "@/data/mapLayers";

const props = defineProps({
  optionsMap: {
    type: Object,
  },
  geoPoints: {
    type: Object,
  },
  dataLines: {
    type: Object,
  },
});

const L = leaflet;

const extend = ref([-74.217, 4.465, -74.003, 4.791])

const spacing = ref(1)

const grid = pointGrid(extend.value, spacing.value, {unit:"kilometers"});

for (var i = 0; i < grid.features.length; i++) {
  grid.features[i].properties.latitude = Math.random() * 10;
  grid.features[i].properties.longitude = Math.random() * 10;
  grid.features[i].properties.temperature = Math.random() * 10;
}
const breaks = [1,215,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];


const isobands_options = {
  zProperty: "temperature",
  commonProperties: {
    "fill-opacity": 0.8
  },
  breaksProperties: [
    {fill: "#e3e3ff"},
    {fill: "#c6c6ff"},
    {fill: "#a9aaff"},
    {fill: "#8e8eff"},
    {fill: "#7171ff"},
    {fill: "#5554ff"},
    {fill: "#3939ff"},
    {fill: "#1b1cff"}
  ]
};

const lines = isobands(grid, breaks, isobands_options);

onMounted(async () => {
  let optionsMap = {
    ...layers[await localStorage.getItem("layername")].options,
    ...props.optionsMap,
  };

  const map = L.map("map", {
    center: [4.631, -74.1136195],
    // center: [4.6513702, -74.1136195],
    zoom: 11,
  });

  L.tileLayer(layers[await localStorage.getItem("layername")].url, optionsMap).addTo(map);

  L.geoJson(lines, {
    weight: 1,
    color: "#00f2"
  }).addTo(map);

  if (props.geoPoints !== {} && props.geoPoints.lenght !== 0) {
    L.geoJSON(props.geoPoints, {
      weight: 3,
      color: "#de000099"
    }).addTo(map);
  }

  // if (props.isoLines !== {} && props.isoLines.lenght !== 0) {
  // }
});
</script>

<style lang="scss">
#map {
  width: 100%;
  height: 100%;
}

#map>div.leaflet-pane.leaflet-map-pane>div.leaflet-pane.leaflet-overlay-pane>svg>g>path.leaflet-interactive {
  stroke-width: 1px;
  fill-opacity: 0.1;
}
</style>
