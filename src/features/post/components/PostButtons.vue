<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useTheme } from '@/utils'

const theme = useTheme()

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

const isPopupVisible = ref(false)
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

    <button :class="theme" class="button --round" @click="isPopupVisible = !isPopupVisible">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-dots-vertical" />
      </svg>
    </button>

    <ul v-if="isPopupVisible" class="popup" :class="theme">
      <li><button>
        <svg width="18" height="18" viewBox="0 0 18 18">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-plus" />
        </svg>
        <span>Сохранить в закладках</span>
      </button></li>
      <li><button>
        <svg width="18" height="18" viewBox="0 0 18 18">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-exclamation-mark" />
        </svg>
        <span>Пожаловаться</span>
      </button></li>
      <li><button>
        <svg width="18" height="18" viewBox="0 0 18 18">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-pencil" />
        </svg>
        <span>Редактировать</span>
      </button></li>
    </ul>
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

  &.--round {
    padding: 0;
    @include flex(center, center);
    aspect-ratio: 1;
  }

  &.--offset {
    margin-right: auto;
  }

  &.light {
    background-color: #f2f2f2;
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
    font-family: var(--ff-noto-sans);
    font-weight: var(--fw-bold);
    font-size: 11px;
  }

  &.light span {
    color: #8D9095;
  }

  &.dark span {
    color: var(--light);
  }
}

.popup {
  position: absolute;
  bottom: 105%;
  right: 0%;

  border-radius: 13px;
  padding: 12px;
  list-style: none;
  margin: 0;

  &.light {
    color: var(--dark-1);
    background-color: var(--light);
    border: 1px solid #e6e6e6;
  }

  &.dark {
    color: var(--light);
    background-color: var(--dark-theme-color-2);
    border: 1px solid rgba(118 118 118 / .25);
    box-shadow: 0 0 14px 0 rgba(0 0 0 / .25);
  }

  li {
    @include flex(flex-start, center);
  }

  li:not(:last-child) {
    margin-bottom: 10px;
  }

  li button {
    font-family: var(--ff-ubuntu);
    font-size: 13px;
    line-height: 140%;
    letter-spacing: -3.3%;
    color: inherit;
  }

  li span {
    margin-left: 9px;
  }
}
</style>
