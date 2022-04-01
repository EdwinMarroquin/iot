<template>
  <div class="sensor">
    <div class="left">
      <GoogleMap
        api-key="AIzaSyAor4_IQ6zbgIQ44djnjKo1EdsFD8CyqfQ"
        class="map"
        :center="center"
        :zoom="18"
        disableDefaultUi="true"
      >
        <InfoWindow :options="{ position: center }">
          <div class="ui-mark-title">{{ info.name }}</div>

          <div class="ui-mark-content">
            <div class="ui-mark-content-title">Temperatura:</div>
            <div class="ui-mark-content-info">
              <div class="ui-mark-content-info-icon fal fa-temperature-sun"></div>
              {{ parseFloat(curr.field1).toFixed(2) }} &#176;C
            </div>
          </div>

          <div class="ui-mark-content">
            <div class="ui-mark-content-title">Humedad:</div>
            <div class="ui-mark-content-info">
              <div class="ui-mark-content-info-icon fal fa-hand-holding-water"></div>
              {{ parseFloat(curr.field2).toFixed(2) }} %
            </div>
          </div>
        </InfoWindow>
      </GoogleMap>
      <div class="action">
        <div class="action--title">Descargar :</div>
        <a
          class="action--link"
          :href="'https://api.thingspeak.com/channels/' + id + '/field/1.csv'"
          :download="'temperatura' + id"
          target="_blank"
        >
          <i class="action--link-icon fat fa-temperature-sun"></i>
          <div class="action--link-label">Temperatura</div>
        </a>
        <a
          class="action--link"
          :href="'https://api.thingspeak.com/channels/' + id + '/field/2.csv'"
          :download="'humedad' + id"
          target="_blank"
        >
          <i class="action--link-icon fat fa-hand-holding-droplet"></i>
          <div class="action--link-label">Humedad</div>
        </a>
        <a
          class="action--link"
          :href="'https://api.thingspeak.com/channels/' + id + '/feeds.csv'"
          :download="'databaseCsv' + id"
          target="_blank"
        >
          <i class="action--link-icon fat fa-file-csv"></i>
          <div class="action--link-label">CSV</div>
        </a>
        <a
          class="action--link"
          :href="'https://api.thingspeak.com/channels/' + id + '/feeds.json?results=25000'"
          :download="'databaseJson' + id"
          target="_blank"
        >
          <i class="action--link-icon fat fa-code"></i>
          <div class="action--link-label">JSON</div>
        </a>
      </div>
    </div>
    <div class="right">
      <div class="temperatura">
        <div class="chart">
          <iframe
            :src="
              'https://thingspeak.com/channels/' +
              id +
              '/charts/1?dynamic=true&results=50&title=&type=spline&yaxis=Temperatura&xaxis=Fecha'
            "
            frameborder="0"
          ></iframe>
        </div>
      </div>
      <div class="humedad">
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
import { ref, onBeforeMount } from "vue";
import { GoogleMap, InfoWindow } from "vue3-google-map";

const props = defineProps({
  id: {
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
    `https://api.thingspeak.com/channels/${props.id}/feeds.json`
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
  flex: 1;
  height: 100%;
  flex-direction: column;
  @media screen and (min-width: 770px) {
    flex-direction: row;
  }
}
.left,
.right {
  height: 100%;
  margin-right: 1rem;
}
.left {
  flex: 1;
  height: 100%;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 770px) {
    margin-bottom: 0;
  }
  .map {
    width: calc(100% - 1rem);
    height: 100%;
    min-height: 24rem;
    pointer-events: none;
    border: 1px solid $color_black;
    border-radius: .5rem;
    margin-left: .25rem;
    overflow: hidden;
    @media screen and (min-width: 770px) {
      width: 100%;
    }
  }
  .action {
    margin-top: 1rem;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-start;
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
.right {
  display: flex;
  flex-direction: column;
  .humedad,
  .temperatura {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    .chart {
      flex: 1;
      height: 100%;
      display: flex;
      iframe {
        margin: auto;
        width: 30rem;
        height: 15rem;
      }
    }
  }
}
</style>
