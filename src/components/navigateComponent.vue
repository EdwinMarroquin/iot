<template>
  <nav class="navigate">
    <ul>
      <li><a @click="toggleMenu" style="color:#B71C1C">
        <i class="fas fa-bars" v-if="!active"></i>
        <i class="fas fa-close" v-else></i>
        <div class="menu-label"></div></a></li>
    </ul>
    <ul>
      <li v-for="(r, k) in routes" :key="k">
        <router-link :to="r.path" @click="active = false">
          <i :class="['fad', `fa-${r.icon}`]"></i>
          <div :class="['menu-label', active ? 'active' : '']">{{ r.label.toUpperCase() }}</div>
        </router-link>
      </li>
    </ul>
    <ul style="margin-top:auto">
      <li>
        <router-link to="/config">
          <i class="fat fa-cog"></i>
          <div :class="['menu-label', active ? 'active' : '']">CONFIGURACION</div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  routes: {
    type: Object,
    default: null,
    required: true,
  },
});

const active = ref(false)

const toggleMenu = () => active.value = !active.value

</script>

<style>
</style>
