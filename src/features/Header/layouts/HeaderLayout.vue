<script lang="ts" setup>
import { Logo } from '@/shared/ui'
import { useTheme } from '@/shared/utils'

const { theme } = useTheme()
</script>

<template>
  <header class="header-container" :class="theme">
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
  grid-template-columns: 340px 1fr 340px;
  grid-gap: 30px;
  // position: relative;
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 15px 0;

  &.dark { background-color: var(--bg-color-1); }
  &.light { background-color: #f5f5f5 }
  // box-shadow: 0 0 10px 7px var(--dark-bg-color-1);
}

.logo-wrapper {
  position: absolute;
  left: -30px;
  top: 50%;
  transform: translate(-100%, -50%);
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
