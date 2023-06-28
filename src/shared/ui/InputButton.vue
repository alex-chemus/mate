<script lang="ts" setup>
import {
  defineProps, defineEmits, ref, defineExpose
} from 'vue'
import { useTheme } from '@/shared/utils'

const props = defineProps<{
  text: string,
  labelText?: string,
  theme?: 'light' | 'dark',
  customClass?: string,
  focused?: boolean,
}>()

const emit = defineEmits<{
  (e: 'update:focused', payload: boolean): void
}>()

const theme = props.theme ? ref(props.theme) : useTheme().theme

const containerRef = ref<HTMLElement | null>(null)
defineExpose({ buttonRef: containerRef })
</script>

<template>
  <label ref="containerRef">
    <p v-if="labelText" class="label" :class="theme">{{ labelText }}</p>
    <button
      class="button" :class="[theme, { focused }]"
      @focus="emit('update:focused', true)"
    >
      <slot name="before" />
      <span class="text">{{ text }}</span>
      <slot name="after" />
    </button>
  </label>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.button {
  height: 40px;
  width: 100%;
  padding: 13px;
  @include flex(space-between, center);
  gap: 12px;
  border-radius: 8px;
  transition: var(--fast, $fast);
  background-color: var(--bg-color-2, $bg-color-2);
  border: var(--border-1);

  &:focus {
    outline: none;
  }

  &:hover,
  &.focused {
    border: 1px solid var(--accent);
  }
}

.text {
  text-align: left;
  flex-grow: 2;
  font-family: var(--findcreek, $findcreek);
  font-size: 13px;
  background-color: transparent;
  border: none;
  color: var(--heading-color-2, $heading-color-2);

  &:hover,
  &:focus {
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
