<script lang="ts" setup>
import { Logo } from '@/ui'
</script>

<template>
  <header class="header-container">
    <button class="logo-wrapper">
      <logo />
    </button>

    <slot name="search" />
    <slot name="tabs" />
    <slot name="profile-popup" />
  </header>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.header-container {
  display: grid;
  //align-items: start;
  grid-template-columns: 325px 1fr 325px;
  grid-gap: 24px;
  position: relative;
}

.logo-wrapper {
  position: absolute;
  left: -42px;
  transform: translateX(-100%);
}
</style>
