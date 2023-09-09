<script lang="ts" setup>
import { computed } from 'vue'
import { IconId, IconUser, IconUsers } from '@tabler/icons-vue'
import { Modal, ModalLayout } from '@/shared/hocs'
import { GeneralWidget, ProjectsWidget, ProfileWidget } from './widgets'
import { useTabs, useAccount } from './hooks'

const account = useAccount()
const {
  currentTab, toggleTabs, currentTitle, hasProjects
} = useTabs({ account })

type Tab = 'general' | 'profile' | 'projects'

const tabsList: Tab[] = ['general', 'profile', 'projects']

const modalWidth = computed(() => {
  switch (currentTab.value) {
    case 'projects':
    case 'profile':
      return 1200

    default: return 1000
  }
})

const getTabButtonText = (tab: Tab) => {
  switch (tab) {
    case 'general': return 'Основная информация'
    case 'profile': return 'Профиль'
    case 'projects': return 'Профиль проекта'
    default: return null
  }
}

const getIconColor = (tab: Tab) => {
  switch (tab) {
    case 'general': return '#505298'
    case 'profile': return '#07093D'
    case 'projects': return '#01CA7E'
    default: return null
  }
}
</script>

<template>
  <modal
    :visible="!!currentTab" @update:visible="toggleTabs(null)"
    :width="modalWidth" :fixed-height="true"
  >
    <section class="settings-container">
      <aside>
        <div class="user-card">
          <img class="user-card__avatar" :src="account?.avatar.avatarCompressed ?? account?.avatar.avatar" />
          <div class="user-card__text-wrapper">
            <h6 class="user-card__name">{{ account?.firstName }} {{ account?.lastName }}</h6>
            <small class="user-card__email">{{ account?.email }}</small>
          </div>
        </div>

        <div class="tabs">
          <button
            v-for="tab in tabsList" :key="tab"
            class="tabs__button" :class="{ 'selected': currentTab == tab }"
            @click="toggleTabs(tab)"
          >
            <div class="tabs__icon-wrapper" :style="`background-color: ${getIconColor(tab)}`">
              <icon-id v-if="tab === 'general'" width="20" height="20" />
              <icon-user v-if="tab === 'profile'" width="20" height="20" />
              <icon-users v-if="tab == 'projects'" width="20" height="20" />
            </div>
            <p class="tabs__text">{{ getTabButtonText(tab) }}</p>
          </button>
        </div>
      </aside>

      <section v-if="account" class="tab-content">
        <h2 class="tab-content__heading">{{ currentTitle }}</h2>
        <div class="tab-content__content-wrapper">
          <general-widget v-if="currentTab === 'general'" :full-account="account" />
          <profile-widget v-if="currentTab === 'profile'" :full-account="account" />
          <projects-widget v-if="currentTab === 'projects' && hasProjects" :full-account="account" />
        </div>
      </section>
    </section>
  </modal>
</template>

<style scoped lang="scss" src="./Settings.scss" />