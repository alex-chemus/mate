<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { FullAccountInfo } from '@/utils'
import { GeneralSettings, ProfileSettings } from '@/widgets'
import SettingsLayout from './SettingsLayout.vue'
import { useTabs, useAccountInfo, useUpdate } from './hooks'
import {
  UserCard, Tabs, SaveButton
} from './components'
import { Tab } from './types'

const props = defineProps<{
  fullAccountInfo?: FullAccountInfo
}>()

const accountInfo = useAccountInfo(props)
const { currentTab, toggleTabs, currentTitle } = useTabs()
const updated = useUpdate(2)

const localUpdate = ref(Symbol())
const onUpdate = () => {
  localUpdate.value = Symbol()
}
</script>

<template>
  <settings-layout
    v-if="accountInfo"
    :visible="!!currentTab"
    @toggle="toggleTabs(null)"
    :current-tab="(currentTab as Tab | undefined)"
  >
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
      <save-button @click="onUpdate" />
    </template>

    <template #general-settings>
      <general-settings
        :full-account-info="accountInfo"
        :update="localUpdate"
        @was-updated="updated('general')"
      />
    </template>

    <template #profile-settings>
      <profile-settings
        :full-account-info="accountInfo"
        :update="localUpdate"
      />
    </template>
  </settings-layout>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
