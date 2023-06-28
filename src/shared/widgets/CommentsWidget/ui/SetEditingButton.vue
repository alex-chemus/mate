<script lang="ts" setup>
import { defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'set-editing'): void
}>()
</script>

<template>
  <button
    class="set-editing-button"
    @click="emit('set-editing')"
  >
    <svg width="20" height="20" viewBox="0 0 20 20">
      <use href="@/assets/imgs/tabler-sprite.svg#tabler-pencil" />
    </svg>
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.set-editing-button {
  color: var(--text-color-1);
}
</style>
