<script lang="ts" setup>
import { useTheme } from '@/shared/utils'
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
  // border: 1px solid rgba(118 118 118 / .5);
  border: var(--border-1);
  border-radius: 6px;
  background-color: transparent;
  transition: all .15s;
  background-color: var(--bg-color-3);

  font-family: var(--findcreek-medium, $findcreek-medium);
  font-size: 13px;
  letter-spacing: .2%;
  // color: var(--accent, $accent);
  @include findcreek-medium(14px, var(--heading-color-1));
  // box-shadow: var(--hover-element-shadow);

  &:is(:hover, :focus) {
    box-shadow: var(--hover-element-shadow);
  }

  // &.light:hover {
  //   box-shadow: 0 2px 6px 0 rgba(0 0 0 / .25);
  //   color: var(--accent);
  // }

  // &.dark:hover {
  //   box-shadow: 0 2px 12px 0 rgba(0 0 0 / .5);
  // }
}
</style>
