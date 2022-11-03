<script lang="ts" setup>
import { watch } from 'vue'
import { useStore } from 'vuex'
import { IState } from './store/types'

const { state } = useStore<IState>()

watch(() => state.theme, () => {
  const root = document.querySelector(':root') as HTMLElement
  root.dataset.theme = state.theme
})
</script>


<template>
  <router-view/>
</template>


<style lang="scss">
@import '@/styles/style.scss';

#app {
  min-height: 100vh;
}
</style>
