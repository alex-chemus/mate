<script lang="ts" setup>
import { defineProps } from 'vue'
import { FileInfo } from '@/types'

defineProps<{
  files: FileInfo[]
}>()
</script>

<template>
  <div class="files">
    <a
      v-for="file in files" :key="file.fileID"
      :href="file.additionalData.urlToFile" class="file"
    >
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-file" />
      </svg>
      <p>{{ file.fileName }}</p>
    </a>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.files {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  grid-auto-rows: 1fr;
}

// img {
//   width: 100%;
//   object-fit: cover;
//   border-radius: 13px;
//   height: 160px;
//   border: 1px solid #c8c8c8;
// }

.file {
  border: 1px solid #c8c8c8;
  border-radius: 8px;
  @include flex(flex-start, center);
  gap: 10px;
  color: var(--text-color-1);
  height: 45px;
  padding: 0 15px;
  text-decoration: none;
  transition: var(--fast);

  svg {
    flex-shrink: 0;
  }

  p {
    text-align: left;
    @include findcreek(12px);
    letter-spacing: -0.03em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &:hover,
  &:focus {
    box-shadow: 0 0 4px currentColor;
  }
}
</style>

