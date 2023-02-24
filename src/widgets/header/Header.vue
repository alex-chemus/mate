<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { useSettings } from '@/utils'
import HeaderLayout from './HeaderLayout.vue'
import {
  Search, Tabs, Profile, Notifications,
  ProfilePopup, NotificationsPopup, SearchPopup
} from './components'
import {
  useAccountInfo, useTabs, useGlobalSearch, useSubscribe
} from './hooks'
import { Notice } from './types'

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
const { subscribe, unsubscribe, subUpdate } = useSubscribe()
const {
  getSearchItems, onSearch, isLoading, filters, toggleFilters
} = useGlobalSearch({ update: subUpdate })

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

const isSearchOpen = ref(false)
</script>

<template>
  <header-layout>
    <template #search>
      <search
        :popup-open="isSearchOpen"
        @toggle-popup="p => isSearchOpen = p"
        @input="onSearch"
      >
        <search-popup
          :filters="filters"
          :search-items="getSearchItems"
          :loading="isLoading"
          :user-id="getId"
          @close="isSearchOpen = false"
          @toggle-filters="toggleFilters"
          @subscribe="p => subscribe(p)"
          @unsubscribe="p => unsubscribe(p)"
        />
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
