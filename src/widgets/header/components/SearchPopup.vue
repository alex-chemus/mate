<script lang="ts" setup>
import {
  defineProps, defineEmits, ref
} from 'vue'
import { Loader, Checkbox } from '@/ui'
import { useTheme } from '@/utils'
import { KeyedSearchItem, SearchFilters } from '../types'
import SearchPopupContent from './SearchPopupContent.vue'
import { useTypeChecks } from '../hooks'

defineProps<{
  searchItems?: KeyedSearchItem[],
  loading?: boolean,
  filters: SearchFilters[],
  userId: number | null
}>()

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'toggle-filters', payload: SearchFilters): void,
  (e: 'subscribe', payload: KeyedSearchItem): void,
  (e: 'unsubscribe', payload: KeyedSearchItem): void,
}>()

const { isProject } = useTypeChecks()
const { theme } = useTheme()

const selectedItem = ref<number | null>(null)
</script>

<template>
  <section v-if="searchItems && searchItems.length" class="search-popup" :class="theme">
    <div class="popup-container">
      <header class="header">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-adjustments-horizontal" />
        </svg>
        <checkbox
          value="Проекты"
          :selected="filters.includes('projects')"
          @select="emit('toggle-filters', 'projects')"
          width="fit-content"
        />
        <checkbox
          value="Люди"
          :selected="filters.includes('users')"
          @select="emit('toggle-filters', 'users')"
          width="fit-content"
        />
        <!-- <svg width="20" height="20" viewBox="0 0 20 20">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-search" />
        </svg>
        <p>Поиск</p>
        <div class="line" />-->
        <button class="close-button" @click="emit('close')">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-x" />
          </svg>
        </button>
        <!-- <button @click="emit('toggle-filters')">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-adjustments-horizontal" />
          </svg>
        </button> -->
      </header>

      <ul class="search-results">
        <li
          v-for="item in searchItems" :key="item.searchID"
          class="search-item" :class="selectedItem === item.searchID ? 'selected' : ''"
        >
          <button @click="selectedItem = item.searchID">
            <img
              v-if="item.avatar"
              :src="item.avatar.avatarCompressed || item.avatar.avatar" alt=""
              class="item-avatar"
            />
            <div v-else class="item-avatar" />
            <p class="full-name">{{ isProject(item) ? item.name : `${item.firstName} ${item.lastName}` }}</p>
          </button>
        </li>
      </ul>

      <search-popup-content
        v-if="selectedItem !== null"
        :content="(searchItems.find(item => item.searchID === selectedItem) as KeyedSearchItem)"
        :user-id="userId"
        @subscribe="p => emit('subscribe', p)"
        @unsubscribe="p => emit('unsubscribe', p)"
      />
    </div>
  </section>

  <div v-else-if="loading" class="loader-wrapper" :class="theme">
    <loader />
  </div>
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
  width: 550px;
  background-color: var(--bg-color-1);
  box-shadow: var(--popup-shadow);
  border-radius: 10px;

  &.dark {
    border: 1px solid #615478;
  }
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

.close-button {
  margin-left: auto;
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
