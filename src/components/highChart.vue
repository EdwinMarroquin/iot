<template>
  <div class="chart" id="HChart"></div>
</template>

<script setup>
import { onMounted } from "vue";
import highcharts from "highcharts";

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
});




onMounted(() => {
  highcharts.chart("HChart", props.options);
});
</script>

<style></style>
