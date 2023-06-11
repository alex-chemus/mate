<script lang="ts" setup>
import { Header } from '@/widgets'
</script>

<template>
  <section class="main-section">
    <Header />
    <slot />
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.main-section {
  @include container;
  padding-top: 50px;

  @include flex(flex-start, stretch, column);
  gap: 40px;
  height: 100vh;
}
</style>
