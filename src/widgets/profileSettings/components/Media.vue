<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'add', payload: string): void,
  (e: 'edit', payload: { id: number, url: string }): void
}>()
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
