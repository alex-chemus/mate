<script lang="ts" setup>
import { useTheme } from '@/shared/utils'

const { theme } = useTheme()
</script>

<template>
  <header class="header-container" :class="theme">
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
  grid-template-columns: 340px 1fr 340px;
  grid-gap: 30px;
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 15px 0;

  @include xl {
    grid-template-columns: 2fr 1fr 340px;
  }

  @include lg {
    // @include flex(space-between, center);
    display: none;
  }

  &.dark { background-color: var(--bg-color-1); }
  &.light { background-color: #f5f5f5 }
}

.profile-wrapper {
  display: grid;
  grid-auto-flow: column;
  justify-content: end;
  align-items: center;
  grid-gap: 20px;
}
</style>
