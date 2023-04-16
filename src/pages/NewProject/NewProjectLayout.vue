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

</style>
