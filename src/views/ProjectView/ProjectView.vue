<script lang="ts" setup>
import { ref, computed } from 'vue'
import { PostFormWidget } from '@/widgets'
import { useFullAccount } from '@/api'
import type { Company, Partner } from './types'
import { PostWidget, VacancyFormWidget } from './widgets'
import {
  ProfileCard, Subscriptions, Partners, About,
  NewPost, Projects, Employees, PostsObserver
} from './ui'
import { ProjectLayout } from './layouts'
import { useProject, useSubscribe, usePosts } from './hooks'

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

const fullAccount = useFullAccount()
const { subscribe, unsubscribe, subUpdate } = useSubscribe()
const { project, projectEmployees } = useProject({
  update: subUpdate
})

const postUpdate = ref<symbol | null>(null)
const setPostUpdate = () => {
  postUpdate.value = Symbol()
}
const {
  getPosts, authors, next, updatePost
} = usePosts({ project, update: postUpdate })

const ownsProject = computed(() => {
  if (!fullAccount.value || !project.value) return
  // eslint-disable-next-line
  return fullAccount.value.findcreekID === project.value.founderID
    || project.value.administrators.includes(fullAccount.value.findcreekID)
})
</script>

<template>
  <!-- <settings
    v-if="fullAccountInfo"
    :full-account-info="fullAccountInfo"
  /> -->

  <post-form-widget
    v-if="project"
    type="project"
    :id="project.id"
    :img="project.avatar.avatarCompressed ?? project.avatar.avatar"
    @add="setPostUpdate"
  />

  <vacancy-form-widget
    v-if="project" :full-project="project"
  />

  <project-layout v-if="fullAccount && project" :loading="!fullAccount || !project">
    <!-- <template #header>
      <Header
        :img="fullAccountInfo.avatar.avatarCompressed"
        :full-name="`${fullAccountInfo.firstName} ${fullAccountInfo.lastName}`"
        :email="fullAccountInfo.email"
      />
    </template> -->

    <template #profile-card>
      <ProfileCard
        :name="project.name"
        :img="project.avatar.avatarCompressed ?? project.avatar.avatar"
        :followers="followers"
        :following="following"
        :nickname="project.textID"
        :banner="project.profileCover.profileCover"
        :owns-project="ownsProject"
        :is-subscribed="project.isSubscribed"
        @subscribe="subscribe(project!.id)"
        @unsubscribe="unsubscribe(project!.id)"
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

    <template #about v-if="project.description.length">
      <About :text="project.description" />
    </template>

    <template #new-post>
      <new-post :img="fullAccount.avatar.avatarCompressed ?? fullAccount.avatar.avatar" />
    </template>

    <template #posts v-if="getPosts && authors">
      <post-widget
        v-for="post in getPosts" :key="post.date.unixTime"
        :post-info="post"
        :project-info="project"
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
