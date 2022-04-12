<template>
  <div class="config">
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
      <div class="config-item">
        <input type="radio" name="lng" id="lng1">
        <label for="lng1">lng1</label>
      </div>
      <div class="config-item">
        <input type="radio" name="lng" id="lng2">
        <label for="lng2">lng2</label>
      </div>
      <div class="config-item">
        <input type="radio" name="lng" id="lng3">
        <label for="lng3">lng3</label>
      </div>
    </div>
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
