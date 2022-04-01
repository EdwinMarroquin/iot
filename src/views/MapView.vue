<template>
  <GoogleMap
    api-key="AIzaSyAor4_IQ6zbgIQ44djnjKo1EdsFD8CyqfQ"
    style="width: 100%; height: 100%"
    :zoom="11"
    :center="center"
  >
    <Marker v-for="(s, k) in options" :key="k" :options="s"></Marker>
  </GoogleMap>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

import { stations } from "@/data/stations.js";

const listStations = ref(stations);

const center = ref({});
const fullData = ref([]);
const options = ref([]);

const getData = async () => {
  listStations.value.map(async (station) => {
    const data = await fetch(
      `https://api.thingspeak.com/channels/${station.id}/feeds.json`
    );
    const d = await data.json();
    await fullData.value.push(d);
    // console.log(d)
    options.value.push({
      position: {
        lat: parseFloat(d.channel.latitude),
        lng: parseFloat(d.channel.longitude),
      },
      title: d.channel.id.toString(),
    });
  });
};

onBeforeMount(() => {
  getData();
  center.value = { lat: 4.6456398, lng: -74.1788349 };
});
</script>

<style></style>
