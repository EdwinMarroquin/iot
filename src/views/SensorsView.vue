<template>
  <div class="sensors">
    <CardSensor
      v-for="(station, key) in listStations"
      :key="key"
      :id="station.id"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import {stations} from "@/data/stations.js";
import CardSensor from "../components/cardSensor.vue";

const listStations = ref(stations);
</script>

<style lang="scss" scoped>
.sensors {
display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr) ) ;
}
</style>
