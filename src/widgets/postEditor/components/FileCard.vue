<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'
import { Loader } from '@/ui'
import { IFile } from '../types'

const props = defineProps<{
  file: IFile,
  uploading?: boolean
}>()

const emit = defineEmits<{
  (e: 'remove', payload: number): void
}>()

const getSrc = computed(() => {
  if (props.file.fileInfo.type.startsWith('image'))
    return URL.createObjectURL(props.file.fileInfo)
  return null
})
</script>

<template>
  <div class="file-card">
    <div class="image-wrapper">
      <img
        v-if="getSrc"
        :src="getSrc" :alt="file.fileInfo.name"
        class="image"
      />
      <svg v-else width="36" height="36" viewBox="0 0 36 36">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-file" />
      </svg>
    </div>

    <p class="file-name">{{ file.fileInfo.name }}</p>

    <div v-if="uploading" class="loader">
      <loader :size="27" :border-width="3" />
    </div>

    <button v-else class="remove-button" @click="emit('remove', file.id)">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-x" />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.file-card {
  width: 425px;
  height: 70px;
  border-radius: 11px;
  border: var(--border-2);
  padding: 10px;
  @include flex(flex-start, center);
}

.image-wrapper {
  height: 50px;
  width: 70px;
  @include flex(center, center);
  color: var(--text-color-2);
  margin-right: 10px;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
  border: var(--border-2);
}

.file-name {
  font-family: var(--findcreek-medium);
  font-size: 14px;
  letter-spacing: -0.01em;
  color: var(--heading-color-2);
}

.remove-button {
  background-color: var(--bg-color-3);
  height: 32px;
  aspect-ratio: 1;
  border-radius: 100vmax;
  @include flex(center, center);
  margin-left: auto;
}

.loader {
  margin-left: auto;
  @include flex(center, center);
}
</style>
