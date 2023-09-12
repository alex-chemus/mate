<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'

defineProps<{
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit'): void,
}>()
</script>

<template>
  <div class="buttons-container">
    <button @click="emit('submit')" class="button" :disabled="disabled">
      Опубликовать
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.buttons-container {
  @include flex(space-between, center);
}

.button {
  height: 28px;
  @include flex(flex-end, center);
  padding: 0 20px;
  border-radius: 100vmax;
  @include findcreek-medium(12px, var(--text-color-1));
  background-color: var(--bg-color-3);
  transition: var(--fast);

  &:hover,
  &:focus {
    background-color: var(--accent);
    color: var(--light);
  }
}
</style>
