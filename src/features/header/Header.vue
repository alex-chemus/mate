<script lang="ts" setup>
//import { Logo } from '@/ui'
import { defineProps } from 'vue'
import HeaderLayout from './HeaderLayout.vue'
import Search from './components/Search.vue'
import Tabs from './components/Tabs.vue'
import Profile from './components/Profile.vue'
import Notifications from './components/Notifications.vue'

defineProps<{
  img?: string,
  fullName?: string,
  email?: string
}>()

// todo: fetch avatar if not passed
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
      <notifications />
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
