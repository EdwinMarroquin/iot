<template>
  <Transition name="fade" :duration="{ enter: 1000, leave: 800 }" mode="out-in">
    <div
      v-if="rendered === false"
      class="ui-mark"
      style="filter: blur(2px) grayscale(100%)"
    >
      <div class="ui-mark-title">
        <div style="margin-bottom:.5rem;width: 100%; background: silver; height: 1rem"></div>
      </div>

      <div class="ui-mark-content">
        <div class="ui-mark-content-title"></div>
        <div class="ui-mark-content-info">
          <div class="ui-mark-content-info-icon fal fa-temperature-sun"></div>
          <div style="width: 70%; background: silver; height: 1rem"></div>
        </div>
      </div>

      <div class="ui-mark-content">
        <div class="ui-mark-content-title"></div>
        <div class="ui-mark-content-info">
          <div
            class="ui-mark-content-info-icon fal fa-hand-holding-water"
          ></div>
          <div style="width: 70%; background: silver; height: 1rem"></div>
        </div>
      </div>
    </div>
    <router-link
      v-else
      class="ui-mark"
      :to="'/sensor/' + id"
      :class="[active ? 'sensor-active' : '']"
    >
      <div class="ui-mark-title">{{ info.name }}</div>

      <div class="ui-mark-content">
        <div class="ui-mark-content-title">Temperatura:</div>
        <div class="ui-mark-content-info">
          <div class="ui-mark-content-info-icon fal fa-temperature-sun"></div>
          {{ parseFloat(curr.field1).toFixed(2) }} &#176;C
        </div>
      </div>

      <div class="ui-mark-content">
        <div class="ui-mark-content-title">Humedad:</div>
        <div class="ui-mark-content-info">
          <div
            class="ui-mark-content-info-icon fal fa-hand-holding-water"
          ></div>
          {{ parseFloat(curr.field2).toFixed(2) }} %
        </div>
      </div>
    </router-link>
  </Transition>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import { useAppState } from "@/stores/appState";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const appState = useAppState();

const feeds = ref({});
const info = ref({});
const prev = ref({});
const curr = ref({});
const bgColor = ref();
const txColor = ref();
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}</style>
