<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { IconBriefcase, IconUserCircle, IconSearch } from '@tabler/icons-vue'
import useAppStore from '@/store/useAppStore'

const route = useRoute()

const { userState } = useAppStore()

type TabsListItem = {
  type: "profile" | "vacancies" | "projects" | "search" | "settings",
  disabled: boolean,
  active: boolean,
  navigate: string
}

const tabsList = computed<TabsListItem[]>(() => {
  return [
    {
      type: 'projects',
      disabled: false,
      active: route.path.startsWith('/projects-list'),
      navigate: "/projects-list"
    },
    {
      type: 'search',
      disabled: false,
      active: route.path.startsWith('/global-search'),
      navigate: "/global-search"
    },
    {
      type: 'profile',
      disabled: !userState.value,
      active: !!userState.value && route.path.startsWith(`/user/${userState.value.findcreekID}`),
      navigate: `/user/${userState.value?.findcreekID}`
    }
  ]
})
</script>

<template>
  <section class="mobile-navbar">
    <router-link
      v-for="tab in tabsList" :key="tab.type" :to="!tab.disabled ? tab.navigate : ''"
      :class="['mobile-navbar__button', { disabled: tab.disabled }, { active: tab.active }]"
    >
      <icon-briefcase v-if="tab.type === 'projects'" />
      <icon-search v-if="tab.type === 'search'" />
      <icon-user-circle v-if="tab.type === 'profile'" />
    </router-link>
  </section>
</template>

<style scoped lang="scss" src="./MobileNavbar.scss" />
