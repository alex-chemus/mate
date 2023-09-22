<script lang="ts" setup>
import { defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <!-- <button class="close-button" @click="emit('close')">
    <svg width="24" height="24" viewBox="0 0 24 24">
      <use href="@/assets/imgs/tabler-sprite.svg#tabler-chevron-up" />
    </svg>
  </button> -->
  <div class="button-wrapper">
    <button @click="emit('close')">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-chevron-up" />
      </svg>
    </button>
    <div class="line" />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

// .close-button {
//   width: 24px;
//   aspect-ratio: 1;
//   border-radius: 100vmax;
//   color: var(--gray-1);
//   border: 1px solid currentColor;
//   background-color: var(--bg-color-3);
// }

.button-wrapper {
  @include flex(flex-start, center, column);
  // gap: 3px;
  padding-bottom: 8px;
}

.button-wrapper button {
  transition: var(--fast);
  color: var(--text-color-2);

  &:is(:focus, :hover) {
    color: var(--text-color-1);
  }
}

.line {
  height: 100%;
  width: 1px;
  background-color: var(--text-color-2);
  transform: translate(-50%);
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    transform-origin: center;
    transform: translate(0, -50%) rotate(44deg);
    border: 1px solid var(--text-color-2);
    height: 16px;
    width: 16px;
    border-radius: 8px;
    border-top-color: transparent;
    border-right-color: transparent;
    border-left-color: transparent;
  }
}
</style>
