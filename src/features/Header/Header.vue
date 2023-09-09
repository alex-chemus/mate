<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useSettings } from '@/shared/utils'
import {
  HeaderLayout, ProfileLayout, NotificationsLayout, SearchLayout
} from './layouts'
import {
  Tabs, ProfilePopup, NotificationsPopup, SearchPopup
} from './ui'
import {
  useAccount, useTabs, useGlobalSearch, useSubscribe
} from './hooks'
import { Notice } from './types'

const account = useAccount()
const { currentTab, switchTabs } = useTabs({
  id: computed(() => account?.value?.findcreekID as number | null)
})
const { openSettings } = useSettings()
const { uploadSubscribe, uploadUnsubscribe, subUpdate } = useSubscribe()
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

const logout = () => {
  localStorage.removeItem('token')
  window.location.href = 'https://id.findcreek.com/auth/?redirectTo=https%3A%2F%2Fmate.findcreek.com%2Fredirect&returnToken=true'
}

const isSearchOpen = ref(false)
const isProfileOpen = ref(false)
</script>

<template>
  <header-layout>
    <template #search>
      <search-layout
        :popup-open="isSearchOpen"
        @toggle-popup="p => isSearchOpen = p"
        @input="onSearch"
      >
        <search-popup
          :filters="filters"
          :search-items="getSearchItems"
          :loading="isLoading"
          :user-id="account?.findcreekID"
          @close="isSearchOpen = false"
          @toggle-filters="toggleFilters"
          @subscribe="uploadSubscribe"
          @unsubscribe="uploadUnsubscribe"
        />
      </search-layout>
    </template>

    <template #tabs>
      <tabs :current-tab="currentTab" @switch="switchTabs" />
    </template>

    <!-- <template #notifications>
      <notifications-layout>
        <notifications-popup :notices="notices" />
      </notifications-layout>
    </template> -->

    <template #profile>
      <profile-layout
        v-if="account"
        v-model:is-open="isProfileOpen"
        :img="account.avatar.avatarCompressed || account.avatar.avatar"
        :full-name="`${account.lastName} ${account.firstName}`"
        :email="account.email"
      >
        <profile-popup
          :img="account.avatar.avatarCompressed || account.avatar.avatar"
          :full-name="`${account.lastName} ${account.firstName}`"
          :nametag="account.textID"
          @open-settings="() => {
            openSettings()
            isProfileOpen = false
          }"
          @logout="logout"
        />
      </profile-layout>
    </template>
  </header-layout>
</template>
