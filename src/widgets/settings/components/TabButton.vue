<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { useTheme } from '@/utils'

defineProps<{
  selected?: boolean,
  color?: string
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const { theme } = useTheme()
</script>

<template>
  <button
    class="tab-button" :class="[theme, { selected }]"
    @click="emit('click')"
  >
    <div class="icon-wrapper" :style="`background-color: ${color}`">
      <slot name="icon" />
    </div>
    <span class="text" :class="theme">
      <slot name="text" />
    </span>
  </button>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.tab-button {
  height: 60px;
  //padding: 0 20px;
  @include flex(flex-start, center);
  gap: 15px;
  position: relative;
}

.tab-button:hover,
.tab-button:focus,
.tab-button.selected {
  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 2px;
    height: 100%;
    top: 0;
    left: -20px;
    border-radius: 100vmax;
    box-shadow: 2px 0 10px 2px color.change($accent-1, $alpha: .4);
  }

  &.light::before {
    background-color: var(--accent-1);
  }

  &.dark::before {
    background-color: var(--light);
  }
}
.icon-wrapper {
  width: 32px;
  aspect-ratio: 1;
  border-radius: 10px;
  background-color: transparent;
  color: var(--light);
  @include flex(center, center);
}

.text {
  font-family: var(--findcreek-medium);
  font-size: 14px;
  transition: var(--fast);
  color: var(--text-color-1);
}

.selected .text {
  &.light {
    color: var(--accent-1);
  }

  &.dark {
    color: var(--light);
  }
}
</style>
