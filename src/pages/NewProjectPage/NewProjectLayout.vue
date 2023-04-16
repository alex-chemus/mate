<script lang="ts" setup>
import { defineProps } from 'vue'
import { Loader } from '@/ui'

defineProps<{
  loading?: boolean,
  currentPage: 1 | 2 | 3,
}>()
</script>

<template>
  <section v-if="loading" class="main-section --loading">
    <loader :size="100" />
  </section>

  <section v-else class="main-section">
    <slot name="header" />

    <main class="main-container">
      <div class="content-wrapper">
        <slot name="content" />
      </div>
      <slot name="pagination" />

      <div class="button-wrapper" :class="currentPage > 1 ? 'grid' : ''">
        <slot name="buttons" />
      </div>
    </main>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.main-section {
  @include container;
  padding-top: 50px;
  @include flex(flex-start, stretch, column);
  height: 100vh;

  &.--loading {
    @include flex(center, center);
    height: 100vh;
  }
}

.main-container {
  margin: 40px 0 100px;
  flex-grow: 1;
  background-color: var(--bg-color-1);
  border-radius: 13px;
  padding: 60px 130px;
  max-width: 900px;
  width: 100%;
  overflow: hidden;
  align-self: center;
  @include flex(flex-start, center, column);
  gap: 30px;
}

.content-wrapper {
  margin-bottom: auto;
}

.button-wrapper {
  @include flex(stretch, center);
  align-self: stretch;
  gap: 28px;

  &.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 28px;
  }
}
</style>
