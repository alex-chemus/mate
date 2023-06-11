<script lang="ts" setup>
</script>

<template>
  <section class="widget-layout">
    <slot name="comment-form" />
    <slot name="comments" />
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.widget-layout {
  @include flex(flex-start, stretch, column);
  gap: 15px;
}
</style>
