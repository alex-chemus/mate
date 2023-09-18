<script lang="ts" setup>
import { defineProps, computed, ref } from 'vue'
import dayjs from 'dayjs'
import { Avatar, FullUserPost } from '@/shared/types'
import { CommentsWidget } from '@/shared/widgets'
import { useFetchApi } from '@/shared/utils'
import { WidgetLayout } from './layouts'
import { useViewer } from './hooks'
import {
  ImageViewer, PostText, PostHeader, PostGallery,
  PostButtons
} from './ui'

type AuthorProps = {
  firstName: string,
  lastName: string,
  textID: string,
  findcreekID: number,
  avatar: Avatar
}

const props = defineProps<{
  post: FullUserPost,
  author: AuthorProps
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
    ? await fetchApi('userPosts.removeLike', { postID: props.post.id.toString() }) 
    : await fetchApi('userPosts.like', { postID: props.post.id.toString() })
}

const handleDislike = async () => {
  reaction.value = reaction.value.isDisliked
    ? await fetchApi('userPosts.removeDislike', { postID: props.post.id.toString() }) 
    : await fetchApi('userPosts.dislike', { postID: props.post.id.toString() })
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
  return props.post.media
    .filter((f) => f.additionalData.fileType === 'image')
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
        :avatar="author.avatar.avatarCompressed ?? author.avatar.avatar"
        :author="`${author.firstName} ${author.lastName}`"
        :author-id="author.findcreekID"
        :author-text-id="author.textID"
        :date-string="getDate"
      />
    </template>

    <template #gallery>
      <post-gallery
        :images="getImages"
        @image-click="p => viewImage = p"
      />
    </template>

    <template #text>
      <post-text :text="post.description" />
    </template>

    <template #buttons>
      <post-buttons
        :reaction="reaction"
        :comments="post.comments.length"
        @comment="showComments = !showComments"
        @like="handleLike"
        @dislike="handleDislike"
      />
    </template>

    <template #comments-widget>
      <comments-widget
        :post-id="post.id"
        post-type="user"
      />
    </template>
  </widget-layout>
</template>
