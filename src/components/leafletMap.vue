<template>
  <div id="map"></div>
</template>

<script setup>

import leaflet from "leaflet";
import isolines from "@turf/isolines";
import interpolate from "@turf/interpolate";
import { point, featureCollection } from "@turf/helpers";

import { onMounted, ref } from "vue";

import layers from "@/data/mapLayers";
import { stations } from "@/data/stations.js";

import { getAllDataChannels } from "@/assets/scripts/getDataChannels";


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
const allDataChannels = await Promise.all(
  getAllDataChannels(stations).map(el => el)
  );


const arrayPointsT = featureCollection(allDataChannels.map((el) => {
  return point([parseFloat(el.channel.longitude), parseFloat(el.channel.latitude)], {elev: parseFloat(el.lastFeed.temperature)});
}));

const options_interpol = {
  gridType: 'points',
  property: 'elev',
  units: 'kilometers'
}

const interpoled_points = interpolate(arrayPointsT, 1, options_interpol);

const breaks = Array(10)
  .fill()
  .map((el, i) => i);

const lines = isolines(interpoled_points, breaks, {zProperty: 'elev'});

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

  L.geoJson(lines,{}).addTo(map);

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
