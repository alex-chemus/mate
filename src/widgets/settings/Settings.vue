<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { FullAccountInfo } from '@/utils'
import {
  GeneralSettings, ProfileSettings, ProjectsSettings, PrivacySettings
} from '@/widgets'
import SettingsLayout from './SettingsLayout.vue'
import { useTabs, useAccountInfo } from './hooks'
import {
  UserCard, Tabs
} from './components'
import { Tab } from './types'

const props = defineProps<{
  fullAccountInfo?: FullAccountInfo
}>()

const accountInfo = useAccountInfo(props)
const {
  currentTab, toggleTabs, currentTitle, hasProjects
} = useTabs({ accountInfo })
</script>

<template>
  <settings-layout
    v-if="accountInfo"
    :visible="!!currentTab"
    :has-projects="hasProjects"
    @toggle="toggleTabs(null)"
    :current-tab="(currentTab as Tab | undefined)"
  >
    <template #user-card>
      <user-card
        :full-name="`${accountInfo.firstName} ${accountInfo.lastName}`"
        :img="accountInfo.avatar.avatarCompressed"
        :email="accountInfo.email"
      />
    </template>

    <template #tabs>
      <tabs
        v-if="currentTab"
        :current-tab="currentTab"
        :has-projects="hasProjects"
        @change="toggleTabs"
      />
    </template>

    <template v-if="currentTitle" #title>
      {{ currentTitle }}
    </template>

    <!-- <template #save-button>
      <save-button @click="onUpdate" />
    </template> -->

    <template #general-settings>
      <!-- <general-settings
        :full-account-info="accountInfo"
        :update="localUpdate"
        @was-updated="updated('general')"
      /> -->
      <general-settings
        :full-account-info="accountInfo"
      />
    </template>

    <template #profile-settings>
      <profile-settings
        :full-account-info="accountInfo"
      />
    </template>

    <template #projects-settings>
      <projects-settings
        :full-account-info="accountInfo"
      />
    </template>

    <template #privacy-settings>
      <privacy-settings
        :full-account-info="accountInfo"
      />
    </template>
  </settings-layout>
</template>
