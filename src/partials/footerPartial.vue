<template>
  <footer class="footer">
    <p style="color: #ffff3e">
      Creado y manenido por
      <br />
      <router-link to="/me">Edwin Marroquin ( 2021 -{{ year }} )</router-link>
    </p>
  </footer>
</template>

<script setup>
import { ref } from "vue";
const year = ref(new Date().getFullYear());
</script>

<style lang="scss" scoped>
.footer {
  background: #2d2d2d;
  color: white;
  padding: 1rem;
  text-align: center;
  display:flex;
  justify-content: space-around;
  p:first-child {
    color: white;
  }
  p:last-child {
    color: #ffff3e;
    a > i {
      margin-right: 1rem;
    }
  }
}
</style>
