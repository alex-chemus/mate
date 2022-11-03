<script lang="ts" setup>
import { IState } from '@/store/types'
import { useStore } from 'vuex'

const { state, commit } = useStore<IState>();

const switchTheme = (theme: 'light' | 'dark') => {
  localStorage.setItem('theme', theme)
  commit('setTheme', theme)
}
</script>


<template>
  <button v-if="state.theme === 'light'" @click="switchTheme('dark')">
    <svg width="40" height="40" viewBox="0 0 40 40" :class="state.theme">
      <use href="@/assets/tabler-sprite.svg#tabler-sun" />
    </svg>
  </button>

  <button v-else @click="switchTheme('light')">
    <svg width="40" height="40" viewBox="0 0 40 40" :class="state.theme">
      <use href="@/assets/tabler-sprite.svg#tabler-moon" />
    </svg>
  </button>
</template>


<style lang="scss" scoped>
@import '@/styles/style.scss';

svg {
  color: var(--text-color);
}
</style>
