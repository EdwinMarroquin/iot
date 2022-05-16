<template>
  <div id="map"></div>
</template>

<script setup>

import leaflet from "leaflet";
import isolines from "@turf/isolines";
import { point, featureCollection } from "@turf/helpers";

import { onMounted, ref } from "vue";

import layers from "@/data/mapLayers";
import { stations } from "@/data/stations.js";

const props = defineProps({
  optionsMap: {
    type: Object,
  },
  geoPoints: {
    type: Object,
  },
  dataLines: {
    type: Object,
  },
});

// function randomRange(min, max) {
//   return Math.random() * (max - min) + min;
// }

function average(val1, val2) {
  return (val1 + val2) / 2;
}

const L = leaflet;

const limitPoints = [
  {
    longitude: -74.217,
    latitude: 4.465,
  },
  {
    longitude: -74.003,
    latitude: 4.791,
  },
];

// const extend = ref([
//   limitPoints[0].longitude,
//   limitPoints[0].latitude,
//   limitPoints[1].longitude,
//   limitPoints[1].latitude,
// ]);

// console.log(randomPoint(10, { bbox: extend }));

const arrayPoints = stations.map((el) => {
  return point([el.longitude, el.latitude]);
});


// console.log(featureCollection(arrayPoints));

// const spacing = ref(1);

// const grid = pointGrid(extend.value, spacing.value, { unit: "kilometers" });

// console.log(grid.features);

// for (var i = 0; i < 12 ; i++) {
//   grid.features[i].properties.latitude = stations[i].latitude;
//   grid.features[i].properties.longitude = stations[i].longitude;
//   grid.features[i].properties.temperature = randomRange(15, 32);
// }


const breaks = Array(20)
  .fill()
  .map((el, i) => (i + 1) * 2);

const isolines_options = {
  resolution: 2,
  zProperty: "temperature",
  commonProperties: {
    "fill-opacity": 0.5,
  },
};

const lines = isolines(featureCollection(arrayPoints), breaks, isolines_options);
// const lines = isolines(grid, breaks, isolines_options);

onMounted(async () => {
  let optionsMap = {
    ...layers[await localStorage.getItem("layername")].options,
    ...props.optionsMap,
  };

  const map = L.map("map", {
    center: [
      average(limitPoints[0].latitude, limitPoints[1].latitude),
      average(limitPoints[0].longitude, limitPoints[1].longitude),
    ],
    zoom: 11,
  });

  L.tileLayer(
    layers[await localStorage.getItem("layername")].url,
    optionsMap
  ).addTo(map);

  L.geoJson(lines, {
    weight: 1,
    color: "#00f2",
  }).addTo(map);

  if (props.geoPoints !== {} && props.geoPoints.lenght !== 0) {
    L.geoJSON(props.geoPoints, {
      weight: 3,
      color: "#de000099",
    }).addTo(map);
  }
});
</script>

<style lang="scss">
#map {
  width: 100%;
  height: 100%;
}

#map
  > div.leaflet-pane.leaflet-map-pane
  > div.leaflet-pane.leaflet-overlay-pane
  > svg
  > g
  > path.leaflet-interactive {
  stroke-width: 1px;
  fill-opacity: 0.1;
}
</style>
