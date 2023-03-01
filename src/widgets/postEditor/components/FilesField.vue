<script lang="ts" setup>
import { defineEmits } from 'vue'
import { Droparea } from '@/hocs'

const emit = defineEmits<{
  (e: 'upload', payload: FileList): void
}>()
</script>

<template>
  <droparea
    :stretch="true"
    @upload="(e: FileList) => emit('upload', e)"
  >
    <div class="cover"></div>
  </droparea>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.cover {
  height: 100px;
  width: 100%;
  border-radius: 13px;
  background-color: var(--accent);
}
</style>
