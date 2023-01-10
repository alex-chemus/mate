<script lang="ts" setup>
//import { Logo } from '@/ui'
import { defineProps, computed } from 'vue'
import HeaderLayout from './HeaderLayout.vue'
import HeaderSearch from './components/HeaderSearch.vue'
import HeaderTabs from './components/HeaderTabs.vue'
import HeaderProfile from './components/HeaderProfile.vue'

const props = defineProps<{
  img?: string
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
      <header-profile :img="(img as string)" />
    </template>
  </header-layout>
</template>
