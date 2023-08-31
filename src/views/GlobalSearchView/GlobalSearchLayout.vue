<script setup lang="ts">
</script>

<template>
  <section class="flex flex-col gap-[15px]">
    <slot name="search" />
    <slot name="filters" />
    <slot name="results-list" />
  </section>
</template>