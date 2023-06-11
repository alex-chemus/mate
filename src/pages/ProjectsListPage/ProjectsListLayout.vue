<script lang="ts" setup>
import { defineProps } from 'vue'
import { Loader } from '@/ui'

defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <section v-if="loading" class="main-section --loading">
    <loader :size="100" />
  </section>

  <section v-else class="main-section">
    <slot name="header" />

    <main class="main-container">
      <slot name="new-project" />
      <slot name="projects" />
    </main>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.main-section {
  @include container;
  padding-top: 50px;

  &.--loading {
    @include flex(center, center);
    height: 100vh;
  }
}

.main-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-columns: 1fr;
  grid-gap: 40px;
  margin-top: 40px;
}
</style>
