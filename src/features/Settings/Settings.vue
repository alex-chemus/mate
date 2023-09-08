<script lang="ts" setup>
import { GeneralWidget, ProjectsWidget, ProfileWidget } from './widgets'
import { SettingsLayout } from './layouts'
import { useTabs, useAccount } from './hooks'
import { UserCard, Tabs } from './ui'
import { Tab } from './types'

const account = useAccount()
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

    <template #general-settings>
      <general-widget :full-account="account" />
    </template>

    <template #profile-settings>
      <profile-widget :full-account="account" />
    </template>

    <template #projects-settings>
      <projects-widget :full-account="account" />
    </template>
  </settings-layout>
</template>
