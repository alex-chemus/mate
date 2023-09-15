<script lang="ts" setup>
import {
  defineProps, defineEmits, computed, ref
} from 'vue'
import { Avatar, FullUserPost } from '@/shared/types'
import { CommentsWidget } from '@/shared/widgets'
import { WidgetLayout } from './layouts'
import { useDate, useViewer, useLikes } from './hooks'
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

const emit = defineEmits<{
  (e: 'reload', id: number): void
}>()

const { uploadLike, uploadDislike } = useLikes({
  onUpdate: () => emit('reload', props.post.id)
})

const date = useDate({
  timestamp: computed(() => props.post.date.unixTime * 1000)
})

const getImages = computed(() => {
  return props.post.media
    .filter((f) => f.additionalData.fileType === 'image')
})

const { viewImage, nextImage, prevImage } = useViewer({ getImages })

const localReaction = ref<-1 | 0 | 1 | null>(null)
const getReaction = computed(() => {
  if (localReaction.value !== null) return localReaction.value
  if (props.post.isLiked) return 1
  if (props.post.isDisliked) return -1
  return 0
})

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
        :date-string="date"
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

    <!-- <template #heading>
      <post-heading :heading="post.title" />
    </template> -->

    <template #buttons>
      <post-buttons
        :reaction="getReaction"
        :likes="post.likesNumber"
        :dislikes="post.dislikesNumber"
        :comments="post.comments.length"
        @like="() => {
          localReaction = localReaction === 1 ? 0 : 1
          uploadLike(post.id, post.isLiked, post.isDisliked)
        }"
        @dislike="() => {
          localReaction = localReaction === -1 ? 0 : -1
          uploadDislike(post.id, post.isLiked, post.isDisliked)
        }"
        @comment="showComments = !showComments"
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
