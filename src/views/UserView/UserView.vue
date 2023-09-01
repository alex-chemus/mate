<script lang="ts" setup>
import { computed, ref } from 'vue'
import { PostFormWidget } from '@/shared/widgets'
import { useWindowWidth } from '@/shared/utils'
import { PostWidget } from './widgets'
import ViewLayout from './ViewLayout.vue'
import {
  ProfileCard, Bio,
  Projects, Skills, Contacts, NewPost,
  Subscriptions, PostsObserver
} from './ui'
import {
  usePageInfo, useSubscribe, useSubscriptions, usePosts
} from './hooks'

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

const { windowWidth, breakpoints } = useWindowWidth()

const bioRefresher = ref(Symbol())
const openBioModal = () => {
  bioRefresher.value = Symbol()
}
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
        :bio="user.bio"
        :projects-count="fullProjects?.length"
        @subscribe="uploadSubscribe(fullUsers![0].findcreekID)"
        @unsubscribe="uploadUnsubscribe(fullUsers![0].findcreekID)"
        @name-click="openBioModal"
      />
    </template>

    <template #contacts>
      <contacts
        v-if="windowWidth >= breakpoints.xl"
        :media="user.contacts.socialNetworks"
      />
    </template>

    <template #skills>
      <Skills v-if="skills && windowWidth >= breakpoints.xl" :is-me="isMe(user.findcreekID)" :skills="skills" />
    </template>

    <template #bio>
      <bio
        :bio="user.bio"
        :is-me="isMe(user.findcreekID)"
        :emails="user.contacts.emailAddresses"
        :specialties="user.specialties.map(s => s.rusName)"
        :registration-date="user.registrationDate"
        :phones="user.contacts.phoneNumbers"
        :city="user.address.cityRusName"
        :skills="user.skills"
        :media="windowWidth < breakpoints.xl ? user.contacts.socialNetworks : undefined"
        :refresher="bioRefresher"
      />
    </template>

    <template #new-post>
      <new-post
        v-if="isMe(user.findcreekID)"
        :img="user.avatar.avatarCompressed ?? user.avatar.avatar"
      />
    </template>

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
