<script lang="ts" setup>
import { defineProps } from 'vue'
//import { Loader } from '@/shared/ui'

defineProps<{
  loading?: boolean,
  isOpen?: boolean
}>()
</script>

<template>

  <main class="main-section">
    <div class="filters-wrapper">
      <slot name="filters" />
    </div>

    <div class="cards-container" :class="{ 'open': isOpen }">
      <div v-if="!loading" class="cards-wrapper" :class="{ 'open': isOpen }">
        <slot name="cards" />
      </div>
    </div>

    <slot v-if="isOpen" name="vacancy" />

    <div class="pagination-wrapper">
      <slot name="pagination" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

// .main-section {
//   @include container;
//   padding: 50px 0;
//   min-height: 100vh;
//   @include flex(flex-start, stretch, column);
//   gap: 40px;

//   &.--loading {
//     @include flex(center, center);
//     height: 100vh;
//   }
// }

.main-section {
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: min-content 1fr;
  //grid-template-columns: min-content;
  grid-gap: 40px 68px;
  //grid-auto-flow: column;
  //margin-top: 40px;
  padding: 25px 38px 63px;
  flex-grow: 2;

  background-color: var(--bg-color-2);
  border-radius: 13px;
  // border: .5px solid color.change($gray-1, $alpha: .25);
  border: var(--border-2);
  overflow: hidden;
}

.filters-wrapper {
  grid-column: 1 / span 2;
}

.cards-container {
  grid-column: 1 / span 2;

  &.open {
    grid-column: 1 / span 1;
  }
}

.cards-wrapper {
  @include flex(space-between, stretch);
  //align-content: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  // height: 100%;
  padding: 0 100px;
  // grid-column: 1 / span 2;

  &.open {
    // grid-column: 1 / span 1;
    justify-content: flex-start;
    flex-direction: column;
    padding: 0;
  }
}

.pagination-wrapper {
  grid-column: 1 / span 2;
  align-self: end;
}
</style>
