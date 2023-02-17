<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { useSettings } from '@/utils'
import HeaderLayout from './HeaderLayout.vue'
import {
  Search, Tabs, Profile, Notifications,
  ProfilePopup, NotificationsPopup, SearchPopup
} from './components'
import { useAccountInfo, useTabs } from './hooks'
import { Notice, SearchItem } from './types'

const props = defineProps<{
  img?: string,
  fullName?: string,
  email?: string,
  id?: number
}>()

const {
  getImg, getFullName, getEmail, getId
} = useAccountInfo(props)
const { currentTab, switchTabs } = useTabs(getId)
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

const searchItems: SearchItem[] = [
  {
    fullName: 'александр чемус',
    textID: 'alex_chemus',
    description: 'я работаю в проекте findcreek mate. я создатель этой платформы!',
    id: 1,
  },
  {
    fullName: 'алексей грибанов',
    textID: 'alex_grib',
    description: 'я работаю в проекте findcreek mate. я создатель этой платформы!',
    id: 2
  },
]
const isSearchOpen = ref(false)
</script>

<template>
  <header-layout>
    <template #search>
      <search :popup-open="isSearchOpen" @toggle-popup="p => isSearchOpen = p">
        <search-popup :search-items="searchItems" @close="isSearchOpen = false" />
      </search>
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
