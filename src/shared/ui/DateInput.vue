<script lang="ts" setup>
import {
  defineProps, defineEmits, ref
} from 'vue'
import { useTheme } from '@/shared/utils'

defineProps<{
  value?: string,
  label?: string
}>()

const emit = defineEmits<{
  (e: 'update:value', payload: string): void
}>()

const { theme } = useTheme()
const focused = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
</script>

<template>
  <label>
    <p v-if="label" class="label" :class="theme">{{ label }}</p>
    <button
      class="input-wrapper" :class="[theme, { focused }]"
      @focus="focused = true"
      @blur="focused = false"
      @click="inputRef?.showPicker()"
    >
      <input
        class="input" :class="theme" :value="value"
        type="date" ref="inputRef"
        placeholder="день/месяц/год"
        @input="e => emit('update:value', (e.target as HTMLInputElement).value)"
      />
      <svg width="24" height="24" viewBox="0 0 24 24" :class="theme">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-calendar-event" />
      </svg>
    </button>
  </label>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.input-wrapper {
  width: 100%;
  cursor: pointer;
  height: 40px;
  padding: 13px;
  @include flex(space-between, center);
  gap: 15px;
  border-radius: 8px;
  transition: var(--fast, $fast);
  background-color: var(--bg-color-3, $bg-color-3);
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
  cursor: pointer;
  flex-grow: 2;
  @include findcreek(14px, var(--text-color-1));
  background-color: transparent;
  border: none;

  &:hover,
  &:focus {
    outline: none;
  }

  &::-webkit-calendar-picker-indicator {
    display: none;
  }
}

.label {
  @include findcreek-medium(14px, var(--heading-color-1));
  margin: 0 0 7px 10px;
}

svg {
  color: var(--text-color-2);
}
</style>
