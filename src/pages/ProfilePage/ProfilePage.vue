<script lang="ts" setup>
import {
  ref, onMounted, computed, watch
} from 'vue'
import { Post } from '@/widgets/post'
import { Header } from '@/widgets/header'
import { Settings } from '@/widgets/settings'
import type {
  Company, Partner, Employee, AccountInfo, ProjectInfo
} from './types'
import {
  Bio, Employees, NewPost, Partners,
  ProfileCard, Projects, Skills, Subscriptions
} from './components'
import ProfileLayout from './ProfileLayout.vue'
import { useAccountInfo, useFetchProjectsInfo } from './hooks'

//const bio = ref('Привет, я являюсь представителем компании FINDCREEK, а также создателем платформы FINDCREEK Mate. Изо дня в день мы трудимся только ради вас! ')
const followers = ref('6 млн')
const following = ref('67')
// const subscriptions = ref<Company[]>([
//   { name: 'Yandex', followers: '800 тыс. подписчиков', id: 0 },
//   { name: 'Google', followers: '8 млн подписчиков', id: 1 },
//   { name: 'Tesla', followers: '1 млн подписчиков', id: 2 }
// ])
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

// const fetchAccountInfo = useFetchAccountInfo()
// const accountInfo = ref<AccountInfo | null>(null)

// onMounted(async () => {
//   try {
//     accountInfo.value = await fetchAccountInfo()
//   } catch (e) {
//     console.log(`error in profile: ${e}`)
//   }
// })

const accountInfo = useAccountInfo()

const fetchProjectsInfo = useFetchProjectsInfo()
const projectsInfo = ref<ProjectInfo[] | null>(null)
const hasProjects = computed(() => {
  if (!accountInfo.value) return null
  return !!accountInfo.value.projectsMember.length
})

watch(accountInfo, async () => {
  if (!accountInfo.value || hasProjects.value === false) return

  try {
    projectsInfo.value = await fetchProjectsInfo(accountInfo.value.projectsMember)
  } catch (e) {
    console.log(`error in profile: ${e}`)
  }
})

const skills = computed(() => {
  if (!accountInfo.value) return null
  if (accountInfo.value.skills === '') return []
  return accountInfo.value.skills.split(', ')
})
</script>

<template>
  <settings
    v-if="accountInfo"
    :full-name="`${accountInfo.firstName} ${accountInfo.lastName}`"
    :email="accountInfo.email"
    :img="accountInfo.avatar.avatarCompressed"
  />

  <profile-layout v-if="accountInfo" :loading="!accountInfo">
    <template #header>
      <Header
        :img="accountInfo.avatar.avatarCompressed"
        :full-name="`${accountInfo.firstName} ${accountInfo.lastName}`"
        :email="accountInfo.email"
      />
    </template>

    <template #profile-card>
      <profile-card
        :full-name="`${accountInfo.firstName} ${accountInfo.lastName}`"
        :img="accountInfo.avatar.avatarCompressed"
        :followers="followers"
        :following="following"
        :nickname="accountInfo.textID"
        :banner="accountInfo.profileCover"
      />
    </template>

    <template #skills>
      <Skills v-if="skills && skills" :skills="skills" />
    </template>

    <!-- <template #subscriptions>
      <Subscriptions
        :subscriptions="subscriptions"
      />
    </template> -->

    <template #partners>
      <Partners
        :partners="partners"
      />
    </template>

    <template #bio>
      <Bio
        :bio="accountInfo.bio"
        :email="accountInfo.email"
        :specialties="accountInfo.specialties.map(s => s.rusName)"
        :registration-date="accountInfo.additionalData.registrationDate"
        :phone="accountInfo.contacts.phone"
        :city="accountInfo.address.cityRusName"
        :skills="accountInfo.skills"
      />
    </template>

    <template #new-post>
      <new-post :img="accountInfo.avatar.avatarCompressed" />
    </template>

    <template #post>
      <post />
    </template>

    <template #projects>
      <Projects v-if="projectsInfo" :projects="projectsInfo" />
    </template>

    <!-- <template #employees>
      <employees
        :employees="employees"
      />
    </template> -->
  </profile-layout>
</template>
