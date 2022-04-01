<template>
  <!-- <div class="loading" v-if="useAppState().getLoad !== true">Loading</div> -->
  <div class="sensors">
    <CardSensor v-for="(station, key) in listStations" :key="key" :id="station.id" />
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { stations } from "@/data/stations.js";
import CardSensor from "../components/cardSensor.vue";
import { useAppState } from "../stores/appState";

const listStations = ref(stations);

onBeforeMount(async () => {
  await useAppState().setLoad(false);
})

onMounted(async () => {
  console.log(await useAppState().getLoad)
})

</script>

<style lang="scss" scoped>
.sensors {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
}
</style>
