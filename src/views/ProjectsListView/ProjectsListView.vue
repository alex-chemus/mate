<script lang="ts" setup>
import { useProjects, useAuthors } from './hooks'
import { ProjectCard, AddProjectButton } from './ui'
import { ProjectsListLayout } from './layouts'

const projects = useProjects()
const authorsInfo = useAuthors({ projects })
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
      <add-project-button />
    </template>
  </projects-list-layout>
</template>
