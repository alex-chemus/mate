<script lang="ts" setup>
import { defineProps } from 'vue'
import { Loader } from '@/ui'

defineProps<{
  type: 'loader' | 'not found'
}>()
</script>

<template>
  <div v-if="type === 'loader'" class="placeholder center">
    <loader />
  </div>

  <div v-else class="placeholder">
    <p>Ничего не найдено</p>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.placeholder {
  height: 100%;
  @include flex(center, center);
  @include findcreek-medium(16px, var(--heading-color-1));
  width: 100%;
}
</style>
