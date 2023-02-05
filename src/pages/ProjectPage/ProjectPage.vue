<script lang="ts" setup>
import { ref } from 'vue'
import { Post, Header } from '@/widgets'
import { useFullAccountInfo } from '@/utils'
import type { Company, Partner } from './types'
import {
  ProfileCard, Subscriptions, Partners, About,
  NewPost, Projects, Employees
} from './components'
import ProfileLayout from './ProjectLayout.vue'
import { useProjectInfo } from './hooks'

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
// const projects = ref<Project[]>([
//   {
//     name: 'FINDCREEK Mate',
//     started: '22.07.22'
//   }
// ])
// const employees = ref<Employee[]>([
//   {
//     fullName: 'Александр Соромотин',
//     position: 'Бэкенд разработчик',
//     id: 0
//   },
//   {
//     fullName: 'Алексей Грибанов',
//     position: 'Мобильный разработчик',
//     id: 1
//   },
//   {
//     fullName: 'Александр Чемус',
//     position: 'Фронтенд разработчик',
//     id: 2
//   }
// ])

const fullAccountInfo = useFullAccountInfo()
const { projectInfo, projectEmployees } = useProjectInfo()
</script>

<template>
  <profile-layout v-if="fullAccountInfo && projectInfo" :loading="!fullAccountInfo || !projectInfo">
    <template #header>
      <Header
        :img="fullAccountInfo.avatar.avatarCompressed"
        :full-name="`${fullAccountInfo.firstName} ${fullAccountInfo.lastName}`"
        :email="fullAccountInfo.email"
      />
    </template>

    <template #profile-card>
      <ProfileCard
        :name="projectInfo.name"
        :img="projectInfo.avatar.avatarCompressed ?? projectInfo.avatar.avatar"
        :followers="followers"
        :following="following"
        :nickname="projectInfo.textID"
        :banner="projectInfo.profileCover.profileCover"
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

    <template #post>
      <Post />
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
  </profile-layout>
</template>
