<template>
  <nav class="navigate">
    <ul>
      <li><a @click="toggleMenu"><i class="fad fa-bars"></i><div class="menu-label"></div></a></li>
    </ul>
    <ul>
      <li v-for="(r, k) in routes" :key="k">
        <router-link :to="'/' + r.label" @click="active = false">
          <i :class="['fad', `fa-${r.icon}`]"></i>
          <div :class="['menu-label', active ? 'active' : '']">{{ r.label.toUpperCase() }}</div>
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
