<script lang="ts" setup>
import { useTheme } from '@/shared/utils';
import { defineEmits, defineProps, ref } from 'vue'

const props = defineProps<{
  placeholder: string,
  theme?: 'light' | 'dark'
}>()

const emit = defineEmits<{
  (e: 'input', value: Event): void
}>()

const theme = props.theme ? ref(props.theme) : useTheme().theme
</script>


<template>
  <!-- eslint-disable-next-line -->
  <input
    type="text"
    :placeholder="placeholder"
    :class="theme"
    @input="e => emit('input', e)"
  />
</template>


<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

input {
  height: 40px;
  //width: 100%;
  //box-sizing: border-box;
  border-radius: 10px;
  padding: 0 16px;
  font-family: var(--findcreek-medium, $findcreek-medium);
  font-size: 16px;
  border: 1px solid color.change($gray-1, $alpha: .4);
  transition: .15s ease-out;
  outline: none;
  color: var(--heading-color-2, $heading-color-2);

  &:focus {
    border-color: var(--accent-2, $accent-2);
  }

  &.light {
    background-color: var(--light, $light);
  }

  &.dark {
    background-color: color.change($gray-1, $alpha: .5);
  }
}
</style>
