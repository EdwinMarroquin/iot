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

import { setLocalVars } from "./assets/scripts/initializeConfig";
import { onMounted, ref } from "vue";

const listRoutes = ref([
  { label: "home", path: "/", icon: "home" },
  { label: "sensors", path: "/sensors", icon: "sensor-cloud" },
  { label: "map", path: "/map", icon: "map" },
  { label: "customMap", path: "/customMap", icon: "draw-polygon" },
]);

onMounted(() => {
  setLocalVars([
    { name: "celcius", value: 1 },
    { name: "layername", value: "base" },
  ]);
});
</script>
