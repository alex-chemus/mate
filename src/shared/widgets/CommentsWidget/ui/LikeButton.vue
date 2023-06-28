<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import LikeSvg from './LikeSvg.vue'

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
    <like-svg :active="isLiked" />
    <span>{{ likesNumber }}</span>
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.like-button {
  @include findcreek-medium(11px, var(--text-color-1));
  @include flex(flex-start, center);
  gap: 5px;
  transition: var(--fast);

  &:hover,
  &:focus,
  &.active {
    color: var(--accent);
  }
}
</style>
