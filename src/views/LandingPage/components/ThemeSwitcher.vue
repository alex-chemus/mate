<script lang="ts" setup>
import { useTheme } from '@/shared/utils';

const { theme, toggleTheme } = useTheme()
</script>


<template>
  <button v-if="theme === 'light'" @click="toggleTheme()">
    <svg width="40" height="40" viewBox="0 0 40 40" :class="theme">
      <use href="@/assets/imgs/tabler-sprite.svg#tabler-sun" />
    </svg>
  </button>

  <button v-else @click="toggleTheme()">
    <svg width="40" height="40" viewBox="0 0 40 40" :class="theme">
      <use href="@/assets/imgs/tabler-sprite.svg#tabler-moon" />
    </svg>
  </button>
</template>


<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

svg {
  color: var(--heading-color-2, $heading-color-2);
}
</style>
