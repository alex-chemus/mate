<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useTheme } from '@/shared/utils'

const props = defineProps<{
  value: string,
  isSelected?: boolean,
  theme?: 'light' | 'dark',
  width?: 'fit-content' | 'max'
}>()

const emit = defineEmits<{
  (e: 'select', payload: boolean): void
}>()

const theme = props.theme
  ? ref(props.theme)
  : useTheme().theme
</script>

<template>
  <button
    class="checkbox-button" :class="[isSelected ? 'selected' : '', theme]"
    @click="emit('select', !isSelected)"
    :style="`width: ${width === 'fit-content' ? 'fit-content' : ''}`"
  >
    <div class="checkbox" :class="[isSelected ? 'selected' : '', theme]">
      <svg v-if="isSelected" width="16" height="16" viewBox="0 0 16 16">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-check" />
      </svg>
    </div>
    {{ value }}
  </button>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.checkbox-button {
  // width: 100%;
  // height: 40px;
  //padding: 0 40px;
  @include flex(flex-start, center);
  gap: 8px;
  //border-radius: 8px;
  transition: var(--fast, $fast);
  position: relative;
  font-family: var(--findcreek, $findcreek);
  font-size: 13px;
  background-color: transparent;
  color: var(--heading-color-2, $heading-color-2);
  //background-color: var(--bg-color-2, $bg-color-2);
  //border: var(--border-1, $border-1);

  // &:focus {
  //   outline: none;
  // }

  &:hover,
  &.focused {
    //border: 1px solid var(--accent, $accent);
  }

  // &::before {
  //   content: '';
  //   display: block;
  //   position: absolute;
  //   top: 50%;
  //   transform: translateY(-50%);
  //   left: 13px;
  //   width: 16px;
  //   aspect-ratio: 1;
  //   border-radius: 2px;
  // }

  // &.light::before {
  //   border: 2px solid color.change($gray-1, $alpha: .7);
  // }

  // &.dark::before {
  //   border: 2px solid #bbb;
  // }
}

.checkbox {
  height: 16px;
  width: 16px;
  box-sizing: content-box;
  border-radius: 5px;
  transition: var(--fast);

  &.light {
    border: 1.5px solid color.change($gray-1, $alpha: .7);
  }

  &.dark {
    border: 1.5px solid #bbb;
  }

  svg {
    pointer-events: none;
  }
}

.checkbox-button:hover .checkbox,
.checkbox-button.focused .checkbox {
  border-color: var(--accent);
}

.checkbox-button.selected {
  color: var(--accent, $accent);

  // &::before {
  //   border-color: currentColor;
  // }

  // &::after {
  //   content: '';
  //   display: block;
  //   height: 16px;
  //   aspect-ratio: 1;
  //   //background-color: currentColor;
  //   background-image: url('@/assets/imgs/tabler-sprite.svg#tabler-check');
  //   position: absolute;
  //   top: 50%;
  //   transform: translateY(-50%);
  //   left: 18px;
  //   //border-radius: 100vmax;
  // }
}
</style>
