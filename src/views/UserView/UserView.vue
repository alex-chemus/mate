<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PostFormWidget } from '@/shared/widgets'
import { useWindowWidth, useFetchApi, usePostEditor } from '@/shared/utils'
import { Modal } from '@/shared/hocs'
import useAppStore from '@/store/useAppStore'
import { Loader, PlaceholderImg } from '@/shared/ui'
import { FullProject, FullUser } from '@/shared/types'
import { IconEdit } from '@tabler/icons-vue'
import UserActionsButton from './UserActionsButton/UserActionsButton.vue'
import Card from './Card/Card.vue'
import SocialMediaList from './SocialMediaList/SocialMediaList.vue'
import { usePosts } from './hooks'
import { PostsObserver } from './ui'
import BioModal from './ui/BioModal.vue'
import { UserPost } from '@/shared/widgets'

const router = useRouter()

const route = useRoute()

const fetchApi = useFetchApi()

const { userState } = useAppStore()

const refresher = ref(Symbol())
const refresh = () => refresher.value = Symbol()

const user = ref<FullUser | null>(null)
const fetchUser = async () => {
  const userId = [+route.params.id].join('')
  const res: FullUser[] = await fetchApi('users.getInfo', { usersIDs: userId })
  user.value = res[0]
}
router.afterEach((to, from) => {
  const pattern = /user\/\d/
  if (to.path.match(pattern) && from.path.match(pattern)) fetchUser()
})
onMounted(fetchUser)
watch([() => route, refresher], fetchUser)

const getProjectIds = computed(() => {
  if (!user.value) return null
  const userProjects = user.value.projectsManagement
  return [ ...userProjects.founder, ...userProjects.editor, ...userProjects.administrator ]
})

const projects = ref<FullProject[] | null>(null)
const fetchProjects = async () => {
  if (getProjectIds.value && getProjectIds.value.length)
    projects.value = await fetchApi('projects.getInfo', { projectsIDs: getProjectIds.value.join(', ') })
}
onMounted(fetchProjects)
watch(getProjectIds, fetchProjects)

const showAllProjects = ref(false)
watch(projects, () => {
  if (projects.value && projects.value.length <= 3) showAllProjects.value = true
})
const getProjectsList = computed(() => {
  switch (true) {
    case projects.value === null: return null
    case showAllProjects.value: return projects.value
    default: return projects.value!.slice(0, 3)
  }
})

// временное решение, вынести всю логику в UserPosts во время рефакторинга
const { posts, next } = usePosts({ userInfo: user })

const skills = computed(() => {
  if (!user.value) return null
  if (user.value.skills === '') return []
  return user.value.skills.split(', ')
})

const { windowWidth, breakpoints } = useWindowWidth()

const { openPostEditor } = usePostEditor()

const isBioOpen = ref(false)

const getUserStatistics = computed(() => [
  { title: 'Проектов', value: getProjectIds.value?.length ?? 0 },
  { title: 'Подписчиков', value: user.value?.subscribersNumber ?? 0 },
  { title: 'Подписок', value: user.value?.subscriptionsNumber ?? 0 }
])

// потом пнуть саню, чтобы сделал одним методом или сразу присылал из апишки
const getSubscriptions = computed(() => {
  return user.value === null
    ? null
    : [...user.value.subscriptions.projects, ...user.value.subscriptions.users]
})

type Subscription = FullUser | FullProject
const subscriptions = ref<Subscription[] | null>(null)
</script>

