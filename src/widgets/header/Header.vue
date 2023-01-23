<script lang="ts" setup>
import { defineProps } from 'vue'
import HeaderLayout from './HeaderLayout.vue'
import {
  Search, Tabs, Profile, Notifications,
  ProfilePopup, NotificationsPopup
} from './components'
import { useSettings } from './hooks'
import type { Notice } from './types'

defineProps<{
  img?: string,
  fullName?: string,
  email?: string
}>()

// const { notificationsOpen, toggleNotifications } = useNotifications()
const { settingsOpen, toggleSettings } = useSettings()

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
      <tabs />
    </template>

    <template #notifications>
      <notifications>
        <notifications-popup :notices="notices" />
      </notifications>
    </template>

    <template #profile>
      <profile
        :img="(img as string)"
        :full-name="fullName ?? 'noname'"
        :email="email ?? 'noname@mail.ru'"
      >
        <profile-popup
          :img="(img as string)"
          :full-name="fullName ?? 'noname'"
          :email="email ?? 'noname@mail.ru'"
          :settings-open="settingsOpen"
          @toggle-settings="toggleSettings"
        />
      </profile>
    </template>
  </header-layout>
</template>
