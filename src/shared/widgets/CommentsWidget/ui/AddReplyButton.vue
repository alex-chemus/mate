<script lang="ts" setup>
import { defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'add-reply'): void
}>()
</script>

<template>
  <button
    class="add-reply-button"
    @click="emit('add-reply')"
  >Ответить</button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.add-reply-button {
  @include findcreek(11px, var(--text-color-1));
  transition: var(--fast);

  &:hover,
  &:focus {
    color: var(--accent);
  }
}
</style>
