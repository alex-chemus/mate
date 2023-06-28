<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useTheme } from '@/shared/utils'

const props = defineProps<{
  theme?: 'light' | 'dark',
  borderColor?: string,
  round?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const theme = props.theme ? ref(props.theme) : useTheme().theme
</script>

<template>
  <div
    class="tag" :class="[theme, { round }]"
    :style="borderColor ? {
      'border': `1px solid ${borderColor}`
    } : ''">
    <div class="content-wrapper">
      <slot name="content" />
    </div>
    <slot name="button" />
    <button class="close-button" :class="theme" @click="emit('close')">
      <svg width="18" height="18" viewBox="0 0 18 18">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-x" />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.tag {
  width: fit-content;
  height: 30px;
  padding: 0px 8px;
  @include flex(flex-end, center);
  gap: 3px;
  border-radius: 13px;
  transition: var(--fast);
  color: var(--heading-color-1);
  background-color: var(--bg-color-2);
  border: var(--border-1);

  &.round {
    border-radius: 100vmax;
  }
}

.close-button {
  color: var(--text-color-1);
}
</style>
