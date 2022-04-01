<template>
  <GoogleMap
    api-key="AIzaSyAor4_IQ6zbgIQ44djnjKo1EdsFD8CyqfQ"
    style="width: 100%; height: 100%"
    :center="center"
    :zoom="11"
  >
    <Marker v-for="(data, key) in fullData.value" :key="key" :options="{}"/>
  </GoogleMap>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { GoogleMap } from "vue3-google-map";

import { stations } from "@/data/stations.js";

const listStations = ref(stations);

const center = ref({});
const fullData = ref([]);

const getData = async () => {
  listStations.value.map(async (station) => {
    const data = await fetch(
      `https://api.thingspeak.com/channels/${station.id}/feeds.json`
    );
    const d = await data.json();
    await fullData.value.push(d)
  })
};

onBeforeMount(() => {
  getData();
  center.value = { lat: 4.6456398, lng: -74.1788349 };
  console.log(fullData.value)
 });
</script>

<style></style>
