<script lang="ts" setup>
import { defineProps } from 'vue'
import { useSettings } from '@/utils'
import HeaderLayout from './HeaderLayout.vue'
import {
  Search, Tabs, Profile, Notifications,
  ProfilePopup, NotificationsPopup
} from './components'
import { useAccountInfo, useTabs } from './hooks'
import type { Notice } from './types'

const props = defineProps<{
  img?: string,
  fullName?: string,
  email?: string
}>()

const { getImg, getFullName, getEmail } = useAccountInfo(props)
const { currentTab, switchTabs } = useTabs()
const { openSettings } = useSettings()

const notices: Notice[] = [
  {
    type: 'subscribed',
    person: 'Алексей Грибанов',
    subject: 'Вас',
    subjectUrl: '#',
    date: 'Час назад'
  },
  {
    type: 'joined',
    person: 'Алексей Грибанов',
    subject: 'FINDCREEK',
    subjectUrl: '#',
    date: 'Час назад'
  },
  {
    type: 'request',
    person: 'Алексей Грибанов',
    subject: 'FINDCREEK',
    subjectUrl: '#',
    date: 'Час назад'
  }
]
</script>

<template>
  <header-layout>
    <template #search>
      <search />
    </template>

    <template #tabs>
      <tabs :current-tab="currentTab" @switch="switchTabs" />
    </template>

    <template #notifications>
      <notifications>
        <notifications-popup :notices="notices" />
      </notifications>
    </template>

    <template #profile>
      <profile
        v-if="getFullName && getImg && getEmail"
        :img="getImg"
        :full-name="getFullName"
        :email="getEmail"
      >
        <profile-popup
          :img="getImg"
          :full-name="getFullName"
          :email="getEmail"
          @open-settings="openSettings"
        />
      </profile>
    </template>
  </header-layout>
</template>
