<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useTheme } from '@/utils'

const props = defineProps<{
  type?: string,
  value?: string,
  placeholder?: string,
  theme?: 'light' | 'dark'
}>()

const emit = defineEmits<{
  (e: 'update:value', payload: string): void
}>()

const theme = props.theme ? ref(props.theme) : useTheme().theme
const focused = ref(false)
</script>

<template>
  <label class="input-wrapper" :class="[theme, { focused }]">
    <input
      class="input" :class="theme"
      :type="type ?? 'text'"
      :value="value ?? ''"
      :placeholder="placeholder ?? ''"
      @input="e => emit('update:value', (e.target as HTMLInputElement).value)"
      @focus="focused = true"
      @blur="focused = false"
    />
    <slot />
  </label>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.input-wrapper {
  height: 40px;
  padding: 14px;
  @include flex(space-between, center);
  gap: 15px;
  border-radius: 8px;
  transition: var(--fast, $fast);

  &:focus {
    outline: none;
  }

  &.light {
    background-color: var(--light, $light);
    border: 1px solid color.change($gray-1, $alpha: .4);
  }

  &.light:hover,
  &.light.focused {
    border: 1px solid rgb(0 10 255 / .4);
  }

  &.dark {
    background-color: #1E1F29;
    border: 1px solid color.change($gray-1, $alpha: .4);
  }

  &.dark:hover,
  &.dark.focused {
    border: 1px solid #55B1FF;
  }
}

.input {
  flex-grow: 2;
  font-family: var(--findcreek, $findcreek);
  font-size: 13px;
  background-color: transparent;
  border: none;

  &:hover,
  &:focus {
    outline: none;
  }

  &.light {
    color: var(--dark-2, $dark-2);
  }

  &.dark {
    color: var(--light, $light);
  }
}
</style>
