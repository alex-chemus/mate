<script lang="ts" setup>
import {
  defineProps, defineEmits, ref, computed
} from 'vue'
import { useTheme } from '@/utils'
import { Popover } from '@/hocs'
import PostPopupLayout from './PostPopupLayout.vue'
import LikeSvg from './LikeSvg.vue'
import DislikeSvg from './DislikeSvg.vue'

const { theme } = useTheme()

const props = defineProps<{
  likes: number,
  dislikes: number,
  // comments: string,
  reaction: 0 | 1 | -1
}>()

const emit = defineEmits<{
  (e: 'like'): void,
  (e: 'dislike'): void,
  (e: 'comment'): void
}>()

const isOpen = ref(false)

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
    <button @click="emit('like')" :class="[theme, { 'active': reaction === 1 }]" class="button">
      <like-svg :active="reaction === 1" />
      <span>{{ getLikes }}</span>
    </button>

    <button @click="emit('dislike')" :class="[theme, { 'active': reaction === -1 }]" class="button">
      <dislike-svg :active="reaction === -1" />
      <span>{{ getDislikes }}</span>
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
  height: 33px;
  border-radius: 30px;
  padding: 0 9px;
  border: 1px solid transparent;
  transition: var(--fast);
  background-color: var(--bg-color-3);
  color: var(--text-color-1);

  &.--round {
    padding: 0;
    @include flex(center, center);
    aspect-ratio: 1;
  }

  &.--offset {
    margin-right: auto;
  }

  &.active .fill-path {
    fill: url('#gradient-fill');
  }

  & > *:not(:last-child) {
    margin-right: 6px;
  }

  span {
    @include noto-sans-bold(11px);
  }

  &.light span {
    color: #8D9095;
  }

  &.dark span {
    color: var(--light);
  }

  &:hover {
    border-color: var(--accent);
  }
}
</style>