<script lang="ts" setup>
import { useTheme } from '@/shared/utils'
import { defineProps } from 'vue'

defineProps<{
  showComments?: boolean
}>()

const { theme } = useTheme()
</script>

<template>
  <article class="post-section" :class="theme">
    <slot name="header" />
    <slot name="heading" />
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
@import '@/assets/styles/style.scss';

.post-section {
  border: var(--border-2);
  border-radius: 14px;
  position: relative;
  overflow: hidden;
  background-color: var(--bg-color-2);
  @include flex(flex-start, stretch, column);
  gap: 10px;
  padding: 15px;
}

.line-separator {
  width: 100%;
  height: 1px;
  background-color: var(--bg-color-3);
}
</style>
