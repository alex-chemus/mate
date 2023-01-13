<script lang="ts" setup>
import { RootState } from '@/store/types'
import { useTheme } from '@/utils';
import { useStore } from 'vuex'
import { themeActions } from '@/store/constants'

const { commit } = useStore<RootState>()
const theme = useTheme()

const switchTheme = (theme: 'light' | 'dark') => {
  localStorage.setItem('theme', theme)
  commit(themeActions.SET_THEME, theme)
}
</script>


<template>
  <button v-if="theme === 'light'" @click="switchTheme('dark')">
    <svg width="40" height="40" viewBox="0 0 40 40" :class="theme">
      <use href="@/assets/imgs/tabler-sprite.svg#tabler-sun" />
    </svg>
  </button>

  <button v-else @click="switchTheme('light')">
    <svg width="40" height="40" viewBox="0 0 40 40" :class="theme">
      <use href="@/assets/imgs/tabler-sprite.svg#tabler-moon" />
    </svg>
  </button>
</template>


<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

svg {
  color: var(--text-color, $text-color);
}
</style>
