<template>
  <GoogleMap
    api-key="AIzaSyAor4_IQ6zbgIQ44djnjKo1EdsFD8CyqfQ"
    style="width: 100%; height: 100%"
    :styles="[4]"
    :zoom="11.01"
    :center="center"
  >
    <Marker v-for="(s, k) in dataStations" :key="k" :options="s.options">
      <InfoWindow>
        <CardSensor :sensorId="s.info.id" />
      </InfoWindow>
    </Marker>
  </GoogleMap>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
import CardSensor from "../components/cardSensor.vue";

import { stations } from "@/data/stations.js";

const listStations = ref(stations);

const center = ref({
  lat: parseFloat(4.643843),
  lng: parseFloat(-74.1074564),
});
const fullData = ref([]);
const dataStations = reactive([]);

const getStations = async () => {
  listStations.value.map(async (station) => {
    const data = await fetch(
      `https://api.thingspeak.com/channels/${station.id}/feeds.json?results=1`
    );
    const d = await data.json();
    await fullData.value.push(d);
    dataStations.push({
      info: {
        id: d.channel.id,
        name: d.channel.name,
        t: parseFloat(d.feeds[d.feeds.length - 1].field1),
        h: parseFloat(d.feeds[d.feeds.length - 1].field2),
      },
      options: {
        position: {
          // usar si todos los canales estan correctamente configurados
          // lat: parseFloat(d.channel.latitude),
          // lng: parseFloat(d.channel.longitude),

          lat: stations.filter(s => d.channel.id === s.id )[0].latitude,
          lng: stations.filter(s => d.channel.id === s.id )[0].longitude,
        },
        title: d.channel.id.toString(),
      },
    });
  });
};

const getData = async () => {
  listStations.value.map(async (station) => {
    const data = await fetch(
      `https://api.thingspeak.com/channels/${station.id}/feeds.json?results=1`
    );
    const d = await data.json();
    fullData.value.forEach((s, i) => {
      if (s.channel.id === d.channel.id) {
        dataStations[i].info.t = parseFloat(d.feeds[0].field1);
        dataStations[i].info.h = parseFloat(d.feeds[0].field2);
      }
    });
  });
};

onMounted(async () => {
  await getStations();
  setInterval(() => {
    getData();
  }, 1000);
});
</script>

<style></style>
