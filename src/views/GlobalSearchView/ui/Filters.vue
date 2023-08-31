<script setup lang="tsx">
import { defineProps, defineEmits } from 'vue'
import { Checkbox } from '@/shared/ui'
import { SearchFilters } from '@/features/Header/types'

defineProps<{
  filters: SearchFilters[]
}>()

const emit = defineEmits<{
  (e: 'toggle-filters', filter: SearchFilters): void
}>()
</script>

<template>
  <div class="flex items-center gap-[12px]">
    <checkbox
      value="Проекты" 
      :is-selected="filters.includes('projects')"
      width="fit-content"
      @select="emit('toggle-filters', 'projects')"
    />
    <checkbox
      value="Люди"
      :is-selected="filters.includes('users')"
      @select="emit('toggle-filters', 'users')"
    />
  </div>
</template>