<script lang="ts" setup>
import { computed } from 'vue'
import { useUserState } from '@/shared/utils'
import { useProjects, useAuthors } from './hooks'
import { ProjectCard, AddProjectButton } from './ui'
import { ProjectsListLayout } from './layouts'

const userState = useUserState()

const projects = useProjects()
const authorsInfo = useAuthors({ projects })

const getCreatedProjectsCount = computed(() => {
  if (projects.value === null || projects.value.length === 0) return 0
  return projects.value
    .filter(project => project.founderID === userState.value.id).length
})
</script>

<template>
  <projects-list-layout>
    <template #projects v-if="projects && authorsInfo">
      <project-card
        v-for="projectInfo in projects" :key="projectInfo.id"
        :project="projectInfo"
        :author="authorsInfo!.find((a) => a.findcreekID === projectInfo.founderID)!"
      />
    </template>

    <template #add-project-button>
      <add-project-button v-if="getCreatedProjectsCount < 3" />
    </template>
  </projects-list-layout>
</template>
