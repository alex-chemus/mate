<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useTheme } from '@/utils'

const props = defineProps<{
  value?: string,
  placeholder?: string,
  labelText?: string,
  theme?: 'light' | 'dark'
}>()

const emit = defineEmits<{
  (e: 'update:value', payload: string): void
}>()

const theme = props.theme ? ref(props.theme) : useTheme().theme
</script>

<template>
  <label>
    <p v-if="labelText" class="label" :class="theme">{{ labelText }}</p>
    <textarea
      class="textarea" :class="theme"
      :value="value ?? ''"
      :placeholder="placeholder ?? ''"
      @input="e => emit('update:value', (e.target as HTMLTextAreaElement).value)"
      rows="6"
    />
  </label>
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
  color: var(--heading-color-2, $heading-color-2);
  background-color: var(--bg-color-2, $bg-color-2);
  border: var(--border-1);

  &.light:hover,
  &.light:focus {
    border: 1px solid var(--accent-1, $accent-1);
    outline: none;
  }

  &.dark:hover,
  &.dark:focus {
    border: 1px solid #55B1FF;
    outline: none;
  }
}

.label {
  font-family: var(--findcreek-medium, $findcreek-medium);
  font-size: 13px;
  margin: 0 0 6px 10px;
  color: var(--text-color-1);
}
</style>
