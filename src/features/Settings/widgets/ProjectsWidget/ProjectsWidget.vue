<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { FullAccount } from '@/shared/types'
import { Input, SaveButton, DateInput } from '@/shared/ui'
import { WidgetLayout, RolePopup } from './layouts'
// import ProjectsSettingsLayout from './ProjectsSettingsLayout.vue'
import {
  SettingsTabs, ProjectsSlider, ImagesForm, MemberItem,
  MembersSearch, RoleDropdown, Media
} from './ui'
import {
  useMembers, useProjects, useSettings, useImages,
  useRoles, useMedia
} from './hooks'
import { SettingsTab, Member } from './types'

const props = defineProps<{
  fullAccount: FullAccount
}>()

const { projectsInfo, currentProjectID, currentProject } = useProjects({
  fullAccount: props.fullAccount
})

const currentTab = ref<SettingsTab>('settings')
const isModalOpen = ref(false)
const selectedMember = ref<null | Member>(null)
const { getMembers, onSearch } = useMembers({ currentProject })
const {
  onAdd, onEdit, onRemove
} = useMedia({ currentProject })
const {
  setAvatar, setCover, getAvatar, getCover, uploadImage
} = useImages({ currentProjectID })
const { onSelect, updateRole, disabled: roleDisabled } = useRoles()
const {
  setFoundationDate, getFoundationDate, getSlogan, setSlogan,
  uploadSettings, disabled
} = useSettings({ uploadImage, currentProjectID })
</script>

<template>
  <widget-layout :current-tab="currentTab">
    <template #tabs>
      <settings-tabs
        :current-tab="currentTab"
        @select="tab => currentTab = tab"
      />
    </template>

    <template #projects>
      <projects-slider
        v-if="projectsInfo && currentProjectID"
        :projects="projectsInfo"
        :current-tab-id="currentProjectID"
        @select="id => currentProjectID = id"
      />
    </template>

    <template #images-upload>
      <images-form
        v-if="currentProject"
        :avatar="getAvatar ?? currentProject.avatar.avatarCompressed ?? currentProject.avatar.avatar"
        :cover="getCover ?? currentProject.profileCover"
        :full-name="currentProject.name"
        @set-avatar="setAvatar"
        @set-cover="setCover"
      />
    </template>

    <template #foundation-date>
      <date-input
        :value="(getFoundationDate as string | undefined)"
        @update:value="setFoundationDate"
        label="Дата основания"
      />
    </template>

    <template #media>
      <media
        v-if="currentProject"
        :media="currentProject.contacts.socialNetworks"
        @edit="onEdit"
        @remove="onRemove"
        @add="onAdd"
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
      <save-button :disabled="disabled" @click="uploadSettings" />
    </template>

    <template #members-search>
      <members-search @search="onSearch" />
    </template>

    <template #members>
      <member-item
        v-for="(member, i) in getMembers" :key="i"
        :member="member" @change-role="() => {
          selectedMember = member
          isModalOpen = true
        }"
      />
    </template>

    <template #modal>
      <role-popup
        v-if="selectedMember && currentProjectID"
        :visible="isModalOpen && !!selectedMember"
        :member="selectedMember"
        @toggle="p => isModalOpen = p"
        @change-role="updateRole"
      >
        <role-dropdown
          :member="selectedMember"
          :disabled="roleDisabled"
          @select="role => onSelect({
            projectID: currentProjectID!,
            userID: selectedMember!.findcreekID,
            role: role
          })"
        />
      </role-popup>
    </template>
  </widget-layout>
</template>
