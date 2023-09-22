<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import LikeSvg from './LikeSvg.vue'
import { ThumbUp, ThumbUpFilled } from '@/shared/icons'

defineProps<{
  isLiked: boolean,
  likesNumber: number
}>()

const emit = defineEmits<{
  (e: 'like'): void
}>()
</script>

<template>
  <button
    class="like-button" :class="{ 'active': isLiked }"
    @click="emit('like')"
  >
    <!-- <like-svg :active="isLiked" /> -->
    <!-- <thumb-up-filled v-if="isLiked" />
    <thumb-up v-else /> -->
    <svg width="16" height="16" viewBox="0 0 24 24">
      <use href="@/assets/imgs/tabler-sprite.svg#tabler-heart-filled" />
    </svg>
    <span>{{ likesNumber }}</span>
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.like-button {
  height: 24px;
  padding: 0 8px;
  border-radius: 100vmax;
  @include findcreek(12px, var(--text-color-1));
  @include flex(flex-start, center);
  gap: 6px;
  transition: var(--fast);
  background-color: var(--bg-color-3);

  &:hover,
  &:focus,
  &.active {
    color: white;
    background-color: var(--red);
  }
}
</style>
