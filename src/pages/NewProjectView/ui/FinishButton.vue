<script lang="ts" setup>
import { defineEmits } from 'vue'

const emit = defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <button class="finish-button" @click="emit('click')">Создать проект</button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.finish-button {
  height: 48px;
  @include flex(center, center);
  border-radius: 8px;
  background-color: var(--accent-1);
  @include findcreek-bold(16px, var(--light));
  flex-grow: 1;
}
</style>
