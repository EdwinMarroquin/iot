<template>
  <div class="config">
    <div class="display">
      <CardSensor dummy :key="cS" />
      <img :src="imgMap" alt="" :key="mS" />
    </div>
    <div>
      <div class="config-item">
        UNIDADES :
        <fieldset class="units">
          °C
          <input
            type="checkbox"
            name="units"
            id="units"
            @input="updateUnits"
            :checked="getCelciusChecked"
          />
          <label for="units"></label>
          °F
        </fieldset>
      </div>
      <div class="config-map">
        <div class="config-map-item" v-for="(mk, mi) in layersStyles" :key="mi">
          <input
            type="radio"
            name="layer"
            :id="`sml${mi}`"
            :value="mk"
            @change="updateStyleMap"
            :checked="getLayerChecked(mk)"
          />
          <label :for="`sml${mi}`">{{ mk.toUpperCase() }}</label>
        </div>
      </div>
    </div>
    <div>
      <div class="config-title">LANGUAGUE</div>
      <div class="config-lang" v-for="(lk, li) in languagues" :key="li">
        <input
          type="radio"
          name="lng"
          :id="`lng${li}`"
          :value="lk"
          @change="updateLang"
        />
        <label :for="`lng${li}`">{{ lk.toUpperCase() }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref } from "vue";

import CardSensor from "../components/cardSensor.vue";

import { useUnitsStore } from "@/stores/unitsStore";
import { useLayersMapStore } from "@/stores/layersMapStore.js";

const imgMap = ref();

const getRouteMap = async () => {
  imgMap.value = new URL(
    `../assets/img/map_${localStorage.layername}.png`,
    import.meta.url
  ).href;
};

const languagues = ref(["espanish", "english", "chinesse"]);
const layersStyles = ref(["base", "light", "dark", "printer"]);

const cS = ref(0);
const mS = ref(0);

const getCelciusChecked = computed(() => {
  let c =
    localStorage.celcius !== undefined
      ? localStorage.celcius
      : useUnitsStore().getCelcius;
  return c === "1" ? true : false;
});

const getLayerChecked = (e) => {
  let l =
    localStorage.layername !== undefined
      ? localStorage.layername
      : useLayersMapStore().getLayerName;
  return l === e ? true : false;
};

const updateUnits = async (e) => {
  await useUnitsStore().setCelcius(e.target.checked);
  cS.value++;
};

const updateLang = async (e) => {
  console.log(await e.target.value);
};

const updateStyleMap = async (e) => {
  await useLayersMapStore().setLayerName(e.target.value);
  getRouteMap();
};

onBeforeMount(async ()=>{

  await getRouteMap;
})

onMounted(async () => {
  await getCelciusChecked;
});
</script>

<style>
@import url(https://unpkg.com/leaflet@1.7.1/dist/leaflet.css);

.display {
  pointer-events: none;
}

.map {
  display: flex;
  flex: 1;
  width: 100%;
  /* height: 100%; */
  padding-bottom: 25%;
  border: 1px solid silver;
  border-radius: 0.5rem;
}

.leaflet-control-zoom.leaflet-bar.leaflet-control,
.leaflet-control-attribution.leaflet-control {
  display: none !important;
}
</style>
