<template>
  <svg
    width="611.94"
    height="320"
    version="1.1"
    viewBox="0 0 161.91 84.667"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="inteud">
      <rect
        id="bg"
        x="2.1362e-6"
        y="-1.2207e-6"
        width="161.91"
        height="84.667"
        :fill="bg"
      />
      <g id="inte" transform="translate(-108.51,-186.28)" :fill="inte">
        <path
          id="i"
          :fill="i"
          d="m142.65 233.54v26.824h16.878v-5.2917h-11.586v-5.271h11.586v-5.2917h-11.586v-5.6782h11.586v-5.2917z"
        />
        <path
          id="n"
          :fill="n"
          d="m119.09 233.54v5.2917h6.4864v21.533h5.2916v-21.533h6.4864v-5.2917z"
        />
        <path
          id="t"
          :fill="t"
          d="m119.09 196.86v5.2916h6.7634v15.832h-6.7634v5.2917h18.265v-5.2917h-6.2094v-15.832h6.7634v-5.2916z"
        />
        <path
          id="e"
          :fill="e"
          d="m142.65 196.86v26.415h5.2917v-14.569c1.533 4.9493 7.6812 9.2616 7.6812 14.569h5.2916v-26.415h-5.2916v14.567c-1.5306-4.9483-7.6812-9.2616-7.6812-14.567z"
        />
      </g>
      <g id="ud" :fill="ud" transform="matrix(4,0,0,4,-441.67,-356.9)">
        <path
          id="u"
          :fill="u"
          d="m125.56 91.872v10.583c3e-3 0.94614 0.2589 1.8554 0.7192 2.6458 0.45648 0.78381 1.114 1.4506 1.9266 1.9197 0.80278 0.47042 1.7154 0.72087 2.6458 0.72608h5.2916v-15.875h-2.6458v13.229h-2.6458c-1.4613 0-2.6458-1.1846-2.6458-2.6458v-10.583z"
        />
        <path
          id="d"
          :fill="d"
          transform="scale(.26458)"
          d="m522.42 347.23v60h10v-0.084c15.705-1.1101 27.88-14.172 27.885-29.916v-30zm10 10h17.885v20c-4e-3 10.224-7.7179 18.8-17.885 19.881v-39.762z"
        />
      </g>
    </g>
  </svg>
</template>

<script setup>
defineProps({
  bg: {
    type: String,
  },
  inteud: {
    type: String,
  },
  inte: {
    type: String,
  },
  i: {
    type: String,
  },
  n: {
    type: String,
  },
  t: {
    type: String,
  },
  e: {
    type: String,
  },
  ud: {
    type: String,
  },
  u: {
    type: String,
  },
  d: {
    type: String,
  },
});
</script>
