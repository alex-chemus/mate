<script lang="ts" setup>
import { defineProps } from 'vue'
import HeaderLayout from './HeaderLayout.vue'
import {
  Search, Tabs, Profile, Notifications
} from './components'
import type { Notice } from './types'

defineProps<{
  img?: string,
  fullName?: string,
  email?: string
}>()

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
      <notifications :notices="notices" />
    </template>

    <template #profile>
      <profile
        :img="(img as string)"
        :full-name="fullName ?? 'noname'"
        :email="email ?? 'noname@mail.ru'"
      />
    </template>

    <!-- <template #profile-popup>
      <header-profile
        :img="(img as string)"
        :full-name="fullName ?? 'noname'"
        :email="email ?? 'noname@mail.ru'"
      />
    </template> -->
  </header-layout>
</template>
