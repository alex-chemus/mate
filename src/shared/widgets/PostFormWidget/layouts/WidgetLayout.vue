<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { Modal, Droparea } from '@/shared/hocs'
import { FormPopup } from '../ui'

defineProps<{
  visible: boolean,
  img?: string
}>()

const emit = defineEmits<{
  (e: 'toggle', flag: boolean): void,
  (e: 'set-files', files: FileList): void
}>()
</script>

<template>
  <modal
    :visible="visible" @update:visible="payload => emit('toggle', payload)" width="800"
  >
    <droparea
      v-slot="{ over }"
      @set="files => emit('set-files', files)"
      :is-stretch="true"
      :is-click-disabled="true"
    >
      <section class="post-editor">
        <img v-if="img" :src="img" alt="" class="icon" />
        <div v-else class="icon" />

        <div class="content-container">
          <!-- <slot name="title" /> -->
          <slot name="description" />
          <!-- <slot name="file-input" /> -->
          <slot name="files" />
          <slot name="submit-button" />
        </div>

        <form-popup :visible="over" />
      </section>
    </droparea>
  </modal>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.post-editor {
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  grid-gap: 11px;
  grid-auto-flow: column;
  position: relative;
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
