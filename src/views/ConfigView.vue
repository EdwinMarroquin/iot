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
const getCelciusChecked = computed(() =>{
  return configApp.getCelcius === "1" ? true : false;
});

const updateUnits = () => {
  configApp.setCelcius(configApp.getCelcius);
};

onMounted(()=> {
  getCelciusChecked
})
</script>

<style lang="scss">
.config {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  @media screen and (min-width: 770px) {
    display: flex;
    flex-direction: row;
  }
  div {
    flex: 1;
  }

  .units {
    $size: 1.5rem;
    border: none;
    display: flex;
    align-items: center;
    input {
      display: none;
      & + label {
        margin: 0 calc($size / 4);
        display: block;
        background: silver;
        height: $size;
        width: $size * 2;
        overflow: hidden;
        border-radius: $size;
        padding: calc($size / 8);
        &:after {
          content: "";
          display: block;
          width: $size;
          height: $size;
          border-radius: $size;
          background: grey;
        }
      }
      &:checked {
        & + label {
          &:after {
            margin-left: $size;
          }
        }
      }
    }
  }
}
</style>
-
