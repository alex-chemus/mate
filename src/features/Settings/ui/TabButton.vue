<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { useTheme } from '@/shared/utils'

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
  @include flex(flex-start, center);
  gap: 12px;
  padding: 0 12px;
  position: relative;
  width: 100%;
  border-radius: 13px;
  color: var(--text-color-1);
  transition: var(--fast);
}

.tab-button:is(:hover, :focus) .text {
  color: var(--accent);
}

.tab-button.selected {
  background-color: var(--bg-color-3);
}
.icon-wrapper {
  width: 32px;
  aspect-ratio: 1;
  border-radius: 10px;
  background-color: transparent;
  color: white;
  @include flex(center, center);
}

.text {
  @include findcreek-medium(14px);
  transition: var(--fast);
}
</style>
