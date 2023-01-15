<script lang="ts" setup>
import { useTheme } from '@/utils'
import { ref } from 'vue'

const { theme } = useTheme()
const hasNews = ref(false)
</script>

<template>
  <button
    class="bell-button" :class="[theme, { 'with-news': hasNews }]"
    @click="hasNews = !hasNews"
  >
    <svg width="30" height="30" viewBox="0 0 30 30">
      <use href="@/assets/imgs/tabler-sprite.svg#tabler-bell" />
    </svg>
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
