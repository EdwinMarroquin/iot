<template>
  <Transition name="fade" mode="out-in">
    <div v-if="rendered === false" class="card-sensor animated">
      <div class="card-sensor-title">CARD SENSOR</div>

      <div class="card-sensor-content datetime">
        <div class="card-sensor-content-info">
          <i class="fad fa-calendar card-sensor-content-info-icon"></i>
          00/00/00
        </div>
        <div class="card-sensor-content-info">
          <i class="fad fa-clock card-sensor-content-info-icon"></i>
          00:00:00
        </div>
      </div>

      <div class="card-sensor-content">
        <div class="card-sensor-content-title">Temperature</div>
        <div class="card-sensor-content-info">
          <div
            class="card-sensor-content-info-icon fad fa-temperature-sun"
          ></div>
          00.00 °O
        </div>
      </div>

      <div class="card-sensor-content">
        <div class="card-sensor-content-title">Humidity</div>
        <div class="card-sensor-content-info">
          <div
            class="card-sensor-content-info-icon fad fa-hand-holding-water"
          ></div>
          00.00 %
        </div>
      </div>
    </div>
    <router-link
      v-else
      class="card-sensor"
      :to="dummy ? '' : `/sensor/${sensorId}`"
      :class="[
        curr.inactive === true || curr.inactive === undefined
          ? 'sensor-inactive'
          : '',
        curr.active ? 'sensor-active' : '',
      ]"
    >
      <div class="card-sensor-title">{{ info.name }}</div>

      <div class="card-sensor-content datetime" v-if="curr.datetime !== null">
        <div class="card-sensor-content-info">
          <i class="fad fa-calendar card-sensor-content-info-icon"></i>
          {{ curr.date }}
        </div>
        <div class="card-sensor-content-info">
          <i class="fad fa-clock card-sensor-content-info-icon"></i>
          {{ curr.time }}
        </div>
      </div>

      <div class="card-sensor-content">
        <div class="card-sensor-content-title">Temperatura:</div>
        <div class="card-sensor-content-info">
          <div
            class="card-sensor-content-info-icon fad fa-temperature-sun"
          ></div>
          {{ parseUnits(curr.field1) }}
        </div>
      </div>

      <div class="card-sensor-content">
        <div class="card-sensor-content-title">Humedad:</div>
        <div class="card-sensor-content-info">
          <div
            class="card-sensor-content-info-icon fad fa-hand-holding-water"
          ></div>
          {{ parseFloat(curr.field2).toFixed(2) }} %
        </div>
      </div>
    </router-link>
  </Transition>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

import { getDataChannel } from "../assets/scripts/getDataChannels";
import { addZeros, parseUnits } from "@/assets/scripts/converUnits.js";

const props = defineProps({
  sensorId: {
    type: Number,
  },
  dummy: {
    type: Boolean,
    default: false,
  },
});

const feeds = ref({});
const info = ref({});
const prev = ref({});
const curr = ref({
  active: true,
  inactive: false,
});
const rendered = ref(false);

const getTimeSeconds = (dateString) => {
  const d = new Date(dateString);
  const dy = d.getUTCFullYear() * (60 ^ 2) * 24 * 30 * 365;
  const dm = d.getUTCMonth() * (60 ^ 2) * 24 * 30;
  const dd = d.getUTCDate() * (60 ^ 2) * 24;
  const dho = d.getUTCHours() * (60 ^ 2);
  const dmi = d.getUTCMinutes() * (60 ^ 1);
  const dse = d.getUTCSeconds() * (60 ^ 0);
  return {
    dy,
    dm,
    dd,
    dho,
    dmi,
    dse,
    result: dy + dm + dd + dho + dmi + dse,
  };
};

const getData = async () => {
  const data = await fetch(
    `https://api.thingspeak.com/channels/${props.sensorId}/feeds.json`
  );
  const d = await data.json();

  feeds.value = d.feeds;
  info.value = d.channel;
  curr.value = feeds.value[feeds.value.length - 1];

  curr.value.inactive = false;
  curr.value.active = true

  const dt = new Date(curr.value.created_at);

  curr.value.date = `${await addZeros(dt.getDate())}/${await addZeros(
    dt.getMonth()
  )}/${await addZeros(dt.getFullYear())}`;

  curr.value.time = `${addZeros(dt.getHours())}:${addZeros(
    dt.getMinutes()
  )}:${addZeros(dt.getSeconds())}`;

  curr.value.inactive =
    getTimeSeconds(new Date()).result -
      getTimeSeconds(curr.value.created_at).result >
    1200
      ? true
      : false;

  if (prev.value.created_at !== curr.value.created_at) {
    prev.value = curr.value;
    curr.value.active = true;
  } else {
    curr.value.active = false;
  }

  rendered.value = true;
};

onMounted(async () => {
  if (!props.dummy) {
    await setInterval(async () => {
      await getData();
    }, 1000);
  } else {
    rendered.value = true;
    info.value.name = "Card Sensor";
    curr.value = {
      date: "00/00/00",
      time: "00:00:00",
      field1: "00.00",
      field2: "00.00",
    };
  }
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes pulse {
  0% {
    opacity: 0.2;
  }

  50% {
    opacity: 0.1;
  }

  100% {
    opacity: 0.2;
  }
}

.animated {
  filter: grayscale(100%) blur(2px);
  animation-name: pulse;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}
</style>
