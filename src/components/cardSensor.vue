<template>
  <router-link class="ui-mark" :to="'/sensor/' + id" :style="'background:'+ bgColor + ';color:' + txColor">
    <div class="ui-mark-title">{{ info.id }}</div>

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
        <div class="ui-mark-content-info-icon fal fa-hand-holding-water"></div>
        {{ parseFloat(curr.field2).toFixed(2) }} %
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const feeds = ref({});
const info = ref({});
const prev = ref({});
const curr = ref({});
const bgColor = ref();
const txColor = ref();

const getData = async () => {

  const data = await fetch(
    `https://api.thingspeak.com/channels/${props.id}/feeds.json`
  )
  const d = await data.json();
  feeds.value = d.feeds;
  info.value = d.channel;
  curr.value = feeds.value[feeds.value.length - 1]

  if(prev.value.created_at !== curr.value.created_at) {
    prev.value = curr.value;
    bgColor.value ='green'
    txColor.value ='white'
  } else {
    bgColor.value ='whitesmoke'
    txColor.value ='#333'
  }
};

onBeforeMount(() => {
  setInterval(() => {
    getData();
  }, 2000);

})
</script>

<style>
.ui-mark {
  display: flex;
  flex-direction: column;
  min-width: 6rem;
  margin: 0.5rem;
  padding: 1rem;
  background: whitesmoke;
  text-decoration: none;
  color: #333;
  border-radius: 0.5rem;
}

.ui-mark-title {
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid;
  padding-bottom: 0.125rem;
}

.ui-mark-content {
  margin-bottom: 0.25rem;
}

.ui-mark-content-title {
  font-size: 0.7rem;
}

.ui-mark-content-info {
  font-weight: bold;
  font-size: 1.25rem;
}

.ui-mark-content-info-icon {
  margin-right: 0.25rem;
}
</style>
