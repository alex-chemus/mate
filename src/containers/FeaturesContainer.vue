<script lang="ts" setup>
import { Alert, Settings, Header } from '@/features'
</script>

<template>
  <alert />
  <settings />
  <section class="main-section">
    <Header />
    <slot />
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.main-section {
  @include container;
  padding: 35px 0;

  @include flex(flex-start, stretch, column);
  gap: 25px;
  min-height: 100vh;
}
</style>
