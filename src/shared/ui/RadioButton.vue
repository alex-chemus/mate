<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useTheme } from '@/shared/utils'

const props = defineProps<{
  name: string,
  value: string,
  selected?: boolean,
  theme?: 'light' | 'dark'
}>()

const emit = defineEmits<{
  (e: 'select'): void
}>()

const theme = props.theme
  ? ref(props.theme)
  : useTheme().theme
</script>

<template>
  <button
    class="radio-button" :class="[{ selected }, theme]"
    @click="emit('select')"
  >
    {{ value }}
  </button>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.radio-button {
  width: 100%;
  height: 40px;
  padding: 0 40px;
  @include flex(flex-start, center);
  border-radius: 8px;
  transition: var(--fast, $fast);
  position: relative;
  font-family: var(--findcreek, $findcreek);
  font-size: 13px;
  background-color: transparent;
  color: var(--heading-color-2, $heading-color-2);
  background-color: var(--bg-color-2, $bg-color-2);
  border: var(--border-1);

  &:focus {
    outline: none;
  }

  &:hover,
  &.focused {
    border: 1px solid var(--accent, $accent);
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 13px;
    width: 16px;
    aspect-ratio: 1;
    border-radius: 100vmax;
  }

  &.light::before {
    border: 2px solid color.change($gray-1, $alpha: .7);
  }

  &.dark::before {
    border: 2px solid #bbb;
  }
}

.radio-button.selected {
  color: var(--accent, $accent);

  &::before {
    border-color: currentColor;
  }

  &::after {
    content: '';
    display: block;
    height: 6px;
    aspect-ratio: 1;
    background-color: currentColor;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 18px;
    border-radius: 100vmax;
  }
}
</style>
