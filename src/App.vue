<template>
<link rel="manifest" href="/manifest.json">
  <PwaPrompt />
  <HeaderPartial />
  <div class="main--wrapper">
    <NavigateComponent />
    <MainPartial />
  </div>
  <FooterPartial />
</template>

<script setup>
import PwaPrompt from "@/components/pwaPrompt.vue";
import NavigateComponent from "@/components/navigateComponent.vue";
import HeaderPartial from "@/partials/headerPartial.vue";
import FooterPartial from "@/partials/footerPartial.vue";
import MainPartial from "@/partials/mainPartial.vue";
import "@/assets/scss/main.scss";
</script>
