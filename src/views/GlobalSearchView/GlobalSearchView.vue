<script setup lang="tsx">
import { ref } from 'vue'
import { Input } from '@/shared/ui'
import { ResultsList, Filters } from './ui'
import GlobalSearchLayout from './GlobalSearchLayout.vue'
import useGlobalSearch from '@/features/Header/hooks/useGlobalSearch'

const refresher = ref<symbol>(Symbol())
const { onSearch, getSearchItems, toggleFilters, isLoading, filters } = useGlobalSearch({ update: refresher })
</script>

<template>
  <global-search-layout>
    <template #search>
      <Input placeholder="Глобальный поиск" @update:value="onSearch" />
    </template>

    <template #filters>
      <Filters :filters="filters" @toggle-filters="toggleFilters" />
    </template>

    <template #results-list>
      <results-list :search-items="getSearchItems" :is-loading="isLoading" />
    </template>
  </global-search-layout>
</template>