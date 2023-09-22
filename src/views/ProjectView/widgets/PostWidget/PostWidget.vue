<script lang="ts" setup>
import {
  defineEmits, defineProps, computed, ref
} from 'vue'
import {
  FullProjectPost, Avatar
} from '@/shared/types'
import { CommentsWidget } from '@/shared/components'
import { useDate, useLikes, useViewer } from './hooks'
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
  const images = props.post.media.filter((f) => f.additionalData.fileType === 'image')
  return images
})

const { viewImage, nextImage, prevImage } = useViewer({ getImages })

const localReaction = ref<1 | 0 | -1 | null>(null)
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
        :author="`${author.firstName} ${author.lastName}`"
        :avatar="project.avatar.avatarCompressed ?? project.avatar.avatar"
        :author-id="author.findcreekID"
        :text-id="project.textID"
        :date-string="date"
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
        :likes="post.likesNumber"
        :dislikes="post.dislikesNumber"
        :reaction="getReaction"
        :comments="post.comments.length"
        @like="() => {
          localReaction = localReaction === 1 ? 0 : 1
          uploadLike(post.id, post.isLiked, post.isDisliked)
        }"
        @dislike="() => {
          localReaction= localReaction === -1 ? 0 : -1
          uploadDislike(post.id, post.isLiked, post.isDisliked)
        }"
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
