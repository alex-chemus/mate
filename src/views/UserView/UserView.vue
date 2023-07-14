<script lang="ts" setup>
import { computed, ref } from 'vue'
import { PostFormWidget } from '@/shared/widgets'
import { ViewLayout, BioLayout } from './layouts'
import { PostWidget } from './widgets'
import {
  Partners, ProfileCard,
  Projects, Skills, Contacts, NewPost,
  Subscriptions, PostsObserver
} from './ui'
import {
  usePageInfo, useSubscribe, useSubscriptions, usePosts
} from './hooks'
import { Partner } from './types'

const { uploadSubscribe, uploadUnsubscribe, subUpdate } = useSubscribe()
const { fullUsers, fullProjects, isMe } = usePageInfo({
  update: subUpdate
})
const { subscriptions } = useSubscriptions({ fullUsers })
const { posts, next, updatePost } = usePosts({
  userInfo: computed(() => fullUsers.value ? fullUsers.value[0] : null)
})

const user = computed(() => {
  return fullUsers.value ? fullUsers.value[0] : null
})

const skills = computed(() => {
  if (!fullUsers.value) return null
  if (fullUsers.value[0].skills === '') return []
  return fullUsers.value[0].skills.split(', ')
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
  <post-form-widget
    v-if="user && isMe(user.findcreekID)"
    :img="user.avatar.avatarCompressed ?? user.avatar.avatar"
    type="user"
  />

  <view-layout v-if="user" :loading="!user">
    <template #profile-card>
      <profile-card
        :full-name="`${user.firstName} ${user.lastName}`"
        :img="user.avatar.avatarCompressed"
        :subscribers="user.subscribersNumber"
        :subscriptions="user.subscriptionsNumber"
        :nickname="user.textID"
        :banner="user.profileCover ? user.profileCover : undefined"
        :can-edit="isMe(user.findcreekID)"
        :is-subscribed="user.isSubscribed"
        @subscribe="uploadSubscribe(fullUsers![0].findcreekID)"
        @unsubscribe="uploadUnsubscribe(fullUsers![0].findcreekID)"
      />
    </template>

    <template #contacts>
      <contacts
        :media="user.contacts.socialNetworks"
      />
    </template>

    <template #skills>
      <Skills v-if="skills" :is-me="isMe(user.findcreekID)" :skills="skills" />
    </template>

    <template #bio>
      <bio-layout
        :bio="user.bio"
        :is-me="isMe(user.findcreekID)"
        :emails="user.contacts.emailAddresses"
        :specialties="user.specialties.map(s => s.rusName)"
        :registration-date="user.registrationDate"
        :phones="user.contacts.phoneNumbers"
        :city="user.address.cityRusName"
        :skills="user.skills"
      />
    </template>

    <!-- <template #partners>
      <Partners :partners="partners"  />
    </template> -->

    <template #new-post>
      <new-post
        v-if="isMe(user.findcreekID)"
        :img="user.avatar.avatarCompressed ?? user.avatar.avatar"
      />
      <!-- <post-editor
        v-if="isMe(user.findcreekID)"
        type="user" :img="user.avatar.avatarCompressed ?? user.avatar.avatar" /> -->
    </template>

    <!-- <template #post>
      <post />
    </template> -->

    <template #posts v-if="posts">
      <post-widget
        v-for="post in posts" :key="post.date.unixTime"
        :post="post"
        :author="user"
        @reload="updatePost"
      />
    </template>

    <template #posts-observer>
      <posts-observer @intersect="next()" />
    </template>

    <template #projects>
      <Projects v-if="fullProjects" :projects="fullProjects" />
    </template>

    <template #subscriptions>
      <Subscriptions
        v-if="subscriptions"
        :subscriptions="subscriptions"
      />
    </template>
  </view-layout>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
