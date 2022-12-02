<script lang="ts" setup>
import { Logo } from '@/UI'
import HeaderSearch from './HeaderSearch.vue'
import HeaderTabs from './HeaderTabs.vue'
import HeaderProfilePopup from './HeaderProfilePopup.vue'
</script>

<template>
  <header class="header-container">
    <button class="logo-wrapper">
      <logo />
    </button>

    <header-search />
    <header-tabs />
    <header-profile-popup />
  </header>
</template>

<style lang="scss" scoped>
@import '@/styles/style.scss';

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
