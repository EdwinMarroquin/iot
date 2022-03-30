<template>
  <div>
    <h1>INTEUD</h1>
    <hr class="divider" />
    <p>
      <strong>
        El Area de investigación Tecnológica de la Universidad
        Distrital
      </strong>, es una iniciativa educativa enfocada en el desarrollo e investigación
      de herramientas tecnológicas implementado software y hardware de
      vanguardia en cada uno de los proyectos personales y grupales
    </p>
    <hr class="spacer" />
    <h1>AREAS</h1>
    <hr class="divider" />
    <div class="links">
      <CardLink
        v-for="(link, key) in links"
        :key="key"
        :title="link.title"
        :icon="link.icon"
        :to="link.to"
        style="width: calc(calc(100% / 3) - 1rem)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CardLink from "@/components/cardLink.vue";

const domain = ref("http://inteud.github.io/");
const links = ref([
  { title: "hidrología", icon: "hydro-power", to: domain.value + "hydro" },
  { title: "topografía", icon: "eye-circle-outline" },
  { title: "suelos", icon: "hexagon-multiple"},
  { title: "concretos", icon: "wall"},
  { title: "estructuras", icon: "tower-fire"},
  { title: "software", icon: "desktop-classic"},
  { title: "hardware", icon: "video-input-component"},
  { title: "cálculos", icon: "microsoft-excel"},
  { title: "librería", icon: "book-open-page-variant"},
]);
</script>

<style lang="scss" scoped>
.links {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

a:not([href]) {
  pointer-events: none;
  opacity: .25;
  user-select:none;
}
</style>
