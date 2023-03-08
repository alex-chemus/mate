<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { useTheme } from '@/utils'
import { Input } from '@/ui'
import { Theme } from '../types'

defineProps<{
  selectedTheme: Theme | null,
  themes: Theme[] | null,
}>()

const emit = defineEmits<{
  (e: 'select-theme', payload: Theme): void,
  (e: 'input', payload: string): void
}>()

const { theme } = useTheme()
</script>

<template>
  <section class="filters-section">
    <ul v-if="themes" class="themes-list">
      <li v-for="theme in themes" :key="theme.id">
        <button class="filter-button" :class="[
          theme, selectedTheme?.id === theme.id ? 'selected' : ''
        ]" @click="emit('select-theme', theme)">
          {{ theme.title }}
        </button>
      </li>
    </ul>

    <div class="input-wrapper">
      <Input
        placeholder="Поиск проектов..."
        @update:value="p => emit('input', p)"
      >
        <template #after>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-search" />
          </svg>
        </template>
      </Input>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.filters-section {
  @include flex(space-between, center);
}

.themes-list {
  @include flex(flex-start, center);
  gap: 13px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.filter-button {
  font-family: var(--findcreek-medium);
  font-size: 14px;
  letter-spacing: -0.03em;
  color: var(--text-color-1);
  height: 30px;
  padding: 0 18px;
  border-radius: 6px;
  background-color: var(--bg-color-1);

  &.selected {
    color: var(--accent);
    //border: 1px solid var(--border-1);
    border: var(--border-2);
    box-shadow: 0 0 8px 0 rgb(0 0 0 / .1);
  }
}

.input-wrapper {
  width: 430px;
}
</style>
