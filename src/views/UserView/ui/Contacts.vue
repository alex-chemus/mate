<script lang="ts" setup>
import { defineProps } from 'vue'
import { useTheme } from '@/shared/utils'
import { SocialMedia } from '@/shared/types'

defineProps<{
  media: SocialMedia[]
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
      <div v-else class="media-logo">
        <svg width="27" height="27" viewBox="0 0 24 24">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-world-question" />
        </svg>
      </div>
    </a>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.media-section {
  //width: fit-content;
  padding: 17px;
  border-radius: 13px;
  display: grid;
  grid-template-columns: repeat(4, min-content);
  grid-gap: 29px;
  grid-auto-rows: 1fr;
  grid-auto-flow: row;
  justify-items: center;
  background-color: var(--bg-color-2);
  // border: 1px solid color.change($gray-1, $alpha: .4);
  border: var(--border-2);
}

.media-item {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 15px;
  @include flex(center, center);
  transition: var(--fast);
  border: var(--border-2);
  background-color: var(--bg-color-3);

  &:is(:hover, :focus) {
    box-shadow: var(--hover-element-shadow);
  }

  // &:hover,
  // &:focus {
  //   box-shadow: 0 6px 17px 4px rgb(0 0 0 / .1);
  // }
}

.media-logo {
  width: 25px;
  aspect-ratio: 1;
  object-fit: contain;
  object-position: 50% 50%;
  @include flex;
  color: var(--heading-color-1);

  &.placeholder {
    border-radius: 100vmax;
    background-color: var(--gray-1);
  }
}
</style>
