<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps<{
  heading: string
}>()
</script>

<template>
  <h3 class="heading">{{ heading }}</h3>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.heading {
  @include findcreek-medium(14px, var(--heading-color-1));
}
</style>
