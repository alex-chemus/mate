<script lang="ts" setup>
import {
  defineProps, defineEmits, watch, ref, defineExpose
} from 'vue'
import { useTheme } from '@/shared/utils'

const props = defineProps<{
  type?: string,
  value?: string,
  placeholder?: string,
  labelText?: string,
  theme?: 'light' | 'dark',
  customClass?: string,
  focused?: boolean,
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:value', payload: string): void
  // (e: 'focus'): void,
  // (e: 'blur'): void
  (e: 'update:focused', payload: boolean): void
}>()

const theme = props.theme ? ref(props.theme) : useTheme().theme

const inputRef = ref<HTMLInputElement | null>(null)
watch(() => props.focused, () => {
  if (!inputRef.value) return
  if (props.focused) inputRef.value.focus()
  else inputRef.value.blur()
})

const containerRref = ref<HTMLElement | null>(null)
defineExpose({ inputRef: containerRref })
</script>

<template>
  <!-- eslint-disable -->
  <label ref="containerRef">
    <p v-if="labelText" class="label" :class="theme">{{ labelText }}</p>
    <div class="input-wrapper" :class="[theme, { focused }]">
      <slot name="before" />
      <input
        ref="inputRef"
        class="input" :class="[theme, customClass]"
        :disabled="disabled"
        :type="type ?? 'text'"
        :value="value ?? ''"
        :placeholder="placeholder ?? ''"
        @input="e => emit('update:value', (e.target as HTMLInputElement).value)"
        @focus="emit('update:focused', true)"
        @blur="emit('update:focused', false)"
      />
      <slot name="after" />
    </div>
  </label>
  <!-- eslint-enable -->
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.input-wrapper {
  height: 40px;
  padding: 13px;
  @include flex(space-between, center);
  gap: 12px;
  border-radius: 8px;
  transition: var(--fast, $fast);
  background-color: var(--bg-color-3, $bg-color-3);
  border: var(--border-1);

  &:focus {
    outline: none;
  }

  &:is(:hover, :focus) {
    border: 1px solid var(--accent);
  }
}

.input {
  flex-grow: 2;
  @include findcreek(14px, var(--text-color-1));
  background-color: transparent;
  border: none;

  &:hover,
  &:focus {
    outline: none;
  }
}

.label {
  margin: 0 0 7px 10px;
  @include findcreek-medium(14px, var(--text-color-1));
}
</style>
