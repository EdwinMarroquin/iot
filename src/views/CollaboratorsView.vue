<template>
  <div class="about">
    <CardUser v-for="(user, key) in users" :key="key" :user="user"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import collaborators from "@/data/collaborators.js";
import CardUser from "../components/cardUser.vue";

const users = ref(collaborators);
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
