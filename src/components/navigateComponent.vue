<template>
  <nav class="navigate">
    <ul>
      <li v-for="(r, k) in routes" :key="k">
        <router-link :to="'/' + r.label">
          <i :class="['fad', `fa-${r.icon}`]"></i>
          {{ r.label.toUpperCase() }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  routes: {
    type: Object,
    default: null,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.navigate {
  background: #222;
  width: 100%;
  border-top: 1px solid invert(#222);
  @media screen and (min-width: 768px) {
    width: 15rem;
    margin: 0.5rem;
    border-radius: 0.5rem;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    @media screen and (min-width: 768px) {
      flex-direction: column;
    }
    li {
      line-height: 100%;
      margin: 0.25rem;
      display: flex;
      flex: 1;
      text-align: center;
      @media screen and (min-width: 768px) {
        // margin: 1rem 1rem 0 1rem;
        text-align: left;
      }

      a {
        width: 100%;
        padding: 0.75rem 1rem;
        color: white;
        font-size: 1rem;
        border-radius: 0.25rem;
        flex: 1;
        text-decoration: none;
        i {
          margin-right: 0.5rem;
          display: none;
          @media screen and (min-width: 768px) {
            display: inline;
          }
        }

        &:hover {
          color: $color_red;
          i {
            color: $color_yellow;
          }
        }
      }
    }
  }
}
</style>
