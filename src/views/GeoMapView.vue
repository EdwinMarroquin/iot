<template>
  <!-- <div id="map"></div> -->
  <LeafletMap :key="mS"/>
</template>

<script setup>
import { onMounted, ref } from "vue";
import LeafletMap from "@/components/leafletMap.vue";

const mS = ref(0);

onMounted(() => {
  setTimeout(() => mS.value++, 500);
});
</script>

<style>
@import url(https://unpkg.com/leaflet@1.7.1/dist/leaflet.css);

#map {
  width: 100%;
  height: 100%;
}

#map
  > div.leaflet-control-container
  > div.leaflet-bottom.leaflet-right
  > div
  > a:nth-child(1) {
  display: none;
}
</style>
