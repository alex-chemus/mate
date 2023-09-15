<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'

defineProps<{
  disabled?: boolean
}>()

const emit = defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <button class="finish-button" @click="emit('click')" :disabled="disabled">Создать проект</button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.finish-button {
  height: 48px;
  @include flex(center, center);
  border-radius: 8px;
  background-color: var(--light-accent);
  @include findcreek-bold(16px, white);
  flex-grow: 1;
}
</style>
