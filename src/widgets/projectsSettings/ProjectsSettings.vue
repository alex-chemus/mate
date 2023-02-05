<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { FullAccountInfo } from '@/utils'
import { Input, SaveButton } from '@/ui'
import ProjectsSettingsLayout from './ProjectsSettingsLayout.vue'
import {
  SettingsTabs, ProjectsSlider, ImagesUpload, DateInput,
  MemberItem, MembersSearch, RoleModal, RoleSelect
} from './components'
import {
  useMembers, useProjectsInfo, useUploadProjectSettings,
  useUploadImage, useRoles
} from './hooks'
import { SettingsTab, Member } from './types'

const props = defineProps<{
  fullAccountInfo: FullAccountInfo
}>()

const { projectsInfo, currentProjectID, currentProject } = useProjectsInfo({
  fullAccountInfo: props.fullAccountInfo
})

const currentTab = ref<SettingsTab>('settings')
const isModalOpen = ref(false)
const selectedMember = ref<null | Member>(null)
const { sortedMembers, onSearch } = useMembers({ currentProject })
const {
  setAvatar, setCover, getAvatar, getCover, uploadImage
} = useUploadImage({ currentProjectID })
const { onSelect, updateRole } = useRoles()
const {
  setFoundationDate, getFoundationDate, getSlogan, setSlogan,
  uploadProjectSettings
} = useUploadProjectSettings({ uploadImage, currentProjectID })
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
        v-if="projectsInfo && currentProjectID"
        :projects="projectsInfo"
        :current-tab-id="currentProjectID"
        @select="p => currentProjectID = p"
      />
    </template>

    <template #images-upload>
      <images-upload
        v-if="currentProject"
        :avatar="getAvatar ?? currentProject.avatar.avatarCompressed ?? currentProject.avatar.avatar"
        :cover="getCover ?? currentProject.profileCover.profileCover"
        :full-name="currentProject.name"
        @update-avatar="setAvatar"
        @update-cover="setCover"
      />
    </template>

    <template #foundation-date>
      <date-input
        :value="(getFoundationDate as string | undefined)"
        @update:value="setFoundationDate"
      />
    </template>

    <template #slogan>
      <Input
        v-if="currentProject"
        label-text="Слоган"
        :value="getSlogan ?? currentProject.slogan"
        @update:value="setSlogan"
      />
    </template>

    <template #save-button>
      <save-button @click="uploadProjectSettings" />
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
        v-if="selectedMember && currentProjectID"
        :visible="isModalOpen && !!selectedMember"
        :member="selectedMember"
        @toggle="p => isModalOpen = p"
        @change-role="updateRole"
      >
        <role-select
          :member="selectedMember"
          @select="r => onSelect({
            projectID: currentProjectID!,
            userID: selectedMember!.findcreekID,
            role: r
          })"
        />
      </role-modal>
    </template>
  </projects-settings-layout>
</template>
