<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

defineProps<{
  value: string | undefined
}>()

const emit = defineEmits<{
  (e: 'update:value', value: string): void
}>()
</script>

<template>
  <textarea
    placeholder="Чем вы хотели поделиться?"
    @change="e => emit('update:value', (e.target as HTMLTextAreaElement).value)"
    rows="5"
  />
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

textarea {
  background: transparent;
  @include findcreek(16px, var(--text-color-1));
  border: none;
  resize: none;

  &:focus {
    outline: none;
  }
}
</style>
