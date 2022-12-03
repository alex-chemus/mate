<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { IState } from '@/store/types'

const { state } = useStore<IState>()

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
</script>

<template>
  <div class="buttons-container">
    <button @click="emit('like')" :class="state.theme">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <use href="@/assets/tabler-sprite.svg#tabler-thumb-up" />
      </svg>
      <span>{{ props.likes }}</span>
    </button>

    <button @click="emit('dislike')" :class="state.theme">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <use href="@/assets/tabler-sprite.svg#tabler-thumb-down" />
      </svg>
      <span>{{ props.dislikes }}</span>
    </button>

    <button @click="emit('comment')" :class="state.theme">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <use href="@/assets/tabler-sprite.svg#tabler-messages" />
      </svg>
      <span>{{ props.comments }}</span>
    </button>

    <button :class="state.theme" class="--offset">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <use href="@/assets/tabler-sprite.svg#tabler-screen-share" />
      </svg>
      <span>Поделиться</span>
    </button>

    <button :class="state.theme" class="--round">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <use href="@/assets/tabler-sprite.svg#tabler-dots-vertical" />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/style.scss';

.buttons-container {
  @include flex(flex-start, center);

  & > *:not(:last-child) {
    margin-right: 6px;
  }
}

button {
  height: 33px;
  border-radius: 30px;
  padding: 0 9px;

  &.--round {
    padding: 0;
    @include flex(center, center);
    aspect-ratio: 1;
  }

  &.--offset {
    margin-left: auto;
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
</style>
