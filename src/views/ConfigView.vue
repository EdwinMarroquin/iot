<template>
  <div class="config">
    <div>
      <div class="config-title">LANGUAGUE</div>
      <div class="config-lang">
        <input type="radio" name="lng" id="lng1">
        <label for="lng1">SPANISH</label>
      </div>
      <div class="config-lang">
        <input type="radio" name="lng" id="lng2">
        <label for="lng2">ENGLISH</label>
      </div>
      <div class="config-lang">
        <input type="radio" name="lng" id="lng3">
        <label for="lng3">CHINESSE</label>
      </div>
    </div>
    <div>
      <CardSensor dummy :key="cS" />
      <div class="config-item">
        UNIDADES :<fieldset class="units">
          °C
          <input type="checkbox" name="units" id="units" @input="updateUnits"
            :checked="getCelciusChecked" />
          <label for="units"></label>
          °F
        </fieldset>
      </div>
    </div>
    <div>
      <div id="map"></div>
      <div class="config-map">
        <div class="config-map-item">
          <input type="radio" name="layer" id="layer1" value="Base">
          <label for="layer1">BASE</label>
        </div>
        <div class="config-map-item">
          <input type="radio" name="layer" id="layer2" value="Light">
          <label for="layer2">LIGHT</label>
        </div>
        <div class="config-map-item">
          <input type="radio" name="layer" id="layer3" value="Dark">
          <label for="layer3">DARK</label>
        </div>
        <div class="config-map-item">
          <input type="radio" name="layer" id="layer4" value="Printer">
          <label for="layer4">PRINTER</label>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import leaflet from "leaflet";
import { computed, onMounted, ref } from "vue";


import CardSensor from "../components/cardSensor.vue";
import { useUnitsStore } from "@/stores/unitsStore";
import { useLayersMapStore } from "@/stores/layersMapStore";

import layers from '@/data/mapLayers.js'

console.log(layers)

const cS = ref(0);
const unitsStore = useUnitsStore();

const getCelciusChecked = computed(() => {
  let c =
    localStorage.celcius !== undefined
      ? localStorage.celcius
      : unitsStore.getCelcius;
  return c === "1" ? true : false;
});

const updateUnits = async (e) => {
  await unitsStore.setCelcius(e.target.checked);
  cS.value++;
};

onMounted(() => {

  getCelciusChecked;

  const L = leaflet;
  var map = L.map("map", {
    center: [4.6667909405191095, -74.1088525556178],
    zoom: 10,
  });

  // Set the position and zoom level of the map
  const lm = useLayersMapStore().getLayerMap;
  console.log(lm)
  L.tileLayer(lm.url, lm.options).addTo(map)
  console.log(L)
});
</script>

<style>
@import url(https://unpkg.com/leaflet@1.7.1/dist/leaflet.css);

#map {
  display: flex;
  flex: 1;
  width: 100%;
  padding-bottom: 75%;
}
</style>
