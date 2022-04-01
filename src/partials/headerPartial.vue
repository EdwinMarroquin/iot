<template>
  <div class="header">
    <!-- <a href="https://inteud.github.io/"> -->
    <a href="/">
      <!-- <img src="../assets/logo_clean.svg" alt="inteud" /> -->
      <logoInteud
        class="logo"
        :bg="color_red"
        :ud="color_yellow"
        :inte="color_white"
      />
    </a>
    <h1>
      Red de estaciones meteorológicas <br />Universidad Distrital <br />
      Francisco José de Caldas
    </h1>
  </div>
</template>

<script setup>
import logoInteud from "@/components/logoInteud.vue";

const color_yellow = "#FBC02D";
const color_red = "#B71C1C";
const color_white = "#FAFAFA";
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: $color_red;
  color: $color_yellow;
  padding: 1rem;
  .logo {
    width: auto;
    height: 3rem;
    @media screen and (min-width: 768px) {
      height: 4rem;
    }
  }
  h1 {
    font-size: 1rem;
    flex: 1;
    text-align: -webkit-right;
    font-weight: 300;
    @media screen and (min-width: 520px) {
      font-size: 1.25rem;
    }
    @media screen and (min-width: 770px) {
      font-size: 1.35rem;
    }
  }
}
</style>
