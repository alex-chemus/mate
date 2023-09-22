<script lang="ts" setup>
import { defineProps, computed, ref } from 'vue'
import dayjs from 'dayjs'
import { FullProjectPost, Avatar } from '@/shared/types'
import { CommentsWidget } from '@/shared/components'
import { useFetchApi } from '@/shared/utils'
import { useViewer } from './hooks'
import { WidgetLayout } from './layouts'
import {
  PostButtons, PostText, PostGallery, PostHeader,
  ImageViewer
} from './ui'

type ProjectProps = {
  textID: string,
  avatar: Avatar
}

type UserProps = {
  firstName: string,
  lastName: string,
  findcreekID: number
}

const props = defineProps<{
  post: FullProjectPost,
  author: UserProps,
  project: ProjectProps
}>()

const fetchApi = useFetchApi()

const reaction = ref({
  likes: props.post.likesNumber,
  dislikes: props.post.dislikesNumber,
  isLiked: props.post.isLiked,
  isDisliked: props.post.isDisliked
})

const handleLike = async () => {
  reaction.value = reaction.value.isLiked
    ? await fetchApi('projectPosts.removeLike', { projectPostID: props.post.id.toString() }) 
    : await fetchApi('projectPosts.like', { projectPostID: props.post.id.toString() })
}

const handleDislike = async () => {
  reaction.value = reaction.value.isDisliked
    ? await fetchApi('projectPosts.removeDislike', { projectPostID: props.post.id.toString() }) 
    : await fetchApi('projectPosts.dislike', { projectPostID: props.post.id.toString() })
}

const getDate = computed(() => {
  const date = dayjs.unix(props.post.date.unixTime)
  switch (true) {
    case dayjs().isBefore(date, 'day'): return `Вчера в ${date.format('H:mm')}`
    case dayjs().isSame(date, 'day'): return `Сегодня в ${date.format('H:mm')}`
    case dayjs().isSame(date, 'year'): return date.format('H:mm DD.MM')
    default: return date.format('H:mm DD.MM.YY')
  }
})

const getImages = computed(() => {
  const images = props.post.media.filter((f) => f.additionalData.fileType === 'image')
  return images
})

const { viewImage, nextImage, prevImage } = useViewer({ getImages })

const showComments = ref(false)
</script>

<template>
  <image-viewer
    :src="viewImage && viewImage.file.additionalData.urlToFile"
    :i="viewImage && viewImage.i"
    @close="viewImage = null"
    @prev="prevImage"
    @next="nextImage"
  />

  <widget-layout :show-comments="showComments">
    <template #header>
      <post-header
        :author="`${author.firstName} ${author.lastName}`"
        :avatar="project.avatar.avatarCompressed ?? project.avatar.avatar"
        :author-id="author.findcreekID"
        :text-id="project.textID"
        :date-string="getDate"
      />
    </template>

    <template #text>
      <post-text :text="post.description" />
    </template>

    <template #gallery>
      <post-gallery
        :images="getImages"
        @image-click="p => viewImage = p"
      />
    </template>

    <template #buttons>
      <post-buttons
        :reaction="reaction"
        :comments="post.comments.length"
        @like="handleLike"
        @dislike="handleDislike"
        @comment="showComments = !showComments"
      />
    </template>

    <template #comments-widget>
      <comments-widget
        :post-id="post.id"
        post-type="project"
      />
    </template>
  </widget-layout>
</template>
