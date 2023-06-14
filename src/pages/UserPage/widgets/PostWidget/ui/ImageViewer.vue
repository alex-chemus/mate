<script lang="ts" setup>
import {
  defineProps, defineEmits, ref, watch, onMounted, onBeforeUnmount
} from 'vue'
import { Modal } from '@/hocs'

const props = defineProps<{
  src: string | null,
  i: number | null
}>()

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'next'): void,
  (e: 'prev'): void
}>()

const isOpen = ref(false)
watch(
  () => props.src,
  () => {
    isOpen.value = props.src !== null
  }
)

const onUpdate = (p: boolean) => {
  isOpen.value = p
  if (!p) emit('close')
}

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') emit('prev')
  if (e.key === 'ArrowRight') emit('next')
}

onMounted(() => {
  document.addEventListener('keyup', onKey)
})

onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKey)
})
</script>

<template>
  <modal :visible="isOpen" @update:visible="onUpdate">
    <div class="image-wrapper">
      <img v-if="src" :src="src" alt="" class="image" />
    </div>
  </modal>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.image-wrapper {
  @include flex(center, center);
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
}

.image {
  min-height: 0;
  min-width: 0;
  max-width: 90vw;
  max-height: 90vh;
}
</style>
