<script lang="ts" setup>
import { defineProps } from 'vue'
import { Loader } from '@/shared/ui'

defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <section v-if="loading" class="loader">
    <loader :size="100" />
  </section>

  <main v-else class="main-section">
    <slot name="add-project-button" />
    <slot name="projects" />
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.loader {
  @include flex(center, center);
  height: 100vh;
}

// .main-section {
//   @include container;
//   padding-top: 50px;

//   &.--loading {
//     @include flex(center, center);
//     height: 100vh;
//   }
// }

.main-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-columns: 1fr;
  grid-gap: 40px;
}
</style>
