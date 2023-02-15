<script lang="ts" setup>
import { defineProps } from 'vue'
import { useTheme } from '@/utils'

const { theme } = useTheme()

defineProps<{
  img?: string
}>()
</script>

<template>
  <section class="new-post-section" :class="theme">
    <div class="content-wrapper --align-start">
      <img v-if="img" :src="img" alt="" class="icon" :class="theme" />
      <div v-else class="icon placeholder" :class="theme" />
      <!-- eslint-disable -->
      <input
        type="text" placeholder="Расскажите, что произошло..."
        class="input" :class="theme"
      />
      <!-- eslint-enable -->
    </div>

    <div class="content-wrapper">
      <button class="new-button" :class="theme">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-plus" />
        </svg>
        <span>Добавить партнёра к записи</span>
      </button>

      <button class="icon-button" :class="theme">
        <svg width="25" height="25" viewBox="0 0 25 25">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-camera-plus" />
        </svg>
      </button>

      <button class="icon-button" :class="theme">
        <svg width="25" height="25" viewBox="0 0 25 25">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-video-plus" />
        </svg>
      </button>

      <button class="icon-button" :class="theme">
        <svg width="25" height="25" viewBox="0 0 25 25">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-template" />
        </svg>
      </button>

      <button class="icon-button" :class="theme">
        <svg width="25" height="25" viewBox="0 0 25 25">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-gps" />
        </svg>
      </button>

      <button class="icon-button" :class="theme">
        <svg width="25" height="25" viewBox="0 0 25 25">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-file-plus" />
        </svg>
      </button>

      <button class="icon-button" :class="theme">
        <svg width="25" height="25" viewBox="0 0 25 25">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-device-desktop-analytics" />
        </svg>
      </button>

      <button class="icon-button" :class="theme">
        <svg width="25" height="25" viewBox="0 0 25 25">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-shopping-cart" />
        </svg>
      </button>

      <button class="icon-button" :class="theme">
        <svg width="25" height="25" viewBox="0 0 25 25">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-clock-hour-4" />
        </svg>
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.new-post-section {
  border: 1px solid color.change($gray-1, $alpha: .25);
  padding: 15px;
  @include flex(flex-start, stretch, column);
  border-radius: 13px;
  background-color: var(--bg-color-1);

  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
}

.content-wrapper {
  @include flex(flex-start, center);

  &.--align-start {
    align-items: flex-start;
  }

  & > *:not(:last-child) {
    margin-right: 15px;
  }
}

.icon {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 100vmax;

  &.placeholder {
    background-color: var(--gray-1);
  }
}

.input {
  height: 40px;
  padding: 0 15px;
  border-radius: 8px;
  font-family: var(--findcreek);
  font-size: 14px;
  color: var(--gray-1);
  border: 1px solid color.change($gray-1, $alpha: .5);
  outline: none;
  min-width: 0;
  flex-grow: 1;
  background-color: var(--bg-color-1);
}

.new-button {
  height: 25px;
  @include flex(flex-start, center);
  border-radius: 8px;
  padding-left: 3px;
  padding-right: 13px;
  border: 1px solid color.change($gray-1, $alpha: .7);
  font-family: var(--findcreek);
  font-size: 12px;

  &.light {
    color: color.change($gray-1, $alpha: .7);
  }

  &.dark {
    color: var(--light);
  }

  & > *:not(:last-child) {
    margin-right: 3px;
  }
}

.icon-button {
  color: color.change($gray-1, $alpha: .5);
}
</style>
