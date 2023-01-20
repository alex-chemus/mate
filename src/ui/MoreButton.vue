<script lang="ts" setup>
import { useTheme } from '@/utils'
import { defineEmits, defineProps, ref } from 'vue'

const props = defineProps<{
  theme?: 'light' | 'dark'
}>()

const theme = props.theme ? ref(props.theme) : useTheme().theme

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button class="more-button" :class="theme" @click="emit('click')">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.more-button {
  height: 30px;
  width: 100%;
  @include flex(center, center);
  border: 1px solid rgba(118 118 118 / .5);
  border-radius: 6px;
  background-color: transparent;
  transition: all .15s;

  font-family: var(--findcreek, $findcreek);
  font-size: 13px;
  font-weight: var(--medium, $medium);
  letter-spacing: .2%;

  &.light {
    color: var(--accent-1, $accent-1);
  }

  &.dark {
    color: var(--accent-2, $accent-2);
  }

  &.light:hover {
    box-shadow: 0 0 5px 0 rgba(0 0 0 / .25);
  }

  &.dark:hover {
    box-shadow: 0 0 10px 0 rgba(0 0 0 / .5);
  }
}
</style>
