<script lang="ts" setup>
import { Logo } from '@/shared/ui'
</script>

<template>
  <header class="header-container">
    <button class="logo-wrapper">
      <logo />
    </button>

    <slot name="search" />
    <slot name="tabs" />
    <!-- <slot name="profile-popup" /> -->
    <div class="profile-wrapper">
      <slot name="notifications" />
      <slot name="profile" />
    </div>
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
  left: -30px;
  transform: translateX(-100%);
}

.profile-wrapper {
  /*@include flex(flex-end, center);

  & > *:not(:last-child) {
    margin-right: 20px;
  }*/

  display: grid;
  grid-auto-flow: column;
  justify-content: end;
  align-items: center;
  grid-gap: 20px;
}
</style>
