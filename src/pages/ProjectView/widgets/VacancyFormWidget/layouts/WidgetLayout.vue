<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { Modal, ModalLayout, Droparea } from '@/hocs'

defineProps<{
  visible: boolean,
  hasFiles: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', payload: boolean): void,
  (e: 'set-files', payload: FileList): void
}>()
</script>

<template>
  <modal
    :visible="visible"
    @update:visible="p => emit('update:visible', p)"
    :width="710"
  >
    <modal-layout @close="emit('update:visible', false)">
      <droparea
        @set="files => emit('set-files', files)"
        :is-stretch="true"
        :is-click-disabled="true"
      >
        <section class="modal-container">
          <div class="title-wrapper">
            <slot name="title" />
          </div>

          <div class="name-wrapper">
            <slot name="name-input" />
          </div>

          <div class="description-input-wrapper">
            <slot name="description-input" />
          </div>

          <div class="select-container">
            <slot name="theme" />
            <slot name="skills" />
          </div>

          <div class="files-container" :class="hasFiles ? 'margin' : ''">
            <slot name="files-list" />
          </div>

          <div class="buttons-container">
            <slot name="buttons" />
          </div>
        </section>
      </droparea>
    </modal-layout>
  </modal>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.modal-container {
  @include flex(flex-start, stretch, column);
}

.title-wrapper {
  margin-bottom: 36px;
}

.name-wrapper {
  margin-bottom: 30px;
}

.description-input-wrapper {
  margin-bottom: auto;
}

.select-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

.buttons-container,
.files-container.margin {
  margin-top: 28px;
}
</style>
