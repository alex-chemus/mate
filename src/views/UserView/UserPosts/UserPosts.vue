<script setup lang="ts">
import { ref, onMounted, watch, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import { FullUserPost } from '@/shared/types'
import { useFetchApi } from '@/shared/utils'
import Card from '../Card/Card.vue'
import { PlaceholderImg } from '@/shared/ui'
import dayjs from 'dayjs'

// todo: мб заставить саню вернуть посты вместе с инфой о юзере
defineProps<{
  userAvatar: string,
  userName: string,
  userTag: string
}>()

const route = useRoute()

const fetchApi = useFetchApi()

const limit = ref({
  from: 0,
  amout: 20
})

const posts = ref<FullUserPost[] | null>(null)
const fetchPosts = async () => {
  const userID = route.params.id as string
  posts.value =  await fetchApi('userPosts.getUserPosts', {
    userID,
    page: `${limit.value.from},${limit.value.amout}`
  }) as FullUserPost[]
}
onMounted(fetchPosts)
watch(() => route.params.id, fetchPosts)

const getDate = (dateSeconds: number) => {
  const date = dayjs.unix(dateSeconds)

  switch (true) {
    case dayjs().isBefore(date, 'day'): return `Вчера в ${date.format('h:mm')}`
    case dayjs().isSame(date, 'day'): return `Сегодня в ${date.format('h:mm')}`
    case dayjs().isSame(date, 'year'): return date.format('h:mm DD.MM')
    default: return date.format('h:mm DD.MM.YY')
  }
}
</script>

<template>
  <section class="user-posts" v-if="posts">
    <card card-class="user-posts__post" v-for="post in posts" :key="post.id">
      <router-link class="user-posts__author" :to="`/user/${post.authorID}`">
        <placeholder-img img-class="user-posts__avatar" :src="userAvatar" />

        <div class="user-posts__author-wrapper" :to="`/user/${post.authorID}`">
          <h6 class="user-posts__author-heading">{{ userName }}</h6>
          <p class="user-posts__author-nametag">@{{ userTag }}</p>
        </div>

        <div class="user-posts__post-date">{{ getDate(post.date.unixTime) }}</div>
      </router-link>

      
    </card>
  </section>
</template>

<style scoped lang="scss" src="./UserPosts.scss" />