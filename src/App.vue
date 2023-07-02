<script lang="ts" setup>
import { MainContainer } from '@/containers'
</script>

<template>
  <main-container>
    <router-view />
  </main-container>
</template>

<style lang="scss">
@import '@/assets/styles/style.scss';

#app {
  min-height: 100vh;
  width: 100%;

  &.dark {
    background-image: linear-gradient(105.91deg, #282A37 49.48vh, #353840 100%);
  }

  &.light {
    background-color: #F5F5F5;
  }
}
</style>
