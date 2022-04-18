<template>
  <div id="map"></div>
</template>

<script setup>
import leaflet from "leaflet";
import { onMounted, computed } from "vue";

import { useLayersMapStore } from "@/stores/layersMapStore";

const dataMap = computed(() => useLayersMapStore().getLayerMap);

const props = defineProps({
  optionsMap: {
    type: Object,
    default: {}
  },
});


const L = leaflet;


onMounted(async () => {
  let optionsMap = {
    ...dataMap.value.options,
    ...props.optionsMap,
  };

  const map = L.map("map", {
    center: [4.6667909405191095, -74.1088525556178],
    zoom: 10,
  });

  // Set the position and zoom level of the map
  L.tileLayer(dataMap.value.url, optionsMap).addTo(map);
});
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
