<script lang="ts" setup>
//import { Logo } from '@/ui'
import { defineProps } from 'vue'
import HeaderLayout from './HeaderLayout.vue'
import HeaderSearch from './components/HeaderSearch.vue'
import HeaderTabs from './components/HeaderTabs.vue'
import HeaderProfile from './components/HeaderProfile.vue'

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
      <header-search />
    </template>

    <template #tabs>
      <header-tabs />
    </template>

    <template #profile-popup>
      <header-profile
        :img="(img as string)"
        :full-name="fullName ?? 'noname'"
        :email="email ?? 'noname@mail.ru'"
      />
    </template>
  </header-layout>
</template>
