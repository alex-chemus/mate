<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { FullProjectInfo } from '@/types'
import {
  Title, NameInput, DescriptionInput, ThemesSelect,
  Skills, BottomButton, FilesList
} from './components'
import {
  useUrlWatcher, useCreateVacancy, useThemes, useFiles
} from './hooks'
import VacancyEditorLayout from './VacancyEditorLayout.vue'

const props = defineProps<{
  fullProjectInfo: FullProjectInfo
}>()

const { isOpen, close } = useUrlWatcher()
const onUpdateVisible = (p: boolean) => {
  if (!p) close()
}

const { addFiles, removeFiles, getFiles } = useFiles()

const themes = useThemes()
const {
  name, description, themeID, skills, uploadingFile, createVacancy
} = useCreateVacancy({ getFiles, projectID: props.fullProjectInfo.id })

const hasFiles = computed(() => {
  return !!getFiles.value && getFiles.value.length > 0
})
</script>

<template>
  <vacancy-editor-layout
    :visible="isOpen"
    :has-files="hasFiles"
    @update:visible="onUpdateVisible"
    @upload="p => addFiles(p)"
  >
    <template #title>
      <Title :full-project-info="fullProjectInfo" />
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
        :uploading-file="uploadingFile"
        :files="getFiles"
        @remove="removeFiles"
      />
    </template>

    <template #buttons>
      <bottom-button @submit="createVacancy" />
    </template>
  </vacancy-editor-layout>
</template>
