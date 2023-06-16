<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

defineProps<{
  isLastPage: boolean,
  isFirstPage: boolean
}>()

const emit = defineEmits<{
  (e: 'prev'): void,
  (e: 'next'): void
}>()
</script>

<template>
  <div class="pagination">
    <button v-if="isFirstPage" class="button disabled">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-chevron-left" />
      </svg>
    </button>
    <button v-else class="button" @click="emit('prev')">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-chevron-left" />
      </svg>
    </button>

    <button v-if="isLastPage" class="button disabled">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-chevron-right" />
      </svg>
    </button>
    <button v-else class="button" @click="emit('next')">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-chevron-right" />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.pagination {
  @include flex(center, center);
  gap: 30px;
}

.button {
  border: var(--border-1);
  height: 30px;
  aspect-ratio: 1;
  border-radius: 100vmax;
  @include flex(center, center);
  color: var(--text-color-1);
  transition: var(--fast);

  &:hover,
  &:focus {
    box-shadow: 0 1px 14px 0 rgb(0 0 0 / .25);
    color: var(--accent);
  }

  &.disabled {
    border: none;
    cursor: not-allowed;
  }

  &.disabled:hover,
  &.disabled:focus {
    box-shadow: none;
    color: var(--text-color-1);
  }
}
</style>
