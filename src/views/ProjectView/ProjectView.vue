<script lang="ts" setup>
import { ref, computed } from 'vue'
import { PostFormWidget } from '@/shared/widgets'
import { useFullAccount } from '@/shared/api'
import { useWindowWidth } from '@/shared/utils'
import type { Company } from './types'
import { PostWidget, VacancyFormWidget } from './widgets'
import {
  ProfileCard, Subscriptions, About,
  NewPost, Projects, Employees, PostsObserver
} from './ui'
import { ProjectLayout } from './layouts'
import { useProject, useSubscribe, usePosts } from './hooks'

const { windowWidth, breakpoints } = useWindowWidth()

const followers = ref('6 млн')
const following = ref('67')
const subscriptions = ref<Company[]>([
  { name: 'Yandex', followers: '800 тыс. подписчиков', id: 0 },
  { name: 'Google', followers: '8 млн подписчиков', id: 1 },
  { name: 'Tesla', followers: '1 млн подписчиков', id: 2 }
])

const fullAccount = useFullAccount('[views/ProjectView] Failed to fetch account info')
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
    <template #profile-card>
      <ProfileCard
        :name="project.name"
        :img="project.avatar.avatarCompressed ?? project.avatar.avatar"
        :followers="followers"
        :following="following"
        :nickname="project.textID"
        :banner="project.profileCover"
        :owns-project="ownsProject"
        :is-subscribed="project.isSubscribed"
        :about="Projects.description || 'Тут пока ничего нет'"
        @subscribe="subscribe(project!.id)"
        @unsubscribe="unsubscribe(project!.id)"
      />
    </template>

    <template #subscriptions>
      <Subscriptions
        :subscriptions="subscriptions"
      />
    </template>

    <template #about v-if="windowWidth > breakpoints.xl">
      <About :text="project.description || 'Тут пока ничего нет'" />
    </template>

    <template #new-post>
      <new-post :img="fullAccount.avatar.avatarCompressed ?? fullAccount.avatar.avatar" />
    </template>

    <template #posts v-if="getPosts && authors">
      <post-widget
        v-for="post in getPosts" :key="post.date.unixTime"
        :post="post"
        :project="project"
        :author="authors!.find((i) => i.postID === post.id)!.author"
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
