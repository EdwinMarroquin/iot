<template>
  <div class="sensor">
    <div class="left">
      <h1>{{ info.name }}</h1>
      <div id="map" class="map"></div>
      <div class="actions">
        <i style="color: seagreen" class="fa-lg fal fa-file-csv"></i>
        <i style="color: seagreen" class="fa-lg fal fa-file-arrow-down"></i>
      </div>
      <div class="actions">
        <i style="color: seagreen" class="fa-lg fal fa-file-csv"></i>
        <i style="color: seagreen" class="fa-lg fal fa-file-arrow-down"></i>
      </div>
    </div>
    <div class="right">
      <div class="temperatura">
        <div class="chart">
          <iframe
            :src="'https://thingspeak.com/channels/' + id + '/charts/1?bgcolor=%23e8eded&color=%2318494d&dynamic=true&results=20&title=&type=spline&height=200'"
            frameborder="0"
          ></iframe>
        </div>
      </div>
      <div class="humedad">
        <div class="chart">
          <iframe
            :src="'https://thingspeak.com/channels/' + id + '/charts/2?bgcolor=%23e8eded&color=%2318494d&dynamic=true&results=20&title=&type=spline'"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  }
});

const feeds = ref({});
const info = ref({});
const curr = ref({});

const getData = async () => {

  const data = await fetch(
    `https://api.thingspeak.com/channels/${props.id}/feeds.json`
  )
  const d = await data.json();
  feeds.value = d.feeds;
  info.value = d.channel;
  curr.value = feeds.value[feeds.value.length - 1]

};


onBeforeMount(() => {
  setInterval(() => {
    getData();
  }, 1000);
})

onMounted(() => {
  let externalScript = document.createElement('script')

  externalScript.setAttribute('src', 'https://polyfill.io/v3/polyfill.min.js?features=default')
  document.head.appendChild(externalScript)

  externalScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAor4_IQ6zbgIQ44djnjKo1EdsFD8CyqfQ&callback=initMap&v=beta')
  document.head.appendChild(externalScript)

const svgMarker = {
  path: "m4 0c-2.216-1.7764e-15 -4 1.784-4 4v16c-5.9212e-16 2.216 1.784 4 4 4h6.5215c1.9684 2.4385 3.9977 5.0383 5.4785 8 1.4809-2.9617 3.5101-5.5615 5.4785-8h6.5215c2.216 0 4-1.784 4-4v-16c0-2.216-1.784-4-4-4h-24zm0.65234 5.6172h3.1973v7.8281c0 0.67544 0.053536 1.1729 0.16406 1.4922 0.11667 0.3193 0.34392 0.57527 0.68164 0.76562 0.34386 0.18421 0.76435 0.27539 1.2617 0.27539 0.55263 0 1.0018-0.091179 1.3457-0.27539 0.35-0.18421 0.58088-0.42764 0.69141-0.72852 0.11667-0.30702 0.17383-0.81702 0.17383-1.5293v-7.8281h2.5234v7.8281c0 1.2649-0.14304 2.208-0.43164 2.8281-0.2886 0.61403-0.82369 1.1204-1.6035 1.5195-0.77368 0.39298-1.765 0.58984-2.9746 0.58984-1.2096 0-2.1742-0.17706-2.8926-0.5332-0.71228-0.35614-1.2454-0.86447-1.6016-1.5215s-0.53516-1.6179-0.53516-2.8828v-7.8281zm12.379 0h3.8418c1.5658 0 2.7325 0.21833 3.5 0.6543 0.76754 0.42982 1.4546 1.1133 2.0625 2.0527 0.6079 0.93333 0.91211 2.1162 0.91211 3.5469 0 1.7991-0.53147 3.304-1.5938 4.5137-1.0623 1.2035-2.5259 1.8047-4.3926 1.8047h-4.3301v-12.572zm2.8926 2.3125v7.8926h1.2148c1.0746 0 1.8746-0.39902 2.3965-1.1973 0.52193-0.80439 0.78125-1.7474 0.78125-2.8281 0-0.7614-0.15029-1.4646-0.45117-2.1094-0.29474-0.65088-0.66336-1.1054-1.1055-1.3633-0.44211-0.26404-0.97162-0.39453-1.5918-0.39453h-1.2441z",
  fillColor: "#4CAF50",
  fillOpacity: 1,
  strokeWeight: 1,
  strokeColor: "#1B5E20",
  rotation: 0,
  scale: 1,
  anchor: new google.maps.Point(5, 10),
}

const infoWindow = new google.maps.InfoWindow()


marker.addListener("click", () => {
  infoWindow.close()
  infoWindow.setContent(
    `<div class="ui-mark">
          <div class="ui-mark-title">
            ${info.value.name}
          </div>

          <div class="ui-mark-content">
            <div class="ui-mark-content-title"><div class="ui-mark-content-info-icon fal fa-calendar"></div>
              ${curr.date}
            </div>
            <div class="ui-mark-content-title"><div class="ui-mark-content-info-icon fal fa-clock"></div>
              ${curr.time}
            </div>
          </div>

          <div class="ui-mark-content">
            <div class="ui-mark-content-title">Temperatura:</div>
            <div class="ui-mark-content-info">
              <div class="ui-mark-content-info-icon fal fa-temperature-sun"></div>
              ${parseFloat(curr.field1).toFixed(2)} &#176;C
            </div>
          </div>

          <div class="ui-mark-content">
            <div class="ui-mark-content-title">Temperatura:</div>
            <div class="ui-mark-content-info">
              <div class="ui-mark-content-info-icon fal fa-hand-holding-water"></div>
              ${parseFloat(curr.field2).toFixed(2)} %
            </div>
          </div>
        </div>`
  )
  infoWindow.open(marker.getMap(), marker)
})


const map = new google.maps.Map(document.getElementById("map"), {
  center: new google.maps.LatLng(info.latitude, info.longitude),
  zoom: 11.5,
  heading: 320,
  tilt: 47.5,
  mapId: "90f87356969d889c",
})

  const marker = new google.maps.Marker({
  title: station.name,
  name: `${station.name} \n ${station.temp}°C \n ${station.humi}%`,
  position: new google.maps.LatLng(station.lat, station.lng),
  icon: svgMarker,
  map: map,
})
})

</script>

<style lang="scss" scoped>
.sensor {
  display: flex;
  flex: 1;
  height: 100%;
}
.left,
.right {
  height: 100%;
  background: teal;
}
.left {
  flex: 1;
}
.right {
  display: flex;
  flex-direction: column;
  .humedad,
  .temperatura {
    flex: 1;
    .chart {
      flex: 1;
      height: 100%;
      iframe {
        width: 30rem;
        height: 100%;
      }
    }
  }
}
</style>
