<script lang="ts" setup>
import { defineEmits } from 'vue'

const emit = defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <button class="next-button" @click="emit('click')">Далее</button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.next-button {
  height: 48px;
  @include flex(center, center);
  border-radius: 8px;
  background-color: var(--light-accent);
  @include findcreek-bold(16px, white);
  flex-grow: 1;
}
</style>
