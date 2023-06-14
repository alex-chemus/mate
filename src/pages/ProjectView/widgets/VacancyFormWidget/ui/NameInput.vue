<script lang="ts" setup>
import { defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'input', value: string): void
}>()
</script>

<template>
  <input
    type="text" class="input"
    placeholder="Напишите заголовок вакансии..."
    @input="p => emit('input', (p.target as HTMLInputElement).value)"
  />
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.input {
  @include findcreek-medium(24px, var(--text-color-1));
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
}
</style>
