<template>
  <div id="map"></div>
</template>

<script setup>
import leaflet from "leaflet";
import { onMounted } from "vue";

import layers from "@/data/mapLayers";

const props = defineProps({
  optionsMap: {
    type: Object,
  },
  geoPoints: {
    type: Object,
  },
});

const L = leaflet;

onMounted(async () => {
  let optionsMap = {
    ...layers[await localStorage.getItem("layername")].options,
    ...props.optionsMap,
  };

  const map = L.map("map", {
    center: [4.6513702, -74.1136195],
    zoom: 11,
  });

  L.tileLayer(layers[await localStorage.getItem("layername")].url, optionsMap).addTo(map);

  if (props.geoPoints !== {} && props.geoPoints.lenght !== 0) {
    L.geoJSON(props.geoPoints).addTo(map);
  }
});
</script>

<style lang="scss">
#map {
  width: 100%;
  height: 100%;
}
#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane > svg > g > path.leaflet-interactive {
  stroke-width: 1px;
  fill-opacity: 0.1;
}
</style>
