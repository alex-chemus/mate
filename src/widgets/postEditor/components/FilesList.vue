<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { IFile } from '../types'
import FileCard from './FileCard.vue'

defineProps<{
  files: IFile[] | null
}>()

const emit = defineEmits<{
  (e: 'remove', payload: number[]): void
}>()
</script>

<template>
  <ul v-if="files && files.length" class="files-list">
    <li v-for="file in files" :key="file.id">
      <file-card :file="file" @remove="p => emit('remove', [p])" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.files-list {
  margin: 0;
  padding: 0;
  list-style: none;
  @include flex(flex-start, center);
  gap: 10px;
}
</style>
