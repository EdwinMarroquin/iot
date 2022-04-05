<template>
  <div class="sensor">
    <div class="sensor-left">
      <GoogleMap
        api-key="AIzaSyAor4_IQ6zbgIQ44djnjKo1EdsFD8CyqfQ"
        class="sensor-left-map"
        :center="center"
        :zoom="18"
        disableDefaultUi="true"
      >
        <InfoWindow :options="{ position: center }">
          <CardSensor :sensorId="props.sensorId" />
        </InfoWindow>
      </GoogleMap>
      <div class="sensor-left-actions">
        <div class="action--title">Descargar :</div>
        <a
          class="action--link"
          :href="'https://api.thingspeak.com/channels/' + sensorId + '/field/1.csv'"
          :download="'temperatura' + sensorId"
          target="_blank"
        >
          <i class="action--link-icon fad fa-temperature-sun"></i>
          <div class="action--link-label">Temperatura</div>
        </a>
        <a
          class="action--link"
          :href="'https://api.thingspeak.com/channels/' + sensorId + '/field/2.csv'"
          :download="'humedad' + sensorId"
          target="_blank"
        >
          <i class="action--link-icon fad fa-hand-holding-droplet"></i>
          <div class="action--link-label">Humedad</div>
        </a>
        <a
          class="action--link"
          :href="'https://api.thingspeak.com/channels/' + sensorId + '/feeds.csv'"
          :download="'databaseCsv' + sensorId"
          target="_blank"
        >
          <i class="action--link-icon fad fa-file-csv"></i>
          <div class="action--link-label">CSV</div>
        </a>
        <a
          class="action--link"
          :href="
            'https://api.thingspeak.com/channels/' +
            id +
            '/feeds.json?results=25000'
          "
          :download="'databaseJson' + sensorId"
          target="_blank"
        >
          <i class="action--link-icon fad fa-code"></i>
          <div class="action--link-label">JSON</div>
        </a>
      </div>
    </div>
    <div class="sensor-right">
      <div class="temperature">
        <!-- <div class="chart">
          <iframe
            :src="
              'https://thingspeak.com/channels/' +
              id +
              '/charts/1?dynamic=true&results=50&title=&type=spline&yaxis=Temperatura&xaxis=Fecha'
            "
            frameborder="0"
          ></iframe>
        </div>-->
        <HChart :options="chartOptions" />
      </div>
      <div class="humidity">
        <div class="chart">
          <iframe
            :src="
              'https://thingspeak.com/channels/' +
              id +
              '/charts/2?dynamic=true&results=50&title=&type=spline&yaxis=Humedad&xaxis=Fecha'
            "
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed, watch } from "vue";
import { GoogleMap, InfoWindow } from "vue3-google-map";
import CardSensor from "../components/cardSensor.vue";
import HChart from "../components/highChart.vue";

const props = defineProps({
  sensorId: {
    type: String,
    required: true,
  },
});

const feeds = ref({});
const info = ref({});
const curr = ref({});
const center = ref({});

const getData = async () => {
  const data = await fetch(
    `https://api.thingspeak.com/channels/${props.sensorId}/feeds.json`
  );
  const d = await data.json();
  feeds.value = d.feeds;
  info.value = d.channel;
  curr.value = feeds.value[feeds.value.length - 1];
  center.value = {
    lat: parseFloat(info.value.latitude),
    lng: parseFloat(info.value.longitude),
  };
};


const chartOptions = ref({
  chart: {
    type: 'column'
  },
  title: {
    text: 'Fruit Consumption'
  },
  xAxis: {
    title: {
      text: 'Fruit Number'
    },
    tickInterval: 10
  },
  yAxis: {
    title: {
      text: 'Fruit eaten'
    },
    tickInterval: 1
  },
  series: [{
    name: 'Jane',
    data: [1, 0, 4]
  }, {
    name: 'John',
    data: [5, 7, 3]
  }],
  responsive: true
});


onBeforeMount(() => {
  setInterval(() => {
    getData();
  }, 1000);
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.sensor {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  @media screen and (min-width: 770px) {
    flex-direction: row;
  }
  &-left,
  &-right {
    height: 100%;
    margin-right: 1rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    @media screen and (min-width: 770px) {
      width: 50%;
    }
  }
  &-left {
    height: 100%;
    margin-bottom: 2rem;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    @media screen and (min-width: 770px) {
      margin-bottom: 0;
    }
    &-map {
      width: calc(100% - 0rem);
      height: 100%;
      min-height: 20rem;
      @media screen and (min-width: 770px) {
        width: 100%;
      }
    }
    &-actions{
      margin-top: 1rem;
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: flex-start;
      width:100%;
      .action {
        &--title {
          margin-right: 0.5rem;
        }
        &--link {
          display: flex;
          flex-direction: row;
          text-decoration: none;
          text-transform: uppercase;
          padding: 0.325rem 0.75rem;
          background: #333;
          border-radius: 0.25rem;
          margin: 0.125rem;
          &-icon {
            color: $color_yellow;
          }
          &-label {
            color: $color_red;
            margin-left: 0.5rem;
            font-size: 0.75rem;
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
}

.sensor-right {
  .humidity,
  .temperature {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    .chart {
      flex: 1;
      height: 100%;
      iframe {
        margin: auto;
        width: 100%;
        height: 15rem;
      }
    }
  }
}
</style>
