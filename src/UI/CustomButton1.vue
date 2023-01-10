<script lang="ts" setup>
import { useTheme } from '@/utils';
import { defineEmits, defineProps, StyleValue } from 'vue'

const theme = useTheme()

const props = defineProps<{
  height?: number,
  paddingX?: number,
  paddingY?: number,
  borderRadius?: number,
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const setStyle = () => {
  let style = ''

  if (props.height)
    style += `height: ${props.height}px;`

  if (props.paddingX) {
    style += `
      padding-left: ${props.paddingX}px;
      padding-right: ${props.paddingX}px;
    `
  }

  if (props.paddingY) {
    style += `
      padding-top: ${props.paddingY}px;
      padding-bottom: ${props.paddingY}px;
    `
  }

  if (props.borderRadius) {
    style += `
      border-radius: ${props.borderRadius}px;
    `
  }

  return style as StyleValue
}
</script>

<template>
  <button @click="emit('click')" :style="setStyle()" :class="theme">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

button {
  position: relative;
  padding: 5px;
  border-radius: 8px;

  &.light {
    border: 1px solid color.change($gray-1, $alpha: .20);
    background-color: var(--light);
  }

  &.dark {
    border: 1px solid color.change($gray-3, $alpha: .5);
    //background-color:
  }
}
</style>
