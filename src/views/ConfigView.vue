<template>
  <div class="config">
    <div class="config-display">
      <CardSensor dummy :key="cS" class="config-display-sensor" />
      <div class="config-display-map">
        <img :src="imgMap" alt="" :key="mS" />
      </div>
    </div>
    <div class="config-options">
      <h1 class="config-options-title">Configuración</h1>
      <div class="config-options-option">
        <div class="option">
          <div class="option-title">
            UNIDADES
          </div>
          <div class="option-selections">
            <div class="option-selections-item">
              <input type="checkbox" name="units" id="units" @input="updateUnits">
              <label for="units"></label>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="config-item">
          UNIDADES :
          <fieldset class="units">
            °C
            <input type="checkbox" name="units" id="units" @input="updateUnits"
              :checked="getCelciusChecked" />
            <label for="units"></label>
            °F
          </fieldset>
        </div>
        <div class="config-map">
          <div class="config-map-item" v-for="(mk, mi) in layersStyles"
            :key="mi">
            <input type="radio" name="layer" :id="`sml${mi}`" :value="mk"
              @change="updateStyleMap" :checked="getLayerChecked(mk)" />
            <label :for="`sml${mi}`">{{ mk.toUpperCase() }}</label>
          </div>
        </div>
      </div>
      <div>
        <div class="config-title">LANGUAGUE</div>
        <div class="config-lang" v-for="(lk, li) in languagues" :key="li">
          <input type="radio" name="lng" :id="`lng${li}`" :value="lk"
            @change="updateLang" />
          <label :for="`lng${li}`">{{ lk.toUpperCase() }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref } from "vue";

import { updateLocalVar, getLocalVar } from "../assets/scripts/initializeConfig";

import CardSensor from "../components/cardSensor.vue";

const imgMap = ref();

const getRouteMap = async () => {
  imgMap.value = new URL(
    `../assets/img/map_${getLocalVar("layername")}.png`,
    import.meta.url
  ).href;
};

const languagues = ref(["espanish", "english", "chinesse"]);
const layersStyles = ref(["base", "light", "dark", "printer"]);

const cS = ref(0);
const mS = ref(0);

const getCelciusChecked = computed(() => {
  return getLocalVar("celcius");
});

const getLayerChecked = (e) => {
  return getLocalVar("layername") === e ? true : false;
};

const updateUnits = async (e) => {
  await updateLocalVar("celcius", !e.target.checked);
  cS.value++;
};

const updateLang = async (e) => {
  console.log(await e.target.value);
};

const updateStyleMap = async (e) => {
  updateLocalVar("layername", e.target.value);
  await getRouteMap();
};

onBeforeMount(async () => {
  getCelciusChecked;
});

onMounted(async () => {
  getRouteMap();
});
</script>

<style lang="scss">
</style>
