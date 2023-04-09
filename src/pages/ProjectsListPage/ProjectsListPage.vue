<script lang="ts" setup>
import { Header } from '@/widgets'
import { useProjectsInfo, useAuthorsInfo } from './hooks'
import { ProjectCard, NewProject } from './components'
import ProjectsListLayout from './ProjectsListLayout.vue'

const projectsInfo = useProjectsInfo()
const authorsInfo = useAuthorsInfo({ projectsInfo })
</script>

<template>
  <projects-list-layout>
    <template #header>
      <Header />
    </template>

    <template #projects v-if="projectsInfo && authorsInfo">
      <project-card
        v-for="projectInfo in projectsInfo" :key="projectInfo.id"
        :project-info="projectInfo"
        :author-info="authorsInfo!.find((a) => a.findcreekID === projectInfo.founderID)!"
      >
        <!-- <popover-button
          :is-subbed="projectInfo.isSubscribed"
        /> -->
      </project-card>
    </template>

    <template #new-project>
      <new-project />
    </template>
  </projects-list-layout>
</template>
