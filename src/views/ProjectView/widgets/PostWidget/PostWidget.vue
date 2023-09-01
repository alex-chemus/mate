<script lang="ts" setup>
import {
  defineEmits, defineProps, computed, ref
} from 'vue'
import {
  FullProjectPost, FullProject, FullUser
} from '@/shared/types'
import { CommentsWidget } from '@/shared/widgets'
import { useDate, useLikes, useViewer } from './hooks'
import { WidgetLayout } from './layouts'
import {
  PostButtons, PostText, PostGallery, PostHeader,
  ImageViewer
} from './ui'

const props = defineProps<{
  post: FullProjectPost,
  author: FullUser,
  project: FullProject
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

const getReaction = computed(() => {
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
        @like="uploadLike(post.id, post.isLiked, post.isDisliked)"
        @dislike="uploadDislike(post.id, post.isLiked, post.isDisliked)"
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
