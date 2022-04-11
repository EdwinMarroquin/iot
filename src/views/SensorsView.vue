<template>
  <div class="sensors">
    <CardSensor
      v-if="statusRender"
      v-for="(station, key) in listStations"
      :key="key"
      :sensorId="station.id"
    />
    <div class="loading" v-else>
      <div class="loading-spinner"></div>
      <div class="loading-progress">
        <div class="loading-progress-label">
          {{
            statusLoading === 0
              ? "LOADING ..."
              : parseFloat(statusLoading).toFixed(2) + " %"
          }}
        </div>
        <div class="loading-progress-stat" :style="{ width: statusLoading + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { stations } from "@/data/stations.js";
import CardSensor from "../components/cardSensor.vue";
import { useAppState } from "@/stores/appState";

const listStations = ref(stations);

const statusRender = computed(() => {
  return useAppState().getCounter >= stations.length ? true : false;
});

const statusLoading = ref(0);

const checkOnlineStatus = async () => {
  try {
    const online = await fetch('https://google.com');
    return online.status >= 200 && online.status < 300;
  } catch(err) {
    return this;
  }
}

onMounted(async () => {
  stations.forEach(async (s, i) => {
    const data = await fetch(
      `https://api.thingspeak.com/channels/${s.id}/feeds.json`
    );
    if ((await data.status) === 200) {
      setTimeout(async () => {
        await useAppState().updateStatus();
        statusLoading.value =
          100 * (useAppState().getCounter / stations.length);
      }, 200 * i);
    }
  });
  checkOnlineStatus();
});
</script>

<style lang="scss" scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.sensors {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(11.5rem, 1fr));
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &-spinner {
      width: 3rem;
      height: 3rem;
      border-radius: 10rem;
      border-width: 0.25rem;
      border-color: transparent transparent transparent #fbc02d;
      border-style: solid;
      margin-bottom: 1rem;
      animation: spin linear 0.5s infinite;
    }
    &-progress {
      border: 1px solid #fbc02d;
      width: 10rem;
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border-radius: 0.5rem;
      overflow: hidden;
      &-label {
        z-index: 1;
      }
      &-stat {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: 10%;
        height: 100%;
        display: block;
        background: #fbc02d;
      }
    }
  }
}
</style>
