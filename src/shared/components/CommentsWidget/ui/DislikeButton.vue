<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
// import DislikeSvg from './DislikeSvg.vue'
import { ThumbDown, ThumbDownFilled } from '@/shared/icons'

defineProps<{
  isDisliked: boolean,
  dislikesNumber: number
}>()

const emit = defineEmits<{
  (e: 'dislike'): void
}>()
</script>

<template>
  <button
    class="dislike-button" :class="{ 'active': isDisliked }"
    @click="emit('dislike')"
  >
    <thumb-down-filled />
    <span>{{ dislikesNumber }}</span>
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.dislike-button {
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
    color: var(--bg-color-2);
    background-color: var(--text-color-1);
  }
}
</style>
