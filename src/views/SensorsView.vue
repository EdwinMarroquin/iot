<template>
  <div class="about">
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
// import NavigateComponent from "../components/navigateComponent.vue";
import CardSensor from "../components/cardSensor.vue";

const listStations = ref(stations);
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
