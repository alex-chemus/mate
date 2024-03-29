<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useDebounce } from '@/shared/utils'

const props = defineProps<{
  isMultiple?: boolean,
  isStretch?: boolean,
  isClickDisabled?: boolean,
  isImages?: boolean
}>()

const emit = defineEmits<{
  (e: 'set', files: FileList): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isDragover = ref(false)

const setDragover = (event: DragEvent) => {
  if (event.dataTransfer && event.dataTransfer.types.includes('Files'))
    isDragover.value = true
}

const { debounced: removeDragover } = useDebounce(() => {
  isDragover.value = false
}, 100)

const upload = (e: DragEvent | Event) => {
  if (e instanceof DragEvent) {
    if (e.dataTransfer?.files.length) {
      emit('set', e.dataTransfer.files)
      removeDragover()
    }
  } else if (inputRef.value?.files?.length) {
    emit('set', inputRef.value.files)
    removeDragover()
  }
}

const onClick = () => {
  if (!props.isClickDisabled) inputRef.value?.click()
}
</script>

<template>
  <!-- eslint-disable -->
  <div class="droparea"
    @click="onClick"
    @dragover.prevent="setDragover"
    @dragleave="removeDragover"

    @dragend="removeDragover"
    @drop.prevent="upload"
    :style="[
      isStretch ? 'width: 100%;' : '',
      isClickDisabled ? '' : 'cursor: pointer;'
    ]"
  >
    <input
      ref="inputRef"
      type="file"
      name="file"
      class="input"
      accept=".jpg, .jpeg, .png, .gif"
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
