<template>
  <div
    :class="['progress', statusClass, statusClass !== 'error' ? 'hide' : '']"
    v-if="!statusHide"
  >
    <div class="progress-indicator"></div>
    <div class="progress-label">{{ statusMessage }}</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const statusConnected = ref(0);
const statusMessage = ref("WAIT");
const statusHide = ref(false);
const statusClass = ref("error");

const startTime = ref();
const endTime = ref();

//JUST AN EXAMPLE, PLEASE USE YOUR OWN PICTURE!
var imageAddr = "https://avatars.githubusercontent.com/u/60857232?v=4";

const InitiateSpeedDetection = () => {
  window.setTimeout(MeasureConnectionSpeed, 1);
};

if (window.addEventListener) {
  window.addEventListener("load", InitiateSpeedDetection, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", InitiateSpeedDetection);
}

const MeasureConnectionSpeed = () => {
  var download = new Image();
  download.onload = () => {
    endTime.value = new Date().getTime();
    statusMessage.value = "ONLINE";
    statusConnected.value = 1;
    statusClass.value = "success";
    setTimeout(() => {
      statusHide.value = true;
    }, 1000);
  };

  download.onerror = (err, msg) => {
    statusMessage.value = "OFFLINE";
  };

  startTime.value = new Date().getTime();
  var cacheBuster = "?nnn=" + startTime.value;
  download.src = imageAddr + cacheBuster;
};

onMounted(() => {
  setInterval(() => {
    InitiateSpeedDetection();
  }, 10000);
});
</script>

<style lang="scss" scoped>
.progress {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.5rem;
  color: white;
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  transition: all 0.5s ease;

  &-indicator {
    box-shadow: 0 0 2px 2px red;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 0.75rem;

    &:after {
      position: absolute;
      content: "";
      width: 0.5rem;
      height: 0.5rem;
      display: block;
      background: red;
      border-radius: 1rem;
      animation: pulse 1.2s ease-in-out infinite;
    }
  }

  &.success {
    &.hide {
      transition-delay: 1s;
      height: 0;
    }

    & > .progress-indicator {
      &:after {
        animation: none;
        background: seagreen;
      }
    }
  }
}

@keyframes pulse {
  0% {
    width: 0;
    height: 0;
    opacity: 0;
  }

  50% {
    width: 1.5rem;
    height: 1.5rem;
    opacity: 0.5;
  }

  100% {
    width: 0;
    height: 0;
    opacity: 0;
  }
}
</style>
