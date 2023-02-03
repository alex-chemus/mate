<script lang="ts" setup>
import { ref } from 'vue'
import ProjectsSettingsLayout from './ProjectsSettingsLayout.vue'
import {
  SettingsTabs, ProjectsSlider, ImagesUpload, DateInput,
  MemberItem, MembersSearch, RoleModal
} from './components'
import { useMembers } from './hooks'
import { SettingsTab, ProjectTab, Member } from './types'

const currentTab = ref<SettingsTab>('settings')
const projects = ref<ProjectTab[]>([
  { id: 1, name: 'FINDCREEK Mate' },
  { id: 2, name: 'FINDCREEK Cybersport' },
  { id: 3, name: 'FINDCREEK Cybersport' },
  { id: 4, name: 'FINDCREEK Cybersport' },
  { id: 5, name: 'FINDCREEK Cybersport' },
])
const currentProjectId = ref<number>(projects.value[0].id)
const isModalOpen = ref(false)
const selectedMember = ref<null | Member>(null)
const { sortedMembers, onSearch } = useMembers()
</script>

<template>
  <projects-settings-layout :current-tab="currentTab">
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

    <template #images-upload>
      <images-upload
        :avatar="''"
        :cover="''"
        :full-name="'TEST TEST'"
      />
    </template>

    <template #foundation-date>
      <date-input />
    </template>

    <template #members-search>
      <members-search @search="onSearch" />
    </template>

    <template #members>
      <member-item
        v-for="(member, i) in sortedMembers" :key="i"
        :member="member" @change-role="() => {
          selectedMember = member
          isModalOpen = true
        }"
      />
    </template>

    <template #modal>
      <role-modal
        v-if="selectedMember"
        :visible="isModalOpen && !!selectedMember"
        :member="selectedMember"
        @toggle="p => isModalOpen = p"
      />
    </template>
  </projects-settings-layout>
</template>
