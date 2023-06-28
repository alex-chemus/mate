<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { FullVacancy } from '@/shared/types'

defineProps<{
  vacancy: FullVacancy
}>()

const emit = defineEmits<{
  (e: 'toggle-like', state: boolean): void
}>()
</script>

<template>
  <button
    class="like-button" :class="{ 'liked': vacancy.isLiked }"
    @click="emit('toggle-like', !vacancy.isLiked)"
  >
    <svg width="24" height="24" viewBox="0 0 24 24">
      <use href="@/assets/imgs/tabler-sprite.svg#tabler-heart" />
    </svg>
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.like-button {
  border-radius: 100vmax;
  @include flex(center, center);
  width: 33px;
  aspect-ratio: 1;
  color: var(--text-color-1);
  transition: var(--fast);

  &.liked {
    color: var(--light);
    background-color: var(--red);
  }
}
</style>
