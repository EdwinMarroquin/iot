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
  { label: "home", path: "/", icon: "home" },
  { label: "sensors", path: "/sensors", icon: "sensor-cloud" },
  { label: "map", path: "/map", icon: "map" },
  { label: "geomap", path: "/geomap", icon: "draw-polygon" },
]);
</script>
