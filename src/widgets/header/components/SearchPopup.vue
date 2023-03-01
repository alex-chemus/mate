<script lang="ts" setup>
import {
  defineProps, defineEmits, ref, computed
} from 'vue'
import { Loader, Checkbox } from '@/ui'
import { useTheme } from '@/utils'
import { KeyedSearchItem, SearchFilters } from '../types'
import SearchPopupContent from './SearchPopupContent.vue'
import { useTypeChecks } from '../hooks'

const props = defineProps<{
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
const notFound = computed(() => props.searchItems && props.searchItems.length === 0)
</script>

<template>
  <section v-if="searchItems" class="search-popup" :class="theme">
    <div class="popup-container" :class="{ 'not-found': notFound }">
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
        <button class="close-button" @click="emit('close')">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-x" />
          </svg>
        </button>
      </header>

      <template v-if="searchItems.length">
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
      </template>

      <div v-else class="nothing-found">Уфф.. Ничего не найдено</div>
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

  &.not-found {
    grid-template-columns: 1fr;
  }
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

.nothing-found {
  font-family: var(--findcreek);
  font-size: 15px;
  letter-spacing: -0.01em;
  color: var(--heading-color-1);
  @include flex(center, center);
}
</style>
