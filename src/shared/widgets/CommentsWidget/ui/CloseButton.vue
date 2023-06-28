<script lang="ts" setup>
import { defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <button class="close-button" @click="emit('close')">
    <svg width="24" height="24" viewBox="0 0 24 24">
      <use href="@/assets/imgs/tabler-sprite.svg#tabler-chevron-up" />
    </svg>
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.close-button {
  width: 24px;
  aspect-ratio: 1;
  border-radius: 100vmax;
  color: var(--gray-1);
  border: 1px solid currentColor;
  background-color: var(--bg-color-3);
}
</style>
