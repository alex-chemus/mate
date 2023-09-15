<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAppStore from '@/store/useAppStore'
import { IconId, IconUser, IconUsers } from '@tabler/icons-vue'
import { Modal } from '@/shared/hocs'
import { useWindowWidth } from '@/shared/utils'
import { GeneralWidget, ProjectsWidget, ProfileWidget } from './widgets'

const router = useRouter()

const route = useRoute()

const { userState } = useAppStore()

const { windowWidth, breakpoints } = useWindowWidth()

export type TabType = 'general' | 'profile' | 'projects'
const currentTab = computed<TabType | null>(() => {
  switch (route.query.settings) {
    case 'general': return 'general'
    case 'profile': return 'profile'
    case 'projects': return 'projects'
    default: return null
  }
})

const hasProjects = computed<boolean>(() => {
  return userState.value
    ? [
      ...userState.value.projectsManagement.administrator,
      ...userState.value.projectsManagement.editor,
      ...userState.value.projectsManagement.founder
    ].length !== 0
    : false
})

type Tab = {
  type: TabType,
  disabled: boolean,
  active: boolean,
}
const tabsList = computed<Tab[]>(() => [
  {
    type: 'general',
    disabled: false,
    active: currentTab.value === 'general',
  },
  {
    type: 'profile',
    disabled: false,
    active: currentTab.value === 'profile',
  },
  {
    type: 'projects',
    disabled: hasProjects.value,
    active: currentTab.value === 'projects',
  }
])

const toggleTabs = (tab: TabType | null) => {
  router.push({
    path: route.path,
    query: tab ? { settings: tab } : undefined
  })
}

const isOpen = computed(() => {
  return Object.keys(route.query).includes('settings')
})

const modalWidth = computed(() => {
  switch (currentTab.value) {
    case 'projects':
    case 'profile':
      return 1200

    default: return 1000
  }
})

const getTabButtonText = (tab: TabType) => {
  switch (tab) {
    case 'general': return 'Основная информация'
    case 'profile': return 'Профиль'
    case 'projects': return 'Профиль проекта'
    default: return null
  }
}

const getIconColor = (tab: TabType) => {
  switch (tab) {
    case 'general': return '#505298'
    case 'profile': return '#07093D'
    case 'projects': return '#01CA7E'
    default: return null
  }
}

const getTitle = computed(() => {
  switch (currentTab.value) {
    case 'general': return 'Редактировать основную информацию'
    case 'profile': return 'Редактировать профиль'
    case 'projects': return 'Редактировать профиль проекта'
    default: return null
  }
})
</script>

<template>
  <modal
    :visible="!!isOpen" @update:visible="toggleTabs(null)"
    :width="modalWidth" :fixed-height="true"
  >
    <section class="settings-container" v-if="windowWidth > breakpoints.lg">
      <aside>
        <div class="user-card">
          <img class="user-card__avatar" :src="userState?.avatar.avatarCompressed ?? userState?.avatar.avatar" />
          <div class="user-card__text-wrapper">
            <h6 class="user-card__name">{{ userState?.firstName }} {{ userState?.lastName }}</h6>
            <small class="user-card__email">{{ userState?.email }}</small>
          </div>
        </div>

        <div class="tabs">
          <button
            v-for="tab in tabsList" :key="tab.type"
            :class="['tabs__button', { 'selected': tab.active }]"
            @click="toggleTabs(tab.type)"
          >
            <div class="tabs__icon-wrapper" :style="`background-color: ${getIconColor(tab.type)}`">
              <icon-id v-if="tab.type === 'general'" width="20" height="20" />
              <icon-user v-if="tab.type === 'profile'" width="20" height="20" />
              <icon-users v-if="tab.type == 'projects'" width="20" height="20" />
            </div>
            <p class="tabs__text">{{ getTabButtonText(tab.type) }}</p>
          </button>
        </div>
      </aside>

      <section v-if="userState" class="tab-content">
        <h2 class="tab-content__heading">{{ getTitle }}</h2>
        <div class="tab-content__content-wrapper">
          <general-widget v-if="currentTab === 'general'" />
          <profile-widget v-if="currentTab === 'profile'" :full-account="userState" />
          <projects-widget v-if="currentTab === 'projects' && hasProjects" :full-account="userState" />
        </div>
      </section>
    </section>

    <section class="placeholder-container" v-else>
      Настройки недоступны на вашем устройстве
      <icon-devices-off width="60px" height="60px" />
    </section>
  </modal>
</template>

<style scoped lang="scss" src="./Settings.scss" />