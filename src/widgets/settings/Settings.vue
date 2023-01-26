<script lang="ts" setup>
import { defineProps } from 'vue'
import { useUpdate, FullAccountInfo } from '@/utils'
import { GeneralSettings } from '@/widgets/generalSettings'
import ProfileSettingsLayout from './SettingsLayout.vue'
import { useTabs, useAccountInfo } from './hooks'
import {
  UserCard, Tabs, SaveButton
} from './components'

const props = defineProps<{
  fullAccountInfo?: FullAccountInfo
}>()

const accountInfo = useAccountInfo(props)
const { setUpdate } = useUpdate()
const { currentTab, toggleTabs, currentTitle } = useTabs()
</script>

<template>
  <profile-settings-layout v-if="accountInfo" :visible="!!currentTab" @toggle="toggleTabs(null)">
    <template #user-card>
      <user-card
        :full-name="`${accountInfo.firstName} ${accountInfo.lastName}`"
        :img="accountInfo.avatar.avatarCompressed"
        :email="accountInfo.email"
      />
    </template>

    <template #tabs>
      <tabs
        v-if="currentTab"
        :current-tab="currentTab"
        @change="toggleTabs"
      />
    </template>

    <template v-if="currentTitle" #title>
      {{ currentTitle }}
    </template>

    <template #save-button>
      <save-button @click="setUpdate()" />
    </template>

    <template #main-content v-if="currentTab === 'general'">
      <general-settings :full-account-info="accountInfo" />
    </template>
  </profile-settings-layout>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
