<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'
import { useTheme } from '@/shared/utils'
import { ThumbDownFilled } from '@/shared/icons'

const { theme } = useTheme()

const props = defineProps<{
  likes: number,
  dislikes: number,
  comments: number,
  // comments: string,
  reaction: 0 | 1 | -1
}>()

const emit = defineEmits<{
  (e: 'like'): void,
  (e: 'dislike'): void,
  (e: 'comment'): void
}>()

const getLikes = computed(() => {
  if (props.likes < 1_000) return props.likes.toString()

  if (props.likes < 1_000_000) {
    const a = Math.floor(props.likes / 1_000)
    const b = +props.likes.toString().split('').reverse()[2]
    return `${a},${b}K`
  }

  const a = Math.floor(props.likes / 1_000_000)
  const b = +props.likes.toString().split('').reverse()[5]
  return `${a},${b}M`
})

const getDislikes = computed(() => {
  if (props.dislikes < 1_000) return props.dislikes.toString()

  if (props.dislikes < 1_000_000) {
    const a = Math.floor(props.dislikes / 1_000)
    const b = +props.dislikes.toString().split('').reverse()[2]
    return `${a},${b}K`
  }

  const a = Math.floor(props.dislikes / 1_000_000)
  const b = +props.dislikes.toString().split('').reverse()[5]
  return `${a},${b}M`
})
</script>

<template>
  <div class="buttons-container">
    <button @click="emit('like')" :class="[theme, { active: reaction === 1 }]" class="button like">
      <svg width="16" height="16" viewBox="0 0 24 24">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-heart-filled" />
      </svg>
      <span>{{ getLikes }}</span>
    </button>

    <button @click="emit('dislike')" :class="[theme, { active: reaction === -1 }]" class="button dislike">
      <thumb-down-filled />
      <span>{{ getDislikes }}</span>
    </button>

    <button @click="emit('comment')" class="button">
      <svg width="16" height="16" viewBox="0 0 24 24">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-message" />
      </svg>
      <span>{{ comments }}</span>
    </button>

    <!-- <button @click="emit('comment')" :class="theme" class="button --offset">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-messages" />
      </svg>
      <span>{{ props.comments }}</span>
    </button> -->

    <!-- <button :class="theme" class="button">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-screen-share" />
      </svg>
      <span>Поделиться</span>
    </button>

    <popover v-model:visible="isOpen" trigger="click" placement="top-left">
      <template #button>
        <button :class="theme" class="button --round" @click="isOpen = !isOpen">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-dots-vertical" />
          </svg>
        </button>
      </template>

      <template #content>
        <post-popup-layout />
      </template>
    </popover> -->
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
  height: 28px;
  border-radius: 100vmax;
  padding: 0 9px;
  border: 1px solid transparent;
  transition: var(--fast);
  background-color: var(--bg-color-3);
  gap: 7px;
  @include findcreek(12px, var(--text-color-2));

  &.like.active {
    background-color: var(--red);
    color: white;
  }

  &.dislike.active {
    background-color: var(--text-color-1);
    color: var(--bg-color-2);
  }

  &.--round {
    padding: 0;
    @include flex(center, center);
    aspect-ratio: 1;
  }

  &.--offset {
    margin-right: auto;
  }

  // &.active {
  //   color: var(--accent);
  // }

  span {
    @include findcreek-medium(12px, currentColor);
  }

  &:hover {
    border-color: var(--accent);
  }
}
</style>
