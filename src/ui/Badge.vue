<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useTheme } from '@/utils'

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
    class="badge" :class="[theme, { round }]"
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

.badge {
  width: fit-content;
  height: 30px;
  padding: 0px 8px;
  @include flex(flex-end, center);
  gap: 3px;
  border-radius: 13px;

  .round {
    border-radius: 100vmax;
  }

  &.light {
    background-color: var(--light);
    color: var(--dark-1);
    border: 1px solid color.change($gray-1, $alpha: .4);
  }

  &.dark {
    background-color: #1E1F29;
    color: var(--light);
    border: 1px solid color.change($gray-1, $alpha: .5);
  }
}

.close-button {
  &.light {
    color: #5c5c5c;
  }

  &.dark {
    color: #bbb;
  }
}
</style>
