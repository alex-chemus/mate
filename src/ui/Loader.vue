<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { useTheme } from '@/utils'

const props = defineProps<{
  size?: number,
  theme?: 'light' | 'dark'
}>()

const theme = props.theme ? ref(props.theme) : useTheme().theme
</script>

<template>
  <div
    class="loader" :class="theme"
    :style="`width: ${size || 48}px; height: ${size || 48}px`"
  />
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.loader {
  border-bottom-color: transparent !important;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  border: 5px solid var(--accent, $accent);
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
