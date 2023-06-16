<script lang="ts" setup>
import { defineProps } from 'vue'
import { Loader } from '@/ui'

defineProps<{
  loading?: boolean,
  currentPage: 1 | 2 | 3,
}>()
</script>

<template>
  <section v-if="loading" class="loader">
    <loader :size="100" />
  </section>

  <main v-else class="main-section">
    <div class="content-wrapper">
      <slot name="content" />
    </div>
    <slot name="pagination" />

    <div class="button-wrapper" :class="currentPage > 1 ? 'grid' : ''">
      <slot name="buttons" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.loader {
  @include flex(center, center);
}

.main-section {
  margin: 40px auto 100px;
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
