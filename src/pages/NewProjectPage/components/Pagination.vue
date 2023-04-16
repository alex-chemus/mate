<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'

defineProps<{
  currentPage: 1 | 2 | 3
}>()

const emit = defineEmits<{
  (e: 'select', payload: 1 | 2 | 3): void
}>()
</script>

<template>
  <ul class="buttons-list">
    <li class="button-item" v-for="i in 3" :key="i">
      <button
        class="button" :class="currentPage === i ? 'selected' : ''"
        @click="emit('select', i as 1 | 2 | 3)"
      />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.buttons-list {
  @include flex(space-between, center);
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.button {
  width: 8px;
  aspect-ratio: 1;
  border-radius: 100vmax;
  background-color: var(--text-color-3);
  transition: var(--fast);

  &.selected {
    background-color: var(--accent-1);
    box-shadow: 0 2px 40px 0 rgb(0 0 0 / .25);
  }
}
</style>
