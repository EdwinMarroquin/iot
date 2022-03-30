<template>
  <div class="user">
    <div class="user--header">
      <div v-if="user.photo != null" class="user--header-photo">
        <img :src="user.photo" alt />
      </div>
      <div class="user--header-info">
        <h2 v-if="user.name != null" class="user--header-info name">{{ user.name }}</h2>
        <p v-if="user.email != null" class="user--header-info email">{{ user.email }}</p>
        <div v-if="user.description != null" class="user--header-description">{{ user.description }}</div>
      </div>
    </div>
    <div v-if="user.skills" class="user--skills">
      <div v-for="(skill, key) in user.skills" :key="key" class="user--skills-item">
        <span>{{ skill }}</span>
      </div>
    </div>
    <div v-if="user.network != null" class="user--network">
      <a v-if="user.network.site != null" :href="user.network['site']" target="_blank">
        <i class="fad fa-browser"></i>
      </a>
      <a
        v-if="user.network.facebook != null"
        :href="`https://www.facebook.com/${user.network.facebook}`"
        target="_blank"
      >
        <i class="fab fa-facebook-f"></i>
      </a>
      <a
        v-if="user.network.instagram != null"
        :href="`https://www.instagram.com/${user.network.instagram}`"
        target="_blank"
      >
        <i class="fab fa-instagram"></i>
      </a>
      <a
        v-if="user.network.linkedin != null"
        :href="`https://www.linkedin.com/in/${user.network.linkedin}`"
        target="_blank"
      >
        <i class="fab fa-linkedin-in"></i>
      </a>
      <router-link style="color:#ffff3e" :to="`/collaborator/${user.id}`">
        <i class="fad fa-address-card"></i>
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 26rem;
  margin: 1rem;
  &--header {
    $angle: 45deg;
    $size: 8rem;
    width: 100%;
    background: linear-gradient(
        $angle,
        transparent calc($size - 10px),
        rgba(#2d2d2d, 0.5) $size,
        whitesmoke calc($size + 1px),
        rgb(202, 202, 202) 80%
      ),
      linear-gradient(
        -$angle,
        #800000 30%,
        #dc0000 calc(100% - $size),
        rgba(70, 0, 0, 0.5) calc(100% - $size),
        transparent calc(100% - $size + 5px)
      ),
      linear-gradient(0, #afaf00, #ffff3e);
    border-bottom: none;
    display: flex;
    flex-direction: row;
    box-shadow: 0 1.5rem 1.5rem -1.5rem rgba(0, 0, 0, 0.25);
    border-radius: 0.5rem 0.5rem 0 0;
    z-index: 1;
    &-photo {
      max-height: 8rem;
      max-width: 8rem;
      min-height: 8rem;
      min-width: 8rem;
      overflow: hidden;
      border-radius: 100rem;
      background: #f5f5f5;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 1.5rem;
      img {
        width: 105%;
        height: auto;
      }
    }
    &-info {
      display: flex;
      flex-direction: column;
      margin: 1.5rem 1.5rem 1.5rem 0;
      &.name,
      &.email,
      &.description {
        margin: 0;
      }
      &.name {
        font-size: 1.5rem;
        font-style: italic;
      }
      &.email {
        color: tomato;
        font-size: 1rem;
        margin-bottom: 0.5rem;
      }
      &.description {
        font-size: 0.75rem;
        color: #2d2d2d;
      }
    }
  }
  &--skills,
  &--network {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: silver;
    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.5rem;
      font-size: 0.75rem;
      padding: 0.5rem;
      margin: 0.5rem;
    }
  }
  &--skills {
    height: 2rem;
    text-transform: uppercase;
  }
  &--network {
    width: 100%;
    background: #2d2d2d;
    display: flex;
    flex-direction: row;
    box-shadow: 0px -4px 12px -4px rgb(0 0 0 / 50%);
    border-radius: 0 0 0.5rem 0.5rem;
    padding: 0.5rem;
    color: whitesmoke;
    display: flex;
    justify-content: space-around;
    i {
      font-size: 1.5rem;
    }
  }
}
</style>
