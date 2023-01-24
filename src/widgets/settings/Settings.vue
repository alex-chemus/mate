<script lang="ts" setup>
import { defineProps } from 'vue'
import { useUpdate } from '@/utils'
import ProfileSettingsLayout from './SettingsLayout.vue'
import { useAccountInfo, useTabs } from './hooks'
import {
  UserCard, Tabs, SaveButton
} from './components'

const props = defineProps<{
  //isOpen: boolean,
  fullName?: string,
  email?: string,
  img?: string
}>()

const { setUpdate } = useUpdate()
const { currentTab, toggleTabs } = useTabs()
const { getFullName, getEmail, getImg } = useAccountInfo(props)
</script>

<template>
  <profile-settings-layout :visible="!!currentTab" @toggle="toggleTabs(null)">
    <template #user-card>
      <user-card
        v-if="getFullName && getImg && getEmail"
        :full-name="getFullName"
        :img="getImg"
        :email="getEmail"
      />
    </template>

    <template #tabs>
      <tabs
        v-if="currentTab"
        :current-tab="currentTab"
        @change="toggleTabs"
      />
    </template>

    <template #save-button>
      <save-button @click="setUpdate()" />
    </template>
  </profile-settings-layout>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
