<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useFetchApi } from '@/shared/utils'
import { PostWidget as UserPost } from '@/views/UserView/widgets'
import { PostWidget as ProjectPost } from '@/views/ProjectView/widgets'
import { PostsObserver } from '../ProjectView/ui'
import { IPost } from './types'
import { Loader } from '@/shared/ui'

const fetchApi = useFetchApi()

const page = ref(1)

const posts = ref<IPost[] | null>(null)

const fetchFeed = async () => {
  posts.value = await fetchApi('feed.getPosts', {
    page: `${page.value}`
  }) as IPost[]
}
onMounted(fetchFeed)

const fetchNextChuck = async () => {
  if (posts.value === null) return
  page.value++
  const res = await fetchApi('feed.getPosts', {
    page: `${page.value}`
  }) as IPost[]
  posts.value = [...posts.value, ...res]
}
</script>

<template>
  <section class="posts-feed" v-if="posts">
    <template v-for="post in posts" :key="post.id">
      <user-post
        v-if="post.postType === 'userPost'"
        :post="post"
        :author="post.authorData"
      />

      <project-post
        v-if="post.postType === 'projectPost'"
        :post="post"
        :project="post.projectData"
        :author="{ findcreekID: post.authorData.id, ...post.authorData }"
      />
    </template>

    <posts-observer @intersect="fetchNextChuck" />
  </section>

  <div v-else class="posts-loader">
    <loader />
  </div>
</template>

<style scoped lang="scss" src="./PostsFeedView.scss" />