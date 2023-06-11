<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

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
    <dislike-svg :active="isDisliked" />
    <span>{{ dislikesNumber }}</span>
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.dislike-button {
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
