<script lang="ts" setup>
import { defineProps } from 'vue'
import { FileInfo } from '@/types'

defineProps<{
  images: FileInfo[]
}>()
</script>

<template>
  <div class="gallery">
    <img
      v-for="img in images" :key="img.fileID"
      :src="img.additionalData.urlToFile" :alt="img.fileName"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  grid-auto-rows: 1fr;
}

img {
  width: 100%;
  object-fit: cover;
  border-radius: 13px;
  height: 160px;
  border: 1px solid #c8c8c8;
}
</style>
