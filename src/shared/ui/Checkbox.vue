<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useTheme } from '@/shared/utils'

const props = defineProps<{
  value: string,
  isSelected?: boolean,
  theme?: 'light' | 'dark',
  width?: 'fit-content' | 'max'
}>()

const emit = defineEmits<{
  (e: 'select', payload: boolean): void
}>()

const theme = props.theme
  ? ref(props.theme)
  : useTheme().theme
</script>

<template>
  <button
    class="checkbox-button" :class="[isSelected ? 'selected' : '', theme]"
    @click="emit('select', !isSelected)"
    :style="`width: ${width === 'fit-content' ? 'fit-content' : ''}`"
  >
    <div class="checkbox" :class="[isSelected ? 'selected' : '', theme]">
      <svg v-if="isSelected" width="16" height="16" viewBox="0 0 16 16">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-check" />
      </svg>
    </div>
    <span>{{ value }}</span>
  </button>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.checkbox-button {
  @include flex(flex-start, center);
  gap: 8px;
  transition: var(--fast, $fast);
  position: relative;
  @include findcreek(14px, var(--text-color-1));
  background-color: transparent;
}

.checkbox {
  height: 16px;
  width: 16px;
  box-sizing: content-box;
  border-radius: 5px;
  transition: var(--fast);
  border: 1px solid var(--text-color-2);

  svg {
    pointer-events: none;
  }
}

.checkbox-button:hover .checkbox,
.checkbox-button.focused .checkbox {
  border-color: var(--accent);
}

.checkbox-button.selected .checkbox {
  color: var(--accent, $accent);
}
</style>
