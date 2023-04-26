<script lang="ts" setup>
import { defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'input', payload: string): void
}>()
</script>

<template>
  <textarea
    class="input"
    placeholder="Расскажите, кто именно вам нужен..."
    rows="6"
    @input="p => emit('input', (p.target as HTMLTextAreaElement).value)"
  />
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.input {
  @include findcreek-medium(14px, var(--text-color-1));
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  resize: none;
}
</style>
