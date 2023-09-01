<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { useTheme } from '@/shared/utils'

defineProps<{
  selected?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const { theme } = useTheme()
</script>

<template>
  <button class="slider-button" :class="[theme, { selected }]" @click="emit('click')">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.slider-button {
  height: 30px;
  padding: 0 18px;
  @include flex(center, center);
  border: 1px solid transparent;
  @include findcreek(14px, var(--text-color-1));
  transition: var(--fast);
  border-radius: 6px;
  // background-color: var(--bg-color-2);
  // border: var(--border-1);

  // &:hover,
  // &.selected {
  //   border: 1px solid #DCE1E6;
  //   border-radius: 6px;
  //   box-shadow: 0 0 8px 0 rgb(0 0 0 / .1);
  // }

  // &:hover,
  // &.selected {
  //   color: var(--accent);
  // }

  &.selected {
    background-color: var(--bg-color-3);
    border: var(--border-1);
  }

  &:is(:hover, :focus) {
    color: var(--accent);
  }
}
</style>
