<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useTheme } from '@/shared/utils'

const props = defineProps<{
  value?: string,
  placeholder?: string,
  labelText?: string,
  theme?: 'light' | 'dark',
  rows?: number
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
      :rows="`${rows ?? 6}`"
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
  width: 100%;
  @include findcreek(14px, var(--text-color-1));
  background-color: var(--bg-color-3, $bg-color-3);
  border: var(--border-1);

  &:is(:hover, :focus) {
    border: 1px solid var(--accent);
    outline: none;
  }
}

.label {
  @include findcreek-medium(14px, var(--text-color-1));
  margin: 0 0 7px 10px;
}
</style>
