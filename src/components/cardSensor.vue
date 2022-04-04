<template>
  <Transition name="fade" :duration="{ enter: 1000, leave: 800 }" mode="out-in">
    <div
      v-if="rendered === false"
      class="card-sensor animated"
      style="filter: blur(2px) grayscale(100%)"
    >
      <div class="card-sensor-title">
        <div
          style="
            margin-bottom: 0.5rem;
            width: 100%;
            background: silver;
            height: 1rem;
          "
        ></div>
      </div>

      <div class="card-sensor-content">
        <div class="card-sensor-content-title"></div>
        <div class="card-sensor-content-info">
          <div class="card-sensor-content-info-icon fad fa-temperature-sun"></div>
          <div style="width: 70%; background: silver; height: 1rem"></div>
        </div>
      </div>

      <div class="card-sensor-content">
        <div class="card-sensor-content-title"></div>
        <div class="card-sensor-content-info">
          <div
            class="card-sensor-content-info-icon fad fa-hand-holding-water"
          ></div>
          <div style="width: 70%; background: silver; height: 1rem"></div>
        </div>
      </div>
    </div>
    <router-link
      v-else
      class="card-sensor"
      :to="'/sensor/' + id"
      :class="[active ? 'sensor-active' : '']"
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
          <div class="card-sensor-content-info-icon fad fa-temperature-sun"></div>
          {{ parseFloat(curr.field1).toFixed(2) }} &#176;C
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
import { ref, onMounted } from "vue";
import { useAppState } from "@/stores/appState";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const addZeros = (n) => {
  if (n <= 9) {
    return `0${n}`;
  }
  return n.toString();
};

const feeds = ref({});
const info = ref({});
const prev = ref({});
const curr = ref({});
const active = ref(false);
const rendered = ref(false);

const getData = async () => {
  const data = await fetch(
    `https://api.thingspeak.com/channels/${props.id}/feeds.json`
  );
  const d = await data.json();
  feeds.value = d.feeds;
  info.value = d.channel;
  curr.value = feeds.value[feeds.value.length - 1];

  const dt = new Date(curr.value.created_at);

  curr.value.date = `${addZeros(dt.getDay())}/${addZeros(
    dt.getMonth()
  )}/${dt.getFullYear()}`;
  curr.value.time = `${addZeros(dt.getHours())}:${addZeros(
    dt.getMinutes()
  )}:${addZeros(dt.getSeconds())}`;

  await useAppState().incrementCount();

  if (prev.value.created_at !== curr.value.created_at) {
    prev.value = curr.value;
    active.value = true;
  } else {
    active.value = false;
  }
  rendered.value = true;
};

onMounted(async () => {
  await setInterval(async () => {
    await getData();
  }, 2000);
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
    filter: blur(2px) grayscale(100%);
  }

  50% {
    filter: blur(4px) grayscale(100%);
  }

  100% {
    filter: blur(2px) grayscale(100%);
  }
}

.animated {
  animation-name: pulse;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}
</style>
