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

  &:focus {
    outline: none;
  }

  &.light {
    background-color: var(--light, $light);
    border: 1px solid color.change($gray-1, $alpha: .4);
  }

  &.light:hover,
  &.light.focused {
    border: 1px solid var(--accent-1);
  }

  &.dark {
    background-color: #1E1F29;
    border: 1px solid color.change($gray-1, $alpha: .4);
  }

  &.dark:hover,
  &.dark.focused {
    border: 1px solid var(--accent-2);
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

.label {
  font-family: var(--findcreek-medium, $findcreek-medium);
  font-size: 13px;
  margin: 0 0 6px 10px;

  &.light {
    color: #5c5c5c;
  }

  &.dark {
    color: #bbb;
  }
}
</style>
