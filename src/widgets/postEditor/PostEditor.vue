<script lang="ts" setup>
import { defineProps } from 'vue'
import { usePostEditor } from '@/utils'
import { Input, Textarea } from '@/ui'
import { FilesField, FilesList } from './components'
import { useFiles, useUploadPost } from './hooks'
import PostEditorLayout from './PostEditorLayout.vue'

const props = defineProps<{
  type: 'user' | 'project',
  id: number,
  img?: string
}>()

const {
  addFiles, removeFiles, getFiles
} = useFiles()

const {
  isOpen, openPostEditor, closePostEditor
} = usePostEditor()

const {
  setTitle, getTitle, description, uploadPost
} = useUploadPost({
  type: props.type,
  id: props.id,
  getFiles
})
</script>

<template>
  <post-editor-layout
    :visible="isOpen"
    @toggle="p => p ? openPostEditor() : closePostEditor()"
    :img="img"
  >
    <!-- <Input
      label-text="Что у вас случилось?"
      placeholder="Что у вас случилось?"
      :value="getTitle ?? ''"
      @update:value="setTitle"
    />
    <Textarea
      label-text="лмао боттом текст"
      placeholder="лмао боттом текст"
      v-model:value="description"
    />
    <files-field @upload="addFiles" />
    <files-list :files="getFiles" @remove="removeFiles" />
    <button @click="uploadPost">Опубликовать</button> -->

    <template #title>
      <Input
        label-text="Что у вас случилось?"
        placeholder="Что у вас случилось?"
        :value="getTitle ?? ''"
        @update:value="setTitle"
      />
    </template>

    <template #description>
      <Textarea
        label-text="лмао боттом текст"
        placeholder="лмао боттом текст"
        v-model:value="description"
      />
    </template>
  </post-editor-layout>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
