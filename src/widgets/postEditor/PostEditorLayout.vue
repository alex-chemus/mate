<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { Modal } from 'ant-design-vue'
import { ModalLayout } from '@/hocs'

defineProps<{
  visible: boolean,
  img?: string
}>()

const emit = defineEmits<{
  (e: 'toggle', payload: boolean): void
}>()
</script>

<template>
  <modal
    :visible="visible" @update:visible="payload => emit('toggle', payload)"
    centered width="1000px"
    wrap-class-name="post-editor-modal"
  >
    <modal-layout @close="emit('toggle', false)">
      <section class="post-editor">
        <img v-if="img" :src="img" alt="" class="icon" />
        <div v-else class="icon" />

        <div class="content-container">
          <slot name="title" />
          <slot name="description" />
        </div>
      </section>
    </modal-layout>
  </modal>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.post-editor {
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  grid-gap: 11px;
  grid-auto-flow: column;
}

.icon {
  width: 30px;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 100vmax;
  background-color: var(--gray-1);
}

.content-container {
  @include flex(flex-start, stretch, column);
  gap: 17px;
}
</style>
