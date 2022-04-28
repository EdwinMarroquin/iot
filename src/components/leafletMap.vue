<template>
  <div id="map"></div>
</template>

<script setup>
import pointGrid from '@turf/point-grid'
import isolines from '@turf/isobands'
import leaflet from "leaflet";
import { onMounted, ref } from "vue";

import layers from "@/data/mapLayers";

const props = defineProps({
  optionsMap: {
    type: Object,
  },
  geoPoints: {
    type: Object,
  },
  isoLines: {
    type: Object,
  },
});

const L = leaflet;

const extend = ref([4.579041989615335, -74.11707760312946, 4.734418862357619, -74.04098401190599])

const cellWidth = ref(1)

const grid = pointGrid(extend.value, cellWidth.value);

console.log(grid)

for (var i = 0; i < grid.features.length; i++) {
  grid.features[i].properties.latitude = Math.random() * 10;
  grid.features[i].properties.longitude = Math.random() * 10;
  grid.features[i].properties.temperature = Math.random() * 10;
}
const breaks = [1,2,3,4,5,6,7,8,9,10,11,12];

const lines = isolines(grid, breaks, { zProperty: 'temperature' });

console.log(lines)

onMounted(async () => {
  let optionsMap = {
    ...layers[await localStorage.getItem("layername")].options,
    ...props.optionsMap,
  };

  const map = L.map("map", {
    center: [4.6513702, -74.1136195],
    zoom: 11,
  });

  L.tileLayer(layers[await localStorage.getItem("layername")].url, optionsMap).addTo(map);

  if (props.geoPoints !== {} && props.geoPoints.lenght !== 0) {
    L.geoJSON(props.geoPoints).addTo(map);
  }

    L.geoJson(lines, {
      weight: 1,
    }).addTo(map);
  // if (props.isoLines !== {} && props.isoLines.lenght !== 0) {
  // }
});
</script>

<style lang="scss">
#map {
  width: 100%;
  height: 100%;
}

#map>div.leaflet-pane.leaflet-map-pane>div.leaflet-pane.leaflet-overlay-pane>svg>g>path.leaflet-interactive {
  stroke-width: 1px;
  fill-opacity: 0.1;
}
</style>
