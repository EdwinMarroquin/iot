<template>
  <div id="map"></div>
</template>

<script setup>
import leaflet from "leaflet";
import { onMounted,  computed, nextTick } from "vue";

import { useLayersMapStore } from "@/stores/layersMapStore";
import layers from "@/data/mapLayers";

const props = defineProps({
  optionsMap: {
    type: Object,
  },
});

const L = leaflet;


onMounted(async () => {

  const layerName = await computed(() => {
    return useLayersMapStore().getLayerName;
  });

  let optionsMap = {
    ...layers[localStorage.layername].options,
    ...props.optionsMap,
  };

  const map = L.map("map", {
    center: [4.6513702, -74.1136195],
    zoom: 5,
  });


  L.tileLayer(layers[localStorage.layername].url, optionsMap).addTo(map);
});
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
