<script lang="ts" setup>
</script>

<template>
  <transition name="dropdown">
    <slot />
  </transition>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.dropdown-enter-from {
  transform: scale(.7);
  //opacity: 0;
}

.dropdown-enter-active {
  transition: var(--fast);
}
</style>
