<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

defineProps<{
  isPrimary?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>


<template>
  <button @click="emit('click')" :class="isPrimary ? 'primary' : 'regular'">
    <slot />
  </button>
</template>


<style lang="scss" scoped>
@use 'sass:color';
@import '@/styles/style.scss';

button {
  height: 35px;
  border-radius: 6px;
  padding: 0 13px !important;
  font-family: var(--ff-ubuntu) !important;
  font-size: 16px !important;
  font-weight: var(--fw-bold) !important;

  &.primary {
    background-color: var(--accent-1);
    color: var(--light);
  }

  &.regular {
    background-color: var(--light);
    color: var(--dark-2);
    border: 1px solid color.change($gray-1, $alpha: .4);
  }
}
</style>
