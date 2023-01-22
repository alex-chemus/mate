<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useTheme } from '@/utils'
import { Popover } from 'ant-design-vue'
import PostPopupLayout from './PostPopupLayout.vue'

const { theme } = useTheme()

const props = defineProps<{
  likes: string,
  dislikes: string,
  comments: string,
  reaction: 0 | 1 | -1
}>()

const emit = defineEmits<{
  (e: 'like'): void,
  (e: 'dislike'): void,
  (e: 'comment'): void
}>()

const isOpen = ref(false)
</script>

<template>
  <div class="buttons-container">
    <button @click="emit('like')" :class="theme" class="button">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-thumb-up" />
      </svg>
      <span>{{ props.likes }}</span>
    </button>

    <button @click="emit('dislike')" :class="theme" class="button">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-thumb-down" />
      </svg>
      <span>{{ props.dislikes }}</span>
    </button>

    <button @click="emit('comment')" :class="theme" class="button --offset">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-messages" />
      </svg>
      <span>{{ props.comments }}</span>
    </button>

    <button :class="theme" class="button">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-screen-share" />
      </svg>
      <span>Поделиться</span>
    </button>

    <popover v-model:visible="isOpen" trigger="click" placement="bottomRight">
      <button :class="theme" class="button --round">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-dots-vertical" />
        </svg>
      </button>

      <template #content>
        <post-popup-layout />
      </template>
    </popover>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.buttons-container {
  @include flex(flex-start, center);
  position: relative;

  & > *:not(:first-child) {
    margin-left: 6px;
  }
}

.button {
  height: 33px;
  border-radius: 30px;
  padding: 0 9px;
  border: 1px solid transparent;
  transition: var(--fast);

  &.--round {
    padding: 0;
    @include flex(center, center);
    aspect-ratio: 1;
  }

  &.--offset {
    margin-right: auto;
  }

  &.light {
    background-color: #F9FBFC;
    color: #0f0f0f;
  }

  &.dark {
    background-color: #333640;
    color: var(--light);
  }

  & > *:not(:last-child) {
    margin-right: 6px;
  }

  span {
    font-family: var(--noto-sans);
    font-weight: var(--bold);
    font-size: 11px;
  }

  &.light span {
    color: #8D9095;
  }

  &.dark span {
    color: var(--light);
  }

  &.light:hover {
    border-color: var(--accent-1);
  }

  &.dark:hover {
    border-color: var(--accent-2);
  }
}
</style>
