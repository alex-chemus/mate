<script lang="ts" setup>
import { defineProps } from 'vue'
import { FullAccountInfo } from '@/types'
import {
  ProfileSettings, ProjectsSettings, PrivacySettings
} from '@/widgets'
import { GeneralWidget } from './widgets'
import { SettingsLayout } from './layouts'
import { useTabs, useAccount } from './hooks'
import {
  UserCard, Tabs
} from './ui'
import { Tab } from './types'

const props = defineProps<{
  fullAccountInfo?: FullAccountInfo
}>()

const account = useAccount(props)
const {
  currentTab, toggleTabs, currentTitle, hasProjects
} = useTabs({ account })
</script>

<template>
  <settings-layout
    v-if="account"
    :visible="!!currentTab"
    :has-projects="hasProjects"
    @toggle="toggleTabs(null)"
    :current-tab="(currentTab as Tab | undefined)"
  >
    <template #user-card>
      <user-card
        :full-name="`${account.firstName} ${account.lastName}`"
        :img="account.avatar.avatarCompressed"
        :email="account.email"
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
        :full-account-info="account"
        :update="localUpdate"
        @was-updated="updated('general')"
      /> -->
      <general-widget
        :full-account="account"
      />
    </template>

    <template #profile-settings>
      <profile-settings
        :full-account-info="account"
      />
    </template>

    <template #projects-settings>
      <projects-settings
        :full-account-info="account"
      />
    </template>

    <template #privacy-settings>
      <privacy-settings
        :full-account-info="account"
      />
    </template>
  </settings-layout>
</template>
