<script lang="ts" setup>
import { defineProps } from 'vue'
//import { Loader } from '@/ui'

defineProps<{
  loading?: boolean,
  isOpen?: boolean
}>()
</script>

<template>
  <!-- <section v-if="loading" class="main-section --loading">
    <loader :size="100" />
  </section> -->

  <section class="main-section">
    <slot name="header" />

    <main class="main-container">
      <div class="filters-wrapper">
        <slot name="filters" />
      </div>

      <div v-if="!loading" class="cards-wrapper" :class="{ 'open': isOpen }">
        <slot name="cards" />
      </div>

      <slot v-if="isOpen" name="vacancy" />
    </main>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
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
  grid-template-columns: min-content 1fr;
  grid-template-columns: min-content;
  grid-gap: 40px 68px;
  //grid-auto-flow: column;
  margin-top: 40px;
  padding: 25px 38px 63px;

  background-color: var(--bg-color-1);
  border-radius: 13px;
  border: .5px solid color.change($gray-1, $alpha: .25);
  overflow: hidden;
}

.filters-wrapper {
  grid-column: 1 / span 2;
}

.cards-wrapper {
  @include flex(space-around, stretch);
  gap: 20px;
  grid-column: 1 / span 2;

  &.open {
    grid-column: 1 / span 1;
  }
}
</style>
