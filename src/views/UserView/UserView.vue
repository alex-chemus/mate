<script lang="ts" setup>
import { computed, ref } from 'vue'
import { PostFormWidget } from '@/widgets'
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
    v-if="fullUsers && isMe(fullUsers[0].findcreekID)"
    :img="fullUsers[0].avatar.avatarCompressed ?? fullUsers[0].avatar.avatar"
    type="user"
  />

  <view-layout v-if="fullUsers" :loading="!fullUsers">
    <template #profile-card>
      <profile-card
        :full-name="`${fullUsers[0].firstName} ${fullUsers[0].lastName}`"
        :img="fullUsers[0].avatar.avatarCompressed"
        :followers="'followers'"
        :following="'following'"
        :nickname="fullUsers[0].textID"
        :banner="fullUsers[0].profileCover ? fullUsers[0].profileCover : undefined"
        :can-edit="isMe(fullUsers[0].findcreekID)"
        :is-subscribed="fullUsers[0].isSubscribed"
        @subscribe="uploadSubscribe(fullUsers![0].findcreekID)"
        @unsubscribe="uploadUnsubscribe(fullUsers![0].findcreekID)"
      />
    </template>

    <template #contacts>
      <contacts
        :media="fullUsers[0].contacts.socialNetworks"
      />
    </template>

    <template #skills>
      <Skills v-if="skills" :skills="skills" />
    </template>

    <template #bio>
      <bio-layout
        :bio="fullUsers[0].bio"
        :emails="fullUsers[0].contacts.emailAddresses"
        :specialties="fullUsers[0].specialties.map(s => s.rusName)"
        :registration-date="fullUsers[0].registrationDate"
        :phones="fullUsers[0].contacts.phoneNumbers"
        :city="fullUsers[0].address.cityRusName"
        :skills="fullUsers[0].skills"
      />
    </template>

    <template #partners>
      <Partners :partners="partners"  />
    </template>

    <template #new-post>
      <new-post
        :img="fullUsers[0].avatar.avatarCompressed ?? fullUsers[0].avatar.avatar"
      />
      <!-- <post-editor
        v-if="isMe(fullUsers[0].findcreekID)"
        type="user" :img="fullUsers[0].avatar.avatarCompressed ?? fullUsers[0].avatar.avatar" /> -->
    </template>

    <!-- <template #post>
      <post />
    </template> -->

    <template #posts v-if="posts">
      <post-widget
        v-for="post in posts" :key="post.date.unixTime"
        :post="post"
        :author="fullUsers[0]"
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
