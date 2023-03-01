<template>
  <transition name="dropdown">
    <slot />
  </transition>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.dropdown-enter-from,
.dropdown-leave-to {
  transform: scale(.9);
  opacity: 0;

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    opacity: 1;
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: var(--fast);

  @media (prefers-reduced-motion: reduce) {
    transition: 0s;
  }
}
</style>
