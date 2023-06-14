<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { usePostEditor } from '@/utils'
import { Input, Textarea } from '@/ui'
import { WidgetLayout } from './layouts'
import { FilesList, SubmitButton } from './ui'
import { useFiles, useUploadPost } from './hooks'

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
  <widget-layout
    :visible="isOpen"
    @toggle="p => p ? openPostEditor() : closePostEditor()"
    @set-files="addFiles"
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
  </widget-layout>
</template>
