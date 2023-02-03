<script lang="ts" setup>
import {
  defineProps, defineEmits, defineExpose, ref
} from 'vue'
import { useTheme } from '@/utils'

const emit = defineEmits<{
  (e: 'update:value', payload: string): void
}>()

const { theme } = useTheme()
const focused = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
</script>

<template>
  <label>
    <p class="label" :class="theme">Дата основания</p>
    <button
      class="input-wrapper" :class="[theme, { focused }]"
      @focus="focused = true"
      @blur="focused = false"
      @click="inputRef?.showPicker()"
    >
      <input
        class="input" :class="theme"
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
  cursor: pointer;
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

  &::-webkit-calendar-picker-indicator {
    display: none;
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

svg {
  &.light {
    color: #5c5c5c;
  }

  &.dark {
    color: #bbb;
  }
}
</style>
