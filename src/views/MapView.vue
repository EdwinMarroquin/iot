<template>
  <GoogleMap
    api-key="AIzaSyAor4_IQ6zbgIQ44djnjKo1EdsFD8CyqfQ"
    style="width: 100%; height: 100%"
    :styles="[2]"
    :zoom="11"
    :center="center"
    titl="1"
  >
    <Marker v-for="(s, k) in dataStations" :key="k" :options="s.options">
      <InfoWindow>
        <div class="ui-mark-title">{{ s.info.id }}</div>

        <div class="ui-mark-content">
          <div class="ui-mark-content-title">Temperatura:</div>
          <div class="ui-mark-content-info">
            <div class="ui-mark-content-info-icon fal fa-temperature-sun"></div>
            {{ parseFloat(s.info.t).toFixed(2) }} &#176;C
          </div>
        </div>

        <div class="ui-mark-content">
          <div class="ui-mark-content-title">Humedad:</div>
          <div class="ui-mark-content-info">
            <div class="ui-mark-content-info-icon fal fa-hand-holding-water"></div>
            {{ parseFloat(s.info.h).toFixed(2) }} %
          </div>
        </div>
      </InfoWindow>
    </Marker>
  </GoogleMap>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";

import { stations } from "@/data/stations.js";

const listStations = ref(stations);

const center = ref({});
const fullData = ref([]);
const dataStations = ref([]);

const getData = async () => {
  listStations.value.map(async (station) => {
    const data = await fetch(
      `https://api.thingspeak.com/channels/${station.id}/feeds.json`
    );
    const d = await data.json();
    await fullData.value.push(d);
    // console.log(d)
    dataStations.value.push({
      info: {
        id: d.channel.name,
        t: parseFloat(d.feeds[d.feeds.length - 1].field1),
        h: parseFloat(d.feeds[d.feeds.length - 1].field2),
      },
      options: {
        position: {
          lat: parseFloat(d.channel.latitude),
          lng: parseFloat(d.channel.longitude),
        },
        title: d.channel.id.toString(),
      },
    });
  });
};

onBeforeMount(() => {
  getData();
  center.value = { lat: 4.6456398, lng: -74.1788349 };
});
</script>

<style></style>
