<template>
  <div class="header">
    <!-- <a href="https://inteud.github.io/"> -->
    <a href="/">
      <!-- <img src="../assets/logo_clean.svg" alt="inteud" /> -->
      <logoInteud class="logo"/>
    </a>
    <h1>Area de investigación Tecnológica de la Universidad Distrital</h1>
  </div>
</template>

<script setup>
import logoInteud from '@/components/logoInteud.vue';
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #2d2d2d;
  color: white;
  padding: 1rem;
  .logo {
    width: auto;
    height: 3rem;
    @media screen and (min-width: 768px) {
      height: 4rem;
    }
  }
  h1 {
    font-size: 1.25rem;
    flex: 1;
    text-align: -webkit-right;
    font-weight: 300;
    @media screen and (min-width: 520px) {
      font-size: 1.5rem;
    }
    @media screen and (min-width: 768) {
      font-size: 2rem;
    }
  }
}
</style>
