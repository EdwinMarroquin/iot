<template>
  <HeaderPartial />
  <div class="main--wrapper">
    <NavigateComponent :routes="listRoutes" />
    <MainPartial />
  </div>
  <FooterPartial />
</template>

<script setup>
import NavigateComponent from "@/components/navigateComponent.vue";
import HeaderPartial from "@/partials/headerPartial.vue";
import FooterPartial from "@/partials/footerPartial.vue";
import MainPartial from "@/partials/mainPartial.vue";

import { onMounted, ref } from "vue";

import { setLocalVars } from "./assets/scripts/initializeConfig";

const listRoutes = ref([
  { label: "home", path: "/", icon: "home" },
  { label: "sensors", path: "/sensors", icon: "sensor-cloud" },
  { label: "map", path: "/map", icon: "map" },
  { label: "lmap", path: "/lmap", icon: "draw-polygon" },
]);

const initializeVariables = async () => {
  await setLocalVars([
    { name: "unitsTemp", value: "celcius" },
    { name: "layername", value: "base" },
    { name: "language", value: "spanish" },
  ]);
};

onMounted(async () => {
  await initializeVariables();
});
</script>
