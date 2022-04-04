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


import { ref } from "vue";

const listRoutes = ref([
  { label: "home", icon: "home" },
  { label: "sensors", icon: "sensor-cloud" },
  { label: "map", icon: "map" },
  { label: "geomap", icon: "draw-polygon" },
]);
</script>
