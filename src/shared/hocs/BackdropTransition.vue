<script lang="ts" setup>
</script>

<template>
  <transition name="backdrop">
    <slot />
  </transition>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.backdrop-enter-from,
.backdrop-enter-to {
  opacity: 0;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }
}

.backdrop-enter-to,
.backdrop-leave-from {
  opacity: 1;
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: var(--fast);

  @media (prefers-reduced-motion: reduce) {
    transition: 0s;
  }
}
</style>
