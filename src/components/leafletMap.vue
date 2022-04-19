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
  geojson: {
    type: Object,
    value: () => {},
  },
});

const L = leaflet;

onMounted(async () => {
  let optionsMap = {
    ...layers[localStorage.layername].options,
    ...props.optionsMap,
  };

  const map = L.map("map", {
    center: [4.6513702, -74.1136195],
    zoom: 5,
  });

  L.tileLayer(layers[localStorage.layername].url, optionsMap).addTo(map);

  if (props.geojson !== {} && props.geojson.length !== 0) {
    console.log("geoJson");
  }
});
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
