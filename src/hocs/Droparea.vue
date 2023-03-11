<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useDebounce } from '@/utils'

const props = defineProps<{
  multiple?: boolean,
  stretch?: boolean,
  disableClick?: boolean
}>()

const emit = defineEmits<{
  (e: 'upload', payload: FileList): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isDragover = ref(false)

const { debounced: removeDragover } = useDebounce(() => {
  isDragover.value = false
}, 100)

const upload = (e: DragEvent | Event) => {
  if (e instanceof DragEvent) {
    if (e.dataTransfer?.files.length) {
      emit('upload', e.dataTransfer.files)
      removeDragover()
    }
  } else if (inputRef.value?.files?.length) {
    emit('upload', inputRef.value.files)
    removeDragover()
  }
}

const onClick = () => {
  if (!props.disableClick) inputRef.value?.click()
}
</script>

<template>
  <!-- eslint-disable -->
  <div class="droparea"
    @click="onClick"
    @dragover.prevent="isDragover = true"
    @dragleave="removeDragover"

    @dragend="removeDragover"
    @drop.prevent="upload"
    :style="[
      stretch ? 'width: 100%;' : '',
      disableClick ? '' : 'cursor: pointer;'
    ]"
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
  //cursor: pointer;
}

.input {
  display: none;
}
</style>
