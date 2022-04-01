<template>
  <footer class="footer">
    <p></p>
    <p>
      Creado y mantenido por
      <br />
      <router-link to="/">Edwin Marroquín ( 2021 -{{ year }} )</router-link>
    </p>
    <p>
      <a href="https://github.com/EdwinMarroquin/iot/issues/new/choose" target="_blank">
        <i class="fal fa-bug"></i>
        INFORMES O FALLOS
      </a>
    </p>
  </footer>
</template>

<script setup>
import { ref } from "vue";
const year = ref(new Date().getFullYear());
</script>

<style lang="scss" scoped></style>
