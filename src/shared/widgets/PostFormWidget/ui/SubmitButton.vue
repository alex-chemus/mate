<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'

defineProps<{
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button class="submit-button" @click="emit('click')" :disabled="disabled">Опубликовать</button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.submit-button {
  width: min(250px, 100%);
  height: 30px;
  width: 142px;
  border-radius: 13px;
  background-color: var(--accent);
  transition: var(--fast);
  @include findcreek-medium(14px, white);
}
</style>
