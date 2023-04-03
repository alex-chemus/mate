<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { usePostEditor } from '@/utils'
import { Input, Textarea } from '@/ui'
import { FilesList, SubmitButton } from './components'
import { useFiles, useUploadPost } from './hooks'
import PostEditorLayout from './PostEditorLayout.vue'

const props = defineProps<{
  type: 'user' | 'project',
  id?: number,
  img?: string
}>()

const emit = defineEmits<{
  (e: 'add'): void
}>()

const {
  addFiles, removeFiles, getFiles
} = useFiles()

const {
  isOpen, openPostEditor, closePostEditor
} = usePostEditor()

const {
  setTitle, getTitle, description, uploadPost, uploadingFile
} = useUploadPost({
  type: props.type,
  id: props.id,
  getFiles,
  onAdd: () => emit('add')
})
</script>

<template>
  <post-editor-layout
    :visible="isOpen"
    @toggle="p => p ? openPostEditor() : closePostEditor()"
    @upload="addFiles"
    :img="img"
  >
    <template #title>
      <Input
        label-text="Заголовок"
        placeholder="Заголовок"
        :value="getTitle ?? ''"
        @update:value="setTitle"
      />
    </template>

    <template #description>
      <Textarea
        label-text="Описание"
        placeholder="Описание"
        v-model:value="description"
      />
    </template>

    <template #files>
      <files-list
        :files="getFiles"
        @remove="removeFiles"
        :uploading-file="uploadingFile"
      />
    </template>

    <template #submit-button>
      <submit-button @click="uploadPost" />
    </template>
  </post-editor-layout>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
