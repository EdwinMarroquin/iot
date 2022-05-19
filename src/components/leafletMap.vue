<template>
  <div id="map"></div>
</template>

<script setup>
import leaflet from "leaflet";
import isolines from "@turf/isolines";
import interpolate from "@turf/interpolate";
import { addZeros } from "@/assets/scripts/converUnits.js";
import { point, featureCollection } from "@turf/helpers";

import { onMounted, ref } from "vue";

import layers from "@/data/mapLayers";
import { stations } from "@/data/stations.js";

import { getAllDataChannels } from "@/assets/scripts/getDataChannels";

const dataChannels = ref([]);

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

const extend = ref([
  limitPoints[0].longitude,
  limitPoints[0].latitude,
  limitPoints[1].longitude,
  limitPoints[1].latitude,
]);

// const allDataChannels = await Promise.all(
//   getAllDataChannels(stations).map(el => el)
// );

stations.forEach(async (s) => {

  const data = fetch(
    `https://api.thingspeak.com/channels/${s.id}/feeds.json?results=1`
  );
  await data
    .then((e) => e.json())
    .then(async (dat) => {
      var d = dat;
      const date = new Date(d.feeds[0].created_at);

      let response = {
        channel: {
          id: d.channel.id,
          name: d.channel.name,
          field1: d.channel.field1,
          field2: d.channel.field2,
          latitude: parseFloat(d.channel.latitude),
          longitude: parseFloat(d.channel.longitude),
        },
        lastFeed: {
          created_at: d.feeds[0].created_at,
          date: `${addZeros(date.getDate())}/${addZeros(
            date.getMonth()
          )}/${addZeros(date.getFullYear())}`,
          time: `${addZeros(date.getHours())}:${addZeros(
            date.getMinutes()
          )}:${addZeros(date.getSeconds())}`,
          temperature: parseFloat(d.feeds[0].field1),
          humidity: parseFloat(d.feeds[0].field2),
        },
      };
      console.log(response)
      await dataChannels.value.push(response);
    });
});

// // console.log(allDataChannels)

const arrayPointsT = featureCollection(
  dataChannels.value.map((el) => {
    return point(
      [parseFloat(el.channel.longitude), parseFloat(el.channel.latitude)],
      {
        zVal: parseFloat(el.lastFeed.temperature),
      }
    );
  })
);

const options_interpol = {
  gridType: "points",
  property: "zVal",
  units: "kilometers",
};

const interpoled_points = interpolate(arrayPointsT, 0.5, options_interpol);

const breaks = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];

const options_lines = {
  zProperty: "zVal",
};

const Tlines = isolines(interpoled_points, breaks, options_lines);

onMounted(async () => {
  let optionsMap = {
    ...layers[await localStorage.getItem("layername")].options,
    ...props.optionsMap,
  };

  const canvaMap = await L.map("map", {
    center: [
      average(limitPoints[0].latitude, limitPoints[1].latitude),
      average(limitPoints[0].longitude, limitPoints[1].longitude),
    ],
    zoom: 11,
  });

  await L.tileLayer(
    layers[localStorage.getItem("layername")].url,
    optionsMap
  ).addTo(canvaMap);

  if (props.geoPoints !== {} && props.geoPoints.lenght !== 0) {
    await L.geoJSON(props.geoPoints, {
      weight: 3,
      color: "#de000099",
    }).addTo(canvaMap);
  }

  // await L.geoJson(Tlines, {
  //   weight: 3,
  //   color: "#de000099",
  // }).addTo(canvaMap);
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
