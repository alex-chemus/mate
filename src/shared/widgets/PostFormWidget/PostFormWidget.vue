<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { usePostEditor } from '@/shared/utils'
import { Textarea } from '@/shared/ui'
import { WidgetLayout } from './layouts'
import { FilesList, SubmitButton, TitleInput } from './ui'
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

const submitPost = async () => {
  await uploadPost()
  setTitle('')
  description.value = ''
  closePostEditor()
}
</script>

<template>
  <widget-layout
    :visible="isOpen"
    @toggle="p => p ? openPostEditor() : closePostEditor()"
    @set-files="addFiles"
    :img="img"
  >
    <template #title>
      <title-input
        :get-title="getTitle"
        :set-title="setTitle"
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
      <submit-button @click="submitPost" />
    </template>
  </widget-layout>
</template>
