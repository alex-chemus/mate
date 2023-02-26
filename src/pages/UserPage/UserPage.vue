<script lang="ts" setup>
import { computed, ref } from 'vue'
import {
  Settings, Header, Post, PostEditor
} from '@/widgets'
import {
  Bio, Partners, ProfileCard,
  Projects, Skills, Contacts, NewPost,
  Subscriptions
} from './components'
import { usePageInfo, useSubscribe, useSubscriptions } from './hooks'
import { Partner } from './types'
import UserLayout from './UserLayout.vue'

const { subscribe, unsubscribe, subUpdate } = useSubscribe()
const { fullUsersInfo, fullProjectsInfo, isMe } = usePageInfo({
  update: subUpdate
})
const { subscriptions } = useSubscriptions({ fullUsersInfo })

const skills = computed(() => {
  if (!fullUsersInfo.value) return null
  if (fullUsersInfo.value[0].skills === '') return []
  return fullUsersInfo.value[0].skills.split(', ')
})

const partners = ref<Partner[]>([
  { link: '/google', id: 0 },
  { link: '/yandex', id: 1 },
  { link: '/facebook', id: 2 },
  { link: '/vk', id: 3 },
  { link: '/tesla', id: 4 },
  { link: '/apple', id: 5 },
  { link: '/profile', id: 6 },
  { link: '/profile', id: 7 }
])
</script>

<template>
  <settings />

  <user-layout v-if="fullUsersInfo" :loading="!fullUsersInfo">
    <template #header>
      <Header />
    </template>

    <template #profile-card>
      <profile-card
        :full-name="`${fullUsersInfo[0].firstName} ${fullUsersInfo[0].lastName}`"
        :img="fullUsersInfo[0].avatar.avatarCompressed"
        :followers="'followers'"
        :following="'following'"
        :nickname="fullUsersInfo[0].textID"
        :banner="fullUsersInfo[0].profileCover ? fullUsersInfo[0].profileCover : undefined"
        :can-edit="isMe(fullUsersInfo[0].findcreekID)"
        :is-subscribed="fullUsersInfo[0].isSubscribed"
        @subscribe="subscribe(fullUsersInfo![0].findcreekID)"
        @unsubscribe="unsubscribe(fullUsersInfo![0].findcreekID)"
      />
    </template>

    <template #contacts>
      <contacts
        :media="fullUsersInfo[0].contacts.socialNetworks"
      />
    </template>

    <template #skills>
      <Skills v-if="skills" :skills="skills" />
    </template>

    <template #bio>
      <bio
        :bio="fullUsersInfo[0].bio"
        :emails="fullUsersInfo[0].contacts.emailAddresses"
        :specialties="fullUsersInfo[0].specialties.map(s => s.rusName)"
        :registration-date="fullUsersInfo[0].registrationDate"
        :phones="fullUsersInfo[0].contacts.phoneNumbers"
        :city="fullUsersInfo[0].address.cityRusName"
        :skills="fullUsersInfo[0].skills"
      />
    </template>

    <template #partners>
      <Partners :partners="partners"  />
    </template>

    <template #new-post>
      <new-post
        :img="fullUsersInfo[0].avatar.avatarCompressed"
      />
    </template>

    <template #post>
      <post />
    </template>

    <template #projects>
      <Projects v-if="fullProjectsInfo" :projects="fullProjectsInfo" />
    </template>

    <template #subscriptions>
      <Subscriptions
        v-if="subscriptions"
        :subscriptions="subscriptions"
      />
    </template>
  </user-layout>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
