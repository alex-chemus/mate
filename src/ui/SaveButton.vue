<script lang="ts" setup>
import { defineEmits, ref, defineProps } from 'vue'
import { useTheme } from '@/utils'

const props = defineProps<{
  theme?: 'light' | 'dark'
}>()

const emit = defineEmits<{
  (e: 'click'): void,
}>()

//const { theme } = useTheme()
const theme = props.theme ? ref(props.theme) : useTheme().theme
</script>

<template>
  <button class="save-button" :class="theme" @click="emit('click')">
    Сохранить
  </button>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.save-button {
  height: 40px;
  width: 100%;
  @include flex(center, center);
  border-radius: 8px;
  background-color: var(--accent-1, $accent-1);
  color: var(--light, $light);
  font-family: var(--findcreek-bold, $findcreek-bold);
  font-weight: var(--bold, $bold);
  font-size: 16px;
  transition: var(--fast, $fast);

  &.light:hover,
  &.light:focus {
    box-shadow: 0 0 12px 0 color.change($accent-1, $alpha: .4);
  }

  &.dark:hover,
  &.dark:focus {
    box-shadow: 0 0 12px 0 color.change($accent-1, $alpha: .7);
  }
}
</style>
