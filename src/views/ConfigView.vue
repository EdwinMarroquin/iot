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
          <div class="option-title">Temperatura</div>
          <div class="option-selections">
            <div class="option-selections-item" v-for="(uTk, uTi) in unitsTemp"
              :key="uTi">
              <div class="option-selections-item-label">
                {{ uTk.toUpperCase() }}
              </div>
              <input type="radio" name="unitsTemp" :id="`temperature_units_${uTi}`" :value="uTk"
                @change="updateUnits" :checked="getUnitsTempChecked(uTk)" />
              <label :for="`temperature_units_${uTi}`">
                <div class="selection-label">SI</div>
                <div class="selection-label">NO</div>
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
              <input type="radio" name="layer" :id="`style_layer_map_${mi}`" :value="mk"
                @change="updateStyleMap" :checked="getLayerChecked(mk)" />
              <label :for="`style_layer_map_${mi}`">
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
              <input type="radio" name="language" :id="`language_${li}`" :value="lk"
                @change="updateLang" :checked="getLanguage(lk)"  />
              <label :for="`language_${li}`">
                <div class="selection-label">SI</div>
                <div class="selection-label">NO</div>
              </label>
            </div>
          </div>
        </div>
        <div class="option">
          <div class="option-title">interpolacion</div>
          <div class="option-selections">
            <div class="option-selections-item" v-for="(ik, ii) in inerpolations"
              :key="ii">
              <div class="option-selections-item-label">
                {{ ik.toUpperCase() }}
              </div>
              <input type="radio" name="interpolation" :id="`interpolation_${ii}`" :value="ik"
                @change="updateInterpolation" :checked="getInterpolation(ik)"  />
              <label :for="`interpolation_${ii}`">
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

const unitsTemp = ref(["celcius", "fahrenheit"]);
const languages = ref(["spanish", "english", "chinesse"]);
const layersStyles = ref(["base", "light", "dark", "printer"]);
const inerpolations = ref(["idw", "krigin", "half-krigin"]);

const cS = ref(0);
const mS = ref(0);

const getUnitsTempChecked = (e) => {
  return getLocalVar("unitsTemp") === e ? true : false;
};

const getLayerChecked = (e) => {
  return getLocalVar("layername") === e ? true : false;
};

const getLanguage = (e) => {
  return getLocalVar("language") === e ? true : false;
};

const getInterpolation = (e) => {
  return getLocalVar("interpolation") === e ? true : false;
};

const updateUnits = (e) => {
  updateLocalVar("unitsTemp", e.target.value);
  cS.value++;
};

const updateLang = async (e) => {
  updateLocalVar("language", e.target.value);
};

const updateInterpolation = async (e) => {
  updateLocalVar("interpolation", e.target.value);
};

const updateStyleMap = async (e) => {
  updateLocalVar("layername", e.target.value);
  await getRouteMap();
};

onMounted(async () => {
  getRouteMap();
});
</script>

<style lang="scss">
</style>
