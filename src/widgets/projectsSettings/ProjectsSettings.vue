<script lang="ts" setup>
import { ref } from 'vue'
import ProjectsSettingsLayout from './ProjectsSettingsLayout.vue'
import { SettingsTabs, ProjectsSlider } from './components'
import { SettingsTab, ProjectTab } from './types'

const currentTab = ref<SettingsTab>('settings')
const projects = ref<ProjectTab[]>([
  { id: 1, name: 'FINDCREEK Mate' },
  { id: 2, name: 'FINDCREEK Cybersport' },
  { id: 3, name: 'FINDCREEK Cybersport' },
  { id: 4, name: 'FINDCREEK Cybersport' },
  { id: 5, name: 'FINDCREEK Cybersport' },
])
const currentProjectId = ref<number>(projects.value[0].id)
</script>

<template>
  <projects-settings-layout>
    <template #tabs>
      <settings-tabs
        :current-tab="currentTab"
        @select="p => currentTab = p"
      />
    </template>

    <template #projects>
      <projects-slider
        :projects="projects"
        :current-tab-id="currentProjectId"
        @select="p => currentProjectId = p"
      />
    </template>
  </projects-settings-layout>
</template>
