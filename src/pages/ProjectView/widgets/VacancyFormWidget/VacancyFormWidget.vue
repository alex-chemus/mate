<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { FullProjectInfo } from '@/types'
import { WidgetLayout } from './layouts'
import {
  Title, NameInput, DescriptionInput, ThemesSelect,
  Skills, BottomButton, FilesList
} from './ui'
import {
  useUrlWatcher, useVacancy, useThemes, useFiles
} from './hooks'

const props = defineProps<{
  fullProject: FullProjectInfo
}>()

const { isOpen, close } = useUrlWatcher()
const onUpdateVisible = (p: boolean) => {
  if (!p) close()
}

const { addFiles, removeFiles, getFiles } = useFiles()

const themes = useThemes()
const {
  name, description, themeID, skills, isUploadingFile, uploadVacancy
} = useVacancy({ getFiles, projectID: props.fullProject.id })

const hasFiles = computed(() => {
  return !!getFiles.value && getFiles.value.length > 0
})
</script>

<template>
  <widget-layout
    :visible="isOpen"
    :has-files="hasFiles"
    @update:visible="onUpdateVisible"
    @set-files="addFiles"
  >
    <template #title>
      <Title :full-project="fullProject" />
    </template>

    <template #name-input>
      <name-input @input="p => name = p" />
    </template>

    <template #description-input>
      <description-input @input="p => description = p" />
    </template>

    <template #theme>
      <themes-select
        :themes="themes"
        @select="p => themeID = p"
      />
    </template>

    <template #skills>
      <Skills
        :skills="skills"
        @remove="s => skills = skills.filter((skill) => skill !== s)"
        @add="s => skills.push(s)"
      />
    </template>

    <template #files-list>
      <files-list
        :uploading-file="isUploadingFile"
        :files="getFiles"
        @remove="removeFiles"
      />
    </template>

    <template #buttons>
      <bottom-button @submit="uploadVacancy" />
    </template>
  </widget-layout>
</template>
