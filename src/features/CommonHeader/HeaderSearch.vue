<script lang="ts" setup>
import { useStore } from 'vuex'
import { IState } from '@/store/types'

const { state } = useStore<IState>()
</script>

<template>
  <div class="search-wrapper" :class="state.theme">
    <button class="button">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <use href="@/assets/tabler-sprite.svg#tabler-search" />
      </svg>
    </button>

    <!-- eslint-disable-next-line -->
    <input type="text" class="search-input" placeholder="Поиск" />

    <div class="separator" />

    <button class="button">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <use href="@/assets/tabler-sprite.svg#tabler-x" />
      </svg>
    </button>

    <button class="button">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <use href="@/assets/tabler-sprite.svg#tabler-adjustments-horizontal" />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/styles/style.scss';

.search-wrapper {
  color: var(--gray-1);
  border: 1px solid color.change($gray-1, $alpha: 0.25);
  border-radius: 10px;
  padding: 10px;
  @include flex(flex-start, stretch);

  &.light {
    background-color: var(--light);
  }

  &.dark {
    background-color: var(--dark-theme-color-2);
  }

  & > *:not(:last-child) {
    margin-right: 12px;
  }
}

.button {
  color: currentColor;
}

.search-input {
  font-family: var(--ff-ubuntu);
  font-size: 16px;
  color: currentColor;
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
