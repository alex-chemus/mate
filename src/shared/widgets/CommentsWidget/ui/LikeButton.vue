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
    <thumb-up-filled v-if="isLiked" />
    <thumb-up v-else />
    <span>{{ likesNumber }}</span>
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.like-button {
  @include findcreek-medium(11px, var(--text-color-1));
  @include flex(flex-start, center);
  gap: 6px;
  transition: var(--fast);

  &:hover,
  &:focus,
  &.active {
    color: var(--accent);
  }

  span {
    background-color: var(--bg-color-3);
    color: var(--text-color-1);
    border-radius: 100vmax;
    padding: 1px 7px;
  }

  &:is(:hover, :focus) span {
    color: var(--accent);
  }
}
</style>
