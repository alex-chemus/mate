<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useTheme } from '@/utils'

const props = defineProps<{
  value?: string,
  placeholder?: string,
  theme?: 'light' | 'dark'
}>()

const emit = defineEmits<{
  (e: 'update:value', payload: string): void
}>()

const theme = props.theme ? ref(props.theme) : useTheme().theme
</script>

<template>
  <textarea
    class="textarea" :class="theme"
    :value="value ?? ''"
    :placeholder="placeholder ?? ''"
    @input="e => emit('update:value', (e.target as HTMLTextAreaElement).value)"
    rows="6"
  />
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.textarea {
  resize: none;
  padding: 12px 14px;
  border-radius: 8px;
  transition: var(--fast);
  font-family: var(--findcreek, $findcreek);
  font-size: 13px;
  width: 100%;

  &.light {
    color: var(--dark-2, $dark-2);
    background-color: var(--light, $light);
    border: 1px solid color.change($gray-1, $alpha: .4);
  }

  &.light:hover,
  &.light:focus {
    border: 1px solid var(--accent-1, $accent-1);
    outline: none;
  }

  &.dark {
    color: var(--light, $light);
    background-color: #1E1F29;
    border: 1px solid color.change($gray-1, $alpha: .4);
  }

  &.dark:hover,
  &.dark:focus {
    border: 1px solid #55B1FF;
    outline: none;
  }
}
</style>
