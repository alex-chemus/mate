<script lang="ts" setup>
import { SuperContainer } from '@/containers'
</script>

<template>
  <super-container>
    <router-view />
  </super-container>
</template>

<style lang="scss">
@import '@/assets/styles/style.scss';

#app {
  min-height: 100vh;

  &.dark {
    background-image: linear-gradient(105.91deg, #282A37 49.48%, #353840 100%);
  }

  &.light {
    background-color: #F5F5F5;
  }
}
</style>
