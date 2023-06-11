<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps<{
  group?: boolean
}>()
</script>

<template>
  <transition-group v-if="group" name="popup">
    <slot />
  </transition-group>

  <transition v-else name="popup">
    <slot />
  </transition>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.popup-enter-from,
.popup-leave-to {
  transform: scale(.9);
  opacity: 0;

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    opacity: 1;
  }
}

.popup-enter-active,
.popup-leave-active {
  transition: var(--fast);

  @media (prefers-reduced-motion: reduce) {
    transition: 0s;
  }
}
</style>
