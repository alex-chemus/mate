<script lang="ts" setup>
import { useTheme } from '@/utils'

const { theme } = useTheme()
</script>

<template>
  <article class="post-section" :class="theme">
    <slot name="header" />
    <slot name="heading" />
    <slot name="text" />
    <slot name="gallery" />
    <slot name="buttons" />
    <slot name="comments-widget" />
  </article>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.post-section {
  border: var(--border-2);
  border-radius: 13px;
  position: relative;
  overflow: hidden;
  background-color: var(--bg-color-1);
  @include flex(flex-start, stretch, column);
  gap: 15px;
  padding: 15px;
}
</style>
