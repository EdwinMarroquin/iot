<template>
  <h1>Acerca del proyecto</h1>
  <br />
  <p>
    La red de estaciones de la Universidad Distrital cuenta con
    {{ nStations }} sensores dedicados a realizar el registro de la temperatura
    relativa, al igual que la humedad relativa de cada una de las zonas de
    estudio
  </p>
  <br />
  <p>
    En pro de la educación alternativa, buscando fomentar el desarrollo e
    implementación de sistemas físicos
    <strong>
      <cite>HARDWARE</cite>
    </strong>
    al igual que <strong><cite>SOFTWARE</cite></strong> para la ejecución de
    proyectos funcionales y aplicables en la vida real
  </p>
  <br />
  <p>
    Por lo que se hace un llamado a estudiantes y docentes de la Universidad a
    que se hagan participes de esta corriente educativa, en donde la
    transversalidad es parte fundamental en la ejecución de actividades de
    investigación y desarrollo tecnológico
  </p>
</template>

<script setup>
import { ref } from "vue";
import { stations } from "@/data/stations";
const nStations = ref(stations.length);
</script>

<style lang="scss" scoped></style>
