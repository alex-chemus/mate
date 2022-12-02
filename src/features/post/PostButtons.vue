<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

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
    <button @click="emit('like')">
      <svg v-if="(props.reaction === 1)" width="16" height="16" viewBox="0 0 16 16">
        <use href="@/assets/tabler-sprite.svg#tabler-thumb-up" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-thumb-up" width="16" height="16" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
      </svg>
      {{ props.likes }}
    </button>

    <button @click="emit('dislike')">
      {{ props.dislikes }}
    </button>

    <button @click="emit('comment')">
      {{ props.comments }}
    </button>

    <button>
      Поделиться
    </button>

    <button></button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/style.scss';
</style>
