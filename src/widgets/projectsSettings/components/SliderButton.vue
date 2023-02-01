<script lang="ts" setup>
import { defineProps, defineEmits, onMounted } from 'vue'
import { useTheme } from '@/utils'

const props = defineProps<{
  selected?: boolean
}>()

onMounted(() => {
  console.log(props.selected)
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const { theme } = useTheme()
</script>

<template>
  <button class="slider-button" :class="[theme, { selected }]" @click="emit('click')">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.slider-button {
  height: 30px;
  padding: 0 18px;
  @include flex(center, center);
  border: 1px solid transparent;
  font-family: var(--findcreek-medium);
  font-size: 14px;
  letter-spacing: -0.03em;
  transition: var(--fast);

  &.light {
    color: #5c5c5c;
  }

  &.dark {
    color: #bbb;
  }

  &:hover,
  &.selected {
    border: 1px solid #DCE1E6;
    border-radius: 6px;
    box-shadow: 0 0 8px 0 rgb(0 0 0 / .1);
  }

  &.light:hover,
  &.light.selected {
    color: var(--accent-1);
  }

  &.dark:hover,
  &.dark.selected {
    color: var(--accent-2);
  }
}
</style>
