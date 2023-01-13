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
  --text-color: var(--dark-2, $dark-2);

  &.dark {
    --text-color: var(--light, $light);
    background-image: linear-gradient(105.91deg, #282A37 49.48%, #353840 100%);
  }

  &.light {
    --text-color: var(--dark-2, $dark-2);
    background-color: #F5F5F5;
  }
}
</style>
