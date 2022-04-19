<template>
  <div id="map"></div>
</template>

<script setup>
import leaflet from "leaflet";
import { onMounted, computed } from "vue";

import { useLayersMapStore } from "@/stores/layersMapStore";
import layers from "@/data/mapLayers";

const props = defineProps({
  optionsMap: {
    type: Object,
  },
  geojson: {
    type: Object,
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

  if (props.geojson.lenght !== 0) {
    console.log("geoJson")
  }
});
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
