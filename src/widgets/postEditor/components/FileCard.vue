<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { IFile } from '../types'

defineProps<{
  file: IFile
}>()

const emit = defineEmits<{
  (e: 'remove', payload: number): void
}>()
</script>

<template>
  <div class="file-card">
    <button @click="emit('remove', file.id)">
      <svg width="16" height="16" viewBox="0 0 16 16">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-x" />
      </svg>
    </button>
    <span>{{ file.fileInfo.name }}</span>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.file-card {
  width: 75px;
  height: 75px;
  border-radius: 13px;
  border: 1px solid var(--accent);
}
</style>
