<template>
  <nav class="navigate">
    <ul>
      <li><a @click="toggleMenu" style="color:#bb3c3d">
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
        <router-link to="/info">
          <i class="fad fa-info-circle"></i>
          <div :class="['menu-label', active ? 'active' : '']">INFO</div>
        </router-link>
      </li>
      <li>
        <router-link to="/config">
          <i class="fad fa-cog"></i>
          <div :class="['menu-label', active ? 'active' : '']">CONFIGURACION</div>
        </router-link>
      </li>
      <li>
        <OnlineStatus/>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import OnlineStatus from './onlineStatus.vue';
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
