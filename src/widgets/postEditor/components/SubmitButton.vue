<script lang="ts" setup>
import { defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button class="submit-button" @click="emit('click')">Опубликовать</button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.submit-button {
  width: min(250px, 100%);
  height: 30px;
  border-radius: 5px;
  border: 1px solid currentColor;
  background-color: transparent;
  transition: var(--fast);
  @include findcreek(12px, var(--accent));
  letter-spacing: -0.05em;

  &:hover,
  &:focus {
    color: var(--light);
    border-color: transparent;
    background-color: var(--accent);
  }
}
</style>
