<script lang="ts" setup>
import { defineProps } from 'vue'
import { useTheme } from '@/utils'

defineProps<{
  media: any[]
}>()

const { theme } = useTheme()
</script>

<template>
  <section v-if="media.length" class="media-section" :class="theme">
    <a
      v-for="mediaItem in media" :key="mediaItem.id"
      :href="mediaItem.url" :title="mediaItem.service"
      class="media-item" :class="theme"
    >
      <img
        v-if="mediaItem.logo"
        :src="mediaItem.logo" :alt="mediaItem.service"
        class="media-logo"
      />
      <div v-else class="media-logo placeholder" />
    </a>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.media-section {
  width: fit-content;
  padding: 17px;
  border-radius: 20px;
  display: grid;
  grid-template-columns: repeat(min-content, 2);
  grid-gap: 10px;
  grid-auto-rows: 1fr;
  grid-auto-flow: column;
  background-color: var(--bg-color-1);
  border: 1px solid color.change($gray-1, $alpha: .4);
}

.media-item {
  width: 70px;
  aspect-ratio: 1;
  border-radius: 15px;
  @include flex(center, center);
  transition: var(--fast);
  border: var(--border-1);

  &:hover,
  &:focus {
    box-shadow: 0 6px 17px 4px rgb(0 0 0 / .1);
  }
}

.media-logo {
  width: 30px;
  aspect-ratio: 1;
  object-fit: contain;
  object-position: 50% 50%;

  &.placeholder {
    border-radius: 100vmax;
    background-color: var(--gray-1);
  }
}
</style>
