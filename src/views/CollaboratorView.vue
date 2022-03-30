<template>
  <code>{{ user }}</code>
</template>

<script setup>
import { ref } from "vue";
import collaborators from "@/data/collaborators";

const props = defineProps({
  id: {
    type: String,
    required: true,
  }
});

const user = ref(collaborators[props.id]);

</script>

<style></style>
