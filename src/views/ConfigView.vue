<template>
  <div class="config">
    <div class="config-display">
      <CardSensor dummy :key="cS" class="config-display-sensor" />
      <div class="config-display-map">
        <img :src="imgMap" alt="" :key="mS" />
      </div>
    </div>
    <div class="config-options">
      <h1 class="config-options-title">CONFIGURACIÓN</h1>
      <div class="config-options-option">
        <div class="option">
          <div class="option-title">Unidades</div>
          <div class="option-selections">
            <div class="option-selections-item">
              <div class="option-selections-item-label">
                Temperatura
              </div>
              <input type="checkbox" name="units" id="units"
                @input="updateUnits" :checked="getCelciusChecked"/>
              <label for="units">
                <div class="selection-label">°C</div>
                <div class="selection-label">°F</div>
              </label>
            </div>
          </div>
        </div>
        <div class="option">
          <div class="option-title">Estilo del mapa</div>
          <div class="option-selections">
            <div class="option-selections-item" v-for="(mk, mi) in layersStyles"
              :key="mi">
              <div class="option-selections-item-label">
                {{ mk.toUpperCase() }}
              </div>
              <input type="radio" name="layer" :id="`sml${mi}`" :value="mk"
                @change="updateStyleMap" :checked="getLayerChecked(mk)" />
              <label :for="`sml${mi}`">
                <div class="selection-label">SI</div>
                <div class="selection-label">NO</div>
              </label>
            </div>
          </div>
        </div>
        <div class="option">
          <div class="option-title">Lenguaje</div>
          <div class="option-selections">
            <div class="option-selections-item" v-for="(lk, li) in languages"
              :key="li">
              <div class="option-selections-item-label">
                {{ lk.toUpperCase() }}
              </div>
              <input type="radio" name="language" :id="`lng${li}`" :value="lk"
                @change="updateLang" />
              <label :for="`lng${li}`">
                <div class="selection-label">SI</div>
                <div class="selection-label">NO</div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref } from "vue";

import {
  updateLocalVar,
  getLocalVar,
} from "../assets/scripts/initializeConfig";

import CardSensor from "../components/cardSensor.vue";

const imgMap = ref();

const getRouteMap = async () => {
  imgMap.value = new URL(
    `../assets/img/map_${getLocalVar("layername")}.png`,
    import.meta.url
  ).href;
};

const languages = ref(["espanish", "english", "chinesse"]);
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
