<template>
  <!-- <div class="loading" v-if="useAppState().getLoad !== true">Loading</div> -->
  <div class="sensors">
    <CardSensor v-for="(station, key) in listStations" :key="key" :sensorId="station.id" />
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { stations } from "@/data/stations.js";
import CardSensor from "../components/cardSensor.vue";
import { useAppState } from "../stores/appState";

const listStations = ref(stations);

onMounted(async () => {
  // await useAppState().setLoad(false);
})

</script>

<style lang="scss" scoped>
.sensors {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(11.5rem, 1fr));
}
</style>
