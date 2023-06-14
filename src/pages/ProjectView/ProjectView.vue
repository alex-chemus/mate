<script lang="ts" setup>
import { ref, computed } from 'vue'
import { PostFormWidget } from '@/widgets'
import { useFullAccountInfo } from '@/api'
import type { Company, Partner } from './types'
import { PostWidget, VacancyFormWidget } from './widgets'
import {
  ProfileCard, Subscriptions, Partners, About,
  NewPost, Projects, Employees, PostsObserver
} from './ui'
import { ProjectLayout } from './layouts'
import { useProjectInfo, useSubscribe, usePosts } from './hooks'

//const bio = ref('Привет, я являюсь представителем компании FINDCREEK, а также создателем платформы FINDCREEK Mate. Изо дня в день мы трудимся только ради вас! ')
const followers = ref('6 млн')
const following = ref('67')
const subscriptions = ref<Company[]>([
  { name: 'Yandex', followers: '800 тыс. подписчиков', id: 0 },
  { name: 'Google', followers: '8 млн подписчиков', id: 1 },
  { name: 'Tesla', followers: '1 млн подписчиков', id: 2 }
])
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

const fullAccountInfo = useFullAccountInfo()
const { subscribe, unsubscribe, subUpdate } = useSubscribe()
const { projectInfo, projectEmployees } = useProjectInfo({
  update: subUpdate
})

const postUpdate = ref<symbol | null>(null)
const setPostUpdate = () => {
  postUpdate.value = Symbol()
}
const {
  getPosts, authors, next, updatePost
} = usePosts({ projectInfo, update: postUpdate })

const ownsProject = computed(() => {
  if (!fullAccountInfo.value || !projectInfo.value) return
  // eslint-disable-next-line
  return fullAccountInfo.value.findcreekID === projectInfo.value.founderID
    || projectInfo.value.administrators.includes(fullAccountInfo.value.findcreekID)
})
</script>

<template>
  <!-- <settings
    v-if="fullAccountInfo"
    :full-account-info="fullAccountInfo"
  /> -->

  <post-form-widget
    v-if="projectInfo"
    type="project"
    :id="projectInfo.id"
    :img="projectInfo.avatar.avatarCompressed ?? projectInfo.avatar.avatar"
    @add="setPostUpdate"
  />

  <vacancy-form-widget
    v-if="projectInfo" :full-project="projectInfo"
  />

  <project-layout v-if="fullAccountInfo && projectInfo" :loading="!fullAccountInfo || !projectInfo">
    <!-- <template #header>
      <Header
        :img="fullAccountInfo.avatar.avatarCompressed"
        :full-name="`${fullAccountInfo.firstName} ${fullAccountInfo.lastName}`"
        :email="fullAccountInfo.email"
      />
    </template> -->

    <template #profile-card>
      <ProfileCard
        :name="projectInfo.name"
        :img="projectInfo.avatar.avatarCompressed ?? projectInfo.avatar.avatar"
        :followers="followers"
        :following="following"
        :nickname="projectInfo.textID"
        :banner="projectInfo.profileCover.profileCover"
        :owns-project="ownsProject"
        :is-subscribed="projectInfo.isSubscribed"
        @subscribe="subscribe(projectInfo!.id)"
        @unsubscribe="unsubscribe(projectInfo!.id)"
      />
    </template>

    <template #subscriptions>
      <Subscriptions
        :subscriptions="subscriptions"
      />
    </template>

    <template #partners>
      <Partners
        :partners="partners"
      />
    </template>

    <template #about v-if="projectInfo.description.length">
      <About :text="projectInfo.description" />
    </template>

    <template #new-post>
      <new-post :img="fullAccountInfo.avatar.avatarCompressed ?? fullAccountInfo.avatar.avatar" />
    </template>

    <template #posts v-if="getPosts && authors">
      <post-widget
        v-for="post in getPosts" :key="post.date.unixTime"
        :post-info="post"
        :project-info="projectInfo"
        :author-info="authors!.find((i) => i.postID === post.id)!.author"
        @reload="updatePost"
      />
    </template>

    <template #posts-observer v-if="getPosts && authors">
      <posts-observer @intersect="next()" />
    </template>

    <template #projects>
      <Projects />
    </template>

    <template v-if="projectEmployees" #employees>
      <Employees
        v-if="projectEmployees"
        :employees="projectEmployees"
      />
    </template>
  </project-layout>
</template>