<template>
  <post-form-widget
    v-if="user && userState?.findcreekID === user.findcreekID"
    :img="user.avatar.avatarCompressed ?? user.avatar.avatar"
    type="user"
  />

  <modal v-if="user" width="600" v-model:visible="isBioOpen">
    <bio-modal
      :bio="user.bio"
      :emails="user.contacts.emailAddresses"
      :specialties="user.specialties.map(s => s.rusName)"
      :registration-date="user.registrationDate"
      :phones="user.contacts.phoneNumbers"
      :city="user.address.cityRusName"
      :skills="user.skills"
      :media="windowWidth < breakpoints.xl ? user.contacts.socialNetworks : undefined"
      @close="isBioOpen = false"
    />
  </modal>

  <section v-if="!user" class="loader">
    <loader />
  </section>

  <section v-else class="user-view">
    <aside>
      <section class="profile-card">
        <img :src="user.profileCover || user.avatar.avatar" class="profile-card__banner" />

        <div v-if="windowWidth > breakpoints.xl" class="profile-card__container">
          <div class="profile-card__content-wrapper">
            <p class="profile-card__subs-info">
              <strong>{{ user.subscribersNumber }}</strong>
              <span>Подписчиков</span>
            </p>

            <img :src="user.avatar.avatarCompressed ?? user.avatar.avatar" class="profile-card__avatar" />
          
            <p class="profile-card__subs-info">
              <strong>{{ user.subscriptionsNumber }}</strong>
              <span>Подписок</span>
            </p>
          </div>

          <h3 class="profile-card__fullname">{{ user.firstName }} {{ user.lastName }}</h3>
          <p class="profile-card__nametag">@{{ user.textID }}</p>
        
          <user-actions-button
            :user-id="user.findcreekID"
            :is-subscribed="user.isSubscribed"
            @refresh="refresh"
          />
        </div>

        <div v-else-if="windowWidth <= breakpoints.xl" class="profile-card__mobile-container">
          <div class="profile-card__mobile-content-wrapper">
            <div @click="isBioOpen = true" style="cursor: pointer">
              <img :src="user.avatar.avatarCompressed ?? user.avatar.avatar" class="profile-card__avatar" />
            
              <h3 class="profile-card__fullname">{{ user.firstName }} {{ user.lastName }}</h3>
              <p class="profile-card__nametag">@{{ user.textID }}</p>
            </div>

            <user-actions-button
              :user-id="user.findcreekID"
              :is-subscribed="user.isSubscribed"
              @refresh="refresh"
            />
          </div>

          <p class="profile-card__mobile-bio">{{ user.bio }}</p>
        
          <div class="profile-card__statistics-list">
            <p
              v-for="{ title, value } in getUserStatistics" :key="title"
              class="profile-card__statistics-item"
            >
              <strong>{{ value }}</strong>
              <span>{{ title }}</span>
            </p>
          </div>
        </div>
      </section>

      <card card-class="desktop-social-media" v-if="user.contacts.socialNetworks.length">
        <social-media-list :items="user.contacts.socialNetworks" />
      </card>

      <card title="Навыки" card-class="skills" v-if="skills && skills.length">
        <ul class="skills__list">
          <li v-for="skill in skills" :key="skill" class="skills__item">
            {{ skill }}
          </li>
        </ul>
      </card>
    </aside>

    <section class="user-view__center-container">
      <button class="bio" @click="isBioOpen = true" v-if="user.bio">
        <card title="О себе">
          <p class="bio__text">{{ user.bio }}</p>
        </card>
      </button>

      <button class="create-post-button" @click="openPostEditor">
        <icon-edit />
        <span>Расскажите, что произошло</span>
      </button>

      <user-post
        v-for="post in posts" :key="post.date.unixTime"
        :post="post"
        :author="user"
      />

      <posts-observer @intersect="next()" />
    </section>

    <aside class="user-view__left-aside">
      <card v-if="projects" title="Последние проекты">
        <div class="projects-list">
          <router-link
            class="projects-list__item" :to="`/project/${project.id}`"
            v-for="project in getProjectsList" :key="project.id"
          >
            <placeholder-img img-class="projects-list__icon" :src="project.avatar.avatarCompressed" />
            <div>
              <h5 class="projects-list__name">{{ project.name }}</h5>
              <small class="projects-list__name-descritpion">
                Начало работ:&#32;
                <span>{{ project.foundationDate || "???" }}</span>
              </small>
            </div>
          </router-link>
        </div>

        <button
          class="projects-list__more-button"
          v-if="!showAllProjects" @click="showAllProjects = true"
        >Еще</button>
      </card>
    </aside>
  </section>
</template>

<style scoped lang="scss" src="./UserView.scss" />
