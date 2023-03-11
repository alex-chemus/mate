<script lang="ts" setup>
import { defineEmits, defineProps, ref } from 'vue'
import { useTheme } from '@/utils'

const props = defineProps<{
  theme?: 'light' | 'dark',
  style?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const theme = props.theme ? ref(props.theme) : useTheme().theme
</script>

<template>
  <section class="modal" :class="theme">
    <button @click="emit('close')" class="close-button">
      <svg width="30" height="30" viewBox="0 0 30 30">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-x" />
      </svg>
    </button>

    <slot />
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.modal {
  margin: 0 auto;
  padding: 20px;
  border-radius: 13px;
  position: relative;

  &.light {
    background-color: var(--light);
  }

  &.dark {
    background-color: #1F1D2C;
  }
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  color: var(--gray-2);
  transition: var(--fast);

  &:hover,
  &:focus {
    color: var(--gray-1)
  }
}
</style>
