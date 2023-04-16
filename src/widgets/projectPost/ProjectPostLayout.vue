<script lang="ts" setup>
import { defineProps } from 'vue'
import { useTheme } from '@/utils'

// defineProps<{
//   img?: string,
//   date: string,
// }>()

const { theme } = useTheme()
</script>

<template>
  <article class="post-section" :class="theme">
    <!-- <img v-if="img" :src="img" alt="" class="image" />
    <div v-else class="image placeholder" /> -->
    <!-- <div class="post-banner">
      <slot name="banner" />
    </div> -->

    <!-- <div class="post-container">
      <div class="text">
        <slot name="text" />
      </div>

      <div class="author-container">
        <slot name="author" />
      </div>

      <div class="buttons-wrapper">
        <slot name="buttons" />
      </div>

      <div class="comment-container">
        <slot name="comment" />
      </div>
    </div> -->

    <slot name="header" />
    <slot name="text" />
    <slot name="gallery" />
    <slot name="buttons" />
  </article>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.post-section {
  border-radius: 13px;
  position: relative;
  overflow: hidden;
  background-color: var(--bg-color-1);
  @include flex(flex-start, stretch, column);
  gap: 15px;
  padding: 15px;
}

.date-wrapper {
  height: 20px;
  width: fit-content;
  padding: 0 12px;
  @include flex(center, center);
  border-radius: 10px;
  background-color: rgba(224 224 224 / .2);
  @include findcreek-medium(10px, rgba(190 190 190 / .7));
  letter-spacing: -3%;
  position: absolute;
  top: 14px;
  right: 14px;
}

.image {
  object-fit: cover;
  max-height: 300px;
  width: 100%;

  &.placeholder {
    height: 282px;
    background-color: color.change($gray-1, $alpha: .25);
  }
}

.post-container {
  padding: 14px;
}

.text {
  margin-bottom: 12px;
}

.author-container {
  margin-bottom: 16px;
}

.buttons-wrapper {
  margin-bottom: 18px;
}
</style>
