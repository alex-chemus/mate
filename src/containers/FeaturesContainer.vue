<script lang="ts" setup>
import {
  Alert, Settings, Header, MobileNavbar
} from '@/features'
</script>

<template>
  <alert />
  <settings />
  <mobile-navbar />
  <section class="main-section">
    <Header />
    <slot />
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.main-section {
  @include container;
  padding: 15px 0 30px;
  @include flex(flex-start, stretch, column);
  gap: 15px;
  min-height: 100vh;

  @include xl {
    padding-inline: 15px;
  }

  @include sm {
    padding-inline: 5px;
  }
}
</style>
