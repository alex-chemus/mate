<script lang="ts" setup>
import { defineProps } from 'vue'
import { useTheme } from '@/utils'

const props = defineProps<{
  size?: number,
  theme?: ReturnType<typeof useTheme>
}>()

const theme = props.theme ? props.theme : useTheme()
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
  //width: 48px;
  //height: 48px;
  //border: 5px solid var(--accent-1);
  border-bottom-color: transparent !important;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  &.dark {
    border: 5px solid var(--accent-2);
  }

  &.light {
    border: 5px solid var(--accent-1);
  }
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
