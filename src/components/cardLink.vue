<template>
  <a :href="to" :target="target" :class="['card', styles]">
    <i :class="['card-icon mdi', 'mdi-' + icon]"></i>
    <div class="card-title">{{ title }}</div>
  </a>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    default: "_new",
  },
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  styles: {
    type: String,
    default: "",
  },
})
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  border-radius: 0.25rem;
  font-size: 1.2rem;
  margin: 0.5rem;
  height: 6rem;
  background: #cd0000;
  color: #ffff3e;
  font-weight: 900;
  position: relative;
  overflow: hidden;
  &:hover {
    background: #8e0000;
    color: #ffff8b;
    .card-icon {
      color: rgba(255, 255, 255, 0.5);
      transform: rotate(15deg);
      font-size: 14rem;
    }
  }
  &-icon {
    font-size: 9rem;
    margin-right: 0.5rem;
    position: absolute;
    left: -1rem;
    transform: rotate(-15deg);
    color:rgba(white, 0.25);
    transition: all linear .2s;
  }
  &-title {
    text-transform: capitalize;
    font-size: 1.5rem;
    font-weight: 300;
    z-index: 1;
  }
}
</style>
