<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'

defineProps<{
  multiple?: boolean
}>()

const emit = defineEmits<{
  (e: 'upload', payload: FileList): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isDragover = ref(false)

const upload = (e: DragEvent | Event) => {
  if (e instanceof DragEvent) {
    if (e.dataTransfer?.files.length) {
      emit('upload', e.dataTransfer.files)
      console.log(e.dataTransfer.files)
    }
  } else if (inputRef.value?.files?.length) {
    emit('upload', inputRef.value.files)
    console.log(inputRef.value.files)
  }
}
</script>

<template>
  <!-- eslint-disable -->
  <div class="droparea"
    @click="inputRef?.click()"
    @dragover.prevent="isDragover = true"
    @dragleave="isDragover = false"
    @dragend="isDragover = false"
    @drop.prevent="upload"
  >
    <input
      ref="inputRef"
      type="file"
      name="file"
      class="input"
      @change="upload"
    />

    <slot :over="isDragover" />
  </div>
  <!-- eslint-enable -->
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.droparea {
  width: fit-content;
  cursor: pointer;
}

.input {
  display: none;
}
</style>
