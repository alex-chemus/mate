<script lang="ts" setup>
import { defineEmits } from 'vue'

const emit = defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <button class="prev-button" @click="emit('click')">Назад</button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.prev-button {
  height: 48px;
  @include flex(center, center);
  border-radius: 8px;
  background-color: var(--bg-color-3);
  border: var(--border-2);
  @include findcreek-bold(16px, var(--text-color-1));
  flex-grow: 1;
}
</style>
