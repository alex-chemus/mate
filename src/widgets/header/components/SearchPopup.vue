<script lang="ts" setup>
import {
  defineProps, defineEmits, ref
} from 'vue'
import { Loader } from '@/ui'
import { useTheme } from '@/utils'
import { SearchItem } from '../types'
import SearchPopupContent from './SearchPopupContent.vue'

defineProps<{
  searchItems?: SearchItem[]
}>()

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'toggle-filters'): void,
}>()

const { theme } = useTheme()

const selectedItem = ref<number | null>(null)
</script>

<template>
  <section class="search-popup" :class="theme">
    <div v-if="searchItems" class="popup-container">
      <header class="header">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-search" />
        </svg>
        <p>Поиск</p>
        <div class="line" />
        <button @click="emit('close')">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-x" />
          </svg>
        </button>
        <button @click="emit('toggle-filters')">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-adjustments-horizontal" />
          </svg>
        </button>
      </header>

      <ul class="search-results">
        <li
          v-for="item in searchItems" :key="item.id"
          class="search-item" :class="selectedItem === item.id ? 'selected' : ''"
        >
          <button @click="selectedItem = item.id">
            <img v-if="item.avatar" :src="item.avatar" alt="" class="item-avatar" />
            <div v-else class="item-avatar" />
            <p class="full-name">{{ item.fullName }}</p>
          </button>
        </li>
      </ul>

      <search-popup-content
        v-if="selectedItem"
        :content="(searchItems.find(item => item.id === selectedItem) as SearchItem)"
      />
    </div>

    <div v-else class="loader-wrapper">
      <loader />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.search-popup {
  border-radius: 10px;
  box-shadow: var(--popup-shadow);
  width: 550px;
  height: 340px;
  overflow: hidden;
  background-color: var(--bg-color-1);

  &.dark {
    border: 1px solid #615478;
  }
}

.loader-wrapper {
  padding: 15px 0;
  @include flex(center, center);
}

.popup-container {
  display: grid;
  grid-template-columns: 230px 1fr;
  grid-template-rows: min-content 1fr;
  height: 100%;
}

.header {
  height: 40px;
  padding: 0 15px;
  @include flex(flex-start, center);
  gap: 12px;
  color: var(--text-color-3);
  border-bottom: 1px solid color.change($gray-1, $alpha: .25);
  grid-column: 1 / span 2;

  p {
    font-family: var(--findcreek);
    font-size: 14px;
    margin-right: auto;
  }

  .line {
    width: 1px;
    height: 12px;
    background-color: #d9d9d9;
  }
}

.search-results {
  padding: 13px 8px;
  list-style: none;
  margin: 0;
  @include flex(flex-start, stretch, column);
  gap: 6px;
  border-right: 0.5px solid color.change($gray-1, $alpha: .25);
}

.search-item {
  border-radius: 5px;

  button {
    width: 100%;
    @include flex(flex-start, center);
    gap: 6px;
    padding: 5px;
    border-radius: 5px;
    transition: var(--fast);
  }

  &:hover,
  &.selected {
    background-color: var(--bg-color-3);
  }
}

.item-avatar {
  width: 18px;
  aspect-ratio: 1;
  border-radius: 100vmax;
  object-fit: cover;
  background-color: var(--gray-1);
}

.full-name {
  font-family: var(--findcreek);
  font-size: 11px;
  color: var(--heading-color-2)
}
</style>
