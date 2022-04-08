<template>
  <div class="config">
    <div>
      <CardSensor dummy />
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
    <div>hola</div>
    <div>hola</div>
  </div>
</template>

<script setup>
import CardSensor from "../components/cardSensor.vue";
import { useUnitsState } from "@/stores/unitsState";
import { computed, onMounted } from "vue";

const configApp = useUnitsState();

const getCelciusChecked = computed(() => {
  return configApp.getCelcius === "1" ? true : false;
});

const updateUnits = (e) => {
 configApp.setCelcius(e.target.checked);
};

onMounted(() => {
  getCelciusChecked;
});
</script>
