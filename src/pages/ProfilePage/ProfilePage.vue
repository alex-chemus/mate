<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Post } from '@/features/post'
import { Header } from '@/features/header'
import type {
  Company, Partner, Project, Employee, AccountInfo
} from './types'
import ProfileCard from './components/ProfileCard.vue'
import Subscriptions from './components/Subscriptions.vue'
import Partners from './components/Partners.vue'
import Bio from './components/Bio.vue'
import NewPost from './components/NewPost.vue'
import Projects from './components/Projects.vue'
import Employees from './components/Employees.vue'
import ProfileLayout from './ProfileLayout.vue'
import useFetchGetInfo from './api/useFetchGetInfo'

const bio = ref('Привет, я являюсь представителем компании FINDCREEK, а также создателем платформы FINDCREEK Mate. Изо дня в день мы трудимся только ради вас! ')
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
const projects = ref<Project[]>([
  {
    name: 'FINDCREEK Mate',
    started: '22.07.22'
  }
])
const employees = ref<Employee[]>([
  {
    fullName: 'Александр Соромотин',
    position: 'Бэкенд разработчик',
    id: 0
  },
  {
    fullName: 'Алексей Грибанов',
    position: 'Мобильный разработчик',
    id: 1
  },
  {
    fullName: 'Александр Чемус',
    position: 'Фронтенд разработчик',
    id: 2
  }
])

const fetchGetInfo = useFetchGetInfo()
const accountInfo = ref<AccountInfo | null>(null)

onMounted(async () => {
  try {
    accountInfo.value = await fetchGetInfo()
  } catch (e) {
    console.log(`error in profile: ${e}`)
  }
})
</script>

<template>
  <profile-layout v-if="accountInfo" :loading="!accountInfo">
    <template #header>
      <Header :img="accountInfo.avatar.avatarCompressed" />
    </template>

    <template #profile-card>
      <profile-card
        :full-name="`${accountInfo.firstName} ${accountInfo.lastName}`"
        :img="accountInfo.avatar.avatarCompressed"
        :followers="followers"
        :following="following"
        :nickname="accountInfo.textID"
      />
    </template>

    <template #subscriptions>
      <Subscriptions
        :subscriptions="subscriptions"
      />
    </template>

    <template #partners>
      <partners
        :partners="partners"
      />
    </template>

    <template #bio>
      <bio :bio="accountInfo.bio" />
    </template>

    <template #new-post>
      <new-post :img="accountInfo.avatar.avatarCompressed" />
    </template>

    <template #post>
      <post />
    </template>

    <template #projects>
      <projects />
    </template>

    <template #employees>
      <employees
        :employees="employees"
      />
    </template>
  </profile-layout>
</template>
