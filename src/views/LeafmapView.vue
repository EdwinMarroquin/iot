<template>
  <LeafletMap :geoPoints="gJson"/>
</template>

<script setup>
import { ref } from "vue";
import LeafletMap from "@/components/leafletMap.vue";

import { stations } from "../data/stations";
import { getDataChannel } from "../assets/scripts/getDataChannels";

import geojson from "@/data/bogotaShape.json";

stations.forEach((s, i) => getDataChannel(s.id))

const gJson = ref(geojson);

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
