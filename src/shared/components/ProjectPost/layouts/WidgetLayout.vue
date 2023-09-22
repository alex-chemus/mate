<script lang="ts" setup>
import { defineProps } from 'vue'
import { useTheme } from '@/shared/utils'

defineProps<{
  showComments?: boolean
}>()

const { theme } = useTheme()
</script>

<template>
  <article class="post-section" :class="theme">
    <slot name="header" />
    <slot name="text" />
    <slot name="gallery" />
    <slot name="buttons" />
    <template v-if="showComments">
      <div class="line-separator" />
      <slot name="comments-widget" />
    </template>
  </article>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.post-section {
  border: var(--border-2);
  border-radius: 13px;
  position: relative;
  overflow: hidden;
  background-color: var(--bg-color-2);
  @include flex(flex-start, stretch, column);
  gap: 17px;
  padding: 20px;
}

.line-separator {
  width: 100%;
  height: 1px;
  background-color: var(--bg-color-3);
}
</style>
