<script lang="ts" setup>
import {
  defineProps, defineEmits, ref
} from 'vue'
import { useUpdate } from '@/utils'
import ProfileSettingsLayout from './SettingsLayout.vue'
import { useAccountInfo } from './hooks'
import type { Tab } from './types'
import {
  UserCard, Tabs, SaveButton
} from './components'

const props = defineProps<{
  isOpen: boolean,
  fullName?: string,
  email?: string,
  img?: string
}>()

const emit = defineEmits<{
  (e: 'toggle', payload: boolean): void
}>()

const { setUpdate } = useUpdate()
const { getFullName, getEmail, getImg } = useAccountInfo(props)

const currentTab = ref<Tab>('general')
</script>

<template>
  <profile-settings-layout :visible="isOpen" @toggle="payload => emit('toggle', payload)">
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
        :current-tab="currentTab"
        @change="payload => currentTab = payload"
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
