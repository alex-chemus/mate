<script lang="ts" setup>
import {
  defineProps, defineEmits, watch, ref
} from 'vue'
import { useTheme } from '@/utils'

const props = defineProps<{
  type?: string,
  value?: string,
  placeholder?: string,
  labelText?: string,
  theme?: 'light' | 'dark',
  customClass?: string,
  focused?: boolean
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
//const focused = ref(false)

// const onFocus = () => {
//   console.log('[input.vue] focus')
//   focused.value = true
//   emit('focus')
// }

// const onBlur = () => {
//   console.log('[input.vue] blur')
//   focused.value = false
//   emit('blur')
// }
</script>

<template>
  <label>
    <p v-if="labelText" class="label" :class="theme">{{ labelText }}</p>
    <div class="input-wrapper" :class="[theme, { focused }]">
      <input
        ref="inputRef"
        class="input" :class="[theme, customClass]"
        :type="type ?? 'text'"
        :value="value ?? ''"
        :placeholder="placeholder ?? ''"
        @input="e => emit('update:value', (e.target as HTMLInputElement).value)"
        @focus="emit('update:focused', true)"
        @blur="emit('update:focused', false)"
      />
      <slot />
    </div>
  </label>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.input-wrapper {
  height: 40px;
  padding: 13px;
  @include flex(space-between, center);
  gap: 15px;
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

.input {
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
