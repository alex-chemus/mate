<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { Popover } from '@/shared/hocs'
import { useTheme } from '@/shared/utils'

defineProps<{
  popupOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-popup', payload: boolean): void,
  (e: 'input', payload: string): void,
}>()

const { theme } = useTheme()
</script>

<template>
  <popover
    :visible="popupOpen" @update:visible="p => emit('toggle-popup', p)"
    placement="bottom-right"
  >
    <template #button>
      <div class="search-wrapper" :class="theme">
        <button class="button">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-search" />
          </svg>
        </button>

        <!-- eslint-disable-next-line -->
        <input
          type="text"
          class="search-input"
          placeholder="Поиск"
          @input="p => emit('input', (p.target as HTMLInputElement).value)"
          @focus="emit('toggle-popup', true)"
        />
      </div>
    </template>

    <template #content>
      <slot />
    </template>
  </popover>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.search-wrapper {
  //color: var(--gray-1);
  border: 1px solid color.change($gray-1, $alpha: 0.25);
  border-radius: 10px;
  padding: 10px;
  height: 40px;
  @include flex(flex-start, stretch);
  background-color: var(--bg-color-1);
  color: var(--text-color-1);

  & > *:not(:last-child) {
    margin-right: 12px;
  }
}

.button {
  color: currentColor;
}

.search-input {
  @include findcreek(14px, currentColor);
  background-color: transparent;
  border: none;
  outline: none;
  flex-grow: 1;
  min-width: 0;
}

.separator {
  width: 1px;
  height: 100%;
  background-color: #d9d9d9;
}
</style>
