<script lang="ts" setup>
import { ref } from 'vue'
import { useTheme } from '@/utils'

const { theme } = useTheme()

type TabName = 'profile' | 'feed'

const currentTabName = ref<TabName>('profile')

const isCurrent = (tabName: TabName) =>
  tabName === currentTabName.value ? 'current' : ''
</script>

<template>
  <div class="tabs-wrapper" :class="theme">
    <button class="tab"
      :class="isCurrent('profile')"
      @click="currentTabName = 'profile'"
    >
      <svg width="30" height="30" viewBox="0 0 30 30">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-user-circle" />
      </svg>
    </button>

    <button class="tab"
      :class="isCurrent('feed')"
      @click="currentTabName = 'feed'"
    >
      <svg width="30" height="30" viewBox="0 0 30 30">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-list-search" />
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

  &.light {
    background-color: var(--light);
    color: #4C4F56;
  }

  &.dark {
    background-color: var(--dark-theme-color-2);
    color: var(--gray-3);
  }
}

.tab {
  color: currentColor;

  &.current {
    color: var(--local-text-color);
    background-color: var(--local-bg-color);
  }
}

.tabs-wrapper {
  &.dark .tab.current {
    color: var(--light);
    background-color: #788AB2;
  }

  &.light .tab.current {
    color: var(--accent-1);
    background-color: color.change($accent-1, $alpha: .15);
  }
}
</style>
