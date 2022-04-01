<template>
  <nav class="navigate">
    <ul>
      <li v-for="(r, k) in routes" :key="k">
        <router-link :to="'/' + r.label">
          <i :class="['fad', `fa-${r.icon}`]"></i>
          {{ r.label.toUpperCase() }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  routes: {
    type: Object,
    default: null,
    required: true,
  },
});
</script>

<style></style>
