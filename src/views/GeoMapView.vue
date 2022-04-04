<template>
  <img :src="Json.parse(map)" frameborder="0" />
</template>

<script setup>
import {ref} from 'vue';
import gJson from "@/data/bogotaShape.json";
const map = ref(gJson);
console.log(gJson);
</script>

<style></style>
