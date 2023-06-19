<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { useTheme } from '@/utils'
import { Tab } from '../types'

defineProps<{
  currentTab: Tab
}>()

const emit = defineEmits<{
  (e: 'switch', tab: Tab): void
}>()

const { theme } = useTheme()
</script>

<template>
  <div class="tabs-wrapper" :class="theme">
    <button class="tab"
      :class="currentTab === 'profile' ? 'current' : ''"
      @click="emit('switch', 'profile')"
    >
      <svg width="28" height="28" viewBox="0 0 30 30">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-user-circle" />
      </svg>
    </button>

    <button class="tab"
      :class="currentTab === 'vacancies' ? 'current' : ''"
      @click="emit('switch', 'vacancies')"
    >
      <svg width="28" height="28" viewBox="0 0 30 30">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-list-search" />
      </svg>
    </button>

    <button class="tab"
      :class="currentTab === 'projects' ? 'current' : ''"
      @click="emit('switch', 'projects')"
    >
      <svg width="28" height="28" viewBox="0 0 30 30">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-briefcase" />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.tabs-wrapper {
  height: 40px;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 76px;
  border: 1px solid color.change($gray-1, $alpha: .25);
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--bg-color-1);

  &.light {
    color: #4C4F56;
  }

  &.dark {
    color: var(--gray-3);
  }
}

.tab {
  color: currentColor;
  position: relative;
  transition: var(--fast);

  &:hover,
  &.current {
    color: var(--accent);
  }

  // &.current:after {
  //   content: '';
  //   display: block;
  //   width: 100%;
  //   height: 1px;
  //   position: absolute;
  //   left: 0;
  //   bottom: 0;
  //   background-color: var(--accent);
  // }
}
</style>
