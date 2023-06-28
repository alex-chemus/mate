<script lang="ts" setup>
import { useTheme } from '@/shared/utils'
const { theme } = useTheme()
</script>

<template>
  <button class="wrapper" :class="theme">
    <div class="toggler" :class="theme">
      <svg v-if="theme === 'light'" width="18" height="18" viewBox="0 0 18 18">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-sun-high" />
      </svg>
      <svg v-else width="18" height="18" viewBox="0 0 18 18">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-moon" />
      </svg>
    </div>
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.wrapper {
  height: 30px;
  width: 60px;
  padding: 3px;
  position: relative;
  border-radius: 100vmax;
  //@include flex(flex-start, center);
  //transition: var(--fast);
  position: relative;

  &.light {
    background-color: #e6e6e6;
    //flex-direction: row;
  }

  &.dark {
    background-color: #1E1F29;
    //flex-direction: row-reverse;
  }
}

.toggler {
  height: 24px;
  aspect-ratio: 1;
  border-radius: 100vmax;
  @include flex(center, center);
  transition: var(--fast);
  // position: absolute;
  // top: 3px;

  &.light {
    background-color: var(--light);
    color: #737278;
    // right: 3px;
    transform: translateX(15px);
  }

  &.dark {
    background-color: #fdfdfd;
    color: #1E1F29;
    transform: translateX(-15px);
    // left: 3px;
  }

  svg {
    pointer-events: none;
  }
}
</style>
