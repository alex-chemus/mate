<script lang="ts" setup>
import { defineEmits, ref, defineProps } from 'vue'
import { useTheme } from '@/shared/utils'

const props = defineProps<{
  theme?: 'light' | 'dark',
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void,
}>()

//const { theme } = useTheme()
const theme = props.theme ? ref(props.theme) : useTheme().theme
</script>

<template>
  <button class="save-button" :class="theme" @click="emit('click')" :disabled="disabled">
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
  background-color: var(--light-accent, $accent);
  @include findcreek-medium(16px, white);
  // color: var(--light, $light);
  // font-family: var(--findcreek-medium, $findcreek-medium);
  // font-weight: var(--medium, $medium);
  // font-size: 16px;
  transition: var(--fast, $fast);

  &:is(:hover, :focus) {
    box-shadow: 0 2px 12px 0 var(--light-accent);
  }

  // &.light:hover,
  // &.light:focus {
  //   box-shadow: 0 0 12px 0 color.change($accent-1, $alpha: .4);
  // }

  // &.dark:hover,
  // &.dark:focus {
  //   box-shadow: 0 0 12px 0 color.change($accent-1, $alpha: .7);
  // }
}
</style>
