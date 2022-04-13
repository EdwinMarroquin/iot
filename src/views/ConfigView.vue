<template>
  <div class="config">
    <div></div>
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
    <div></div>
  </div>
</template>

<script setup>
import CardSensor from "../components/cardSensor.vue";
import { useUnitsState } from "@/stores/unitsState";
import { computed, onMounted, ref } from "vue";

const cS = ref(0);
const unitsStore = useUnitsState();

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
});
</script>
