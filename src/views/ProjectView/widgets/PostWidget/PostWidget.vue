<script lang="ts" setup>
import {
  defineEmits, defineProps, computed
} from 'vue'
import {
  FullProjectPost, FullProject, FullUser
} from '@/types'
import { CommentsWidget } from '@/widgets'
import { useDate, useLikes, useViewer } from './hooks'
import { WidgetLayout } from './layouts'
import {
  PostButtons, PostText, PostGallery, PostHeader,
  ImageViewer
} from './ui'

const props = defineProps<{
  postInfo: FullProjectPost,
  authorInfo: FullUser,
  projectInfo: FullProject
}>()

const emit = defineEmits<{
  (e: 'reload', id: number): void
}>()

const { uploadLike, uploadDislike } = useLikes({
  onUpdate: () => emit('reload', props.postInfo.id)
})

const date = useDate({
  timestamp: computed(() => props.postInfo.date.unixTime * 1000)
})

const getImages = computed(() => {
  const images = props.postInfo.media.filter((f) => f.additionalData.fileType === 'image')
  return images
})

const { viewImage, nextImage, prevImage } = useViewer({ getImages })

const getReaction = computed(() => {
  if (props.postInfo.isLiked) return 1
  if (props.postInfo.isDisliked) return -1
  return 0
})
</script>

<template>
  <image-viewer
    :src="viewImage && viewImage.file.additionalData.urlToFile"
    :i="viewImage && viewImage.i"
    @close="viewImage = null"
    @prev="prevImage"
    @next="nextImage"
  />

  <widget-layout>
    <template #header>
      <post-header
        :title="postInfo.title"
        :author="`${authorInfo.firstName} ${authorInfo.lastName}`"
        :avatar="projectInfo.avatar.avatarCompressed ?? projectInfo.avatar.avatar"
        :author-id="authorInfo.findcreekID"
        :text-id="projectInfo.textID"
        :date-string="date"
      />
    </template>

    <template #text>
      <post-text :text="postInfo.description" />
    </template>

    <template #gallery>
      <post-gallery
        :images="getImages"
        @image-click="p => viewImage = p"
      />
    </template>

    <template #buttons>
      <post-buttons
        :likes="postInfo.likesNumber"
        :dislikes="postInfo.dislikesNumber"
        :reaction="getReaction"
        @like="uploadLike(postInfo.id, postInfo.isLiked, postInfo.isDisliked)"
        @dislike="uploadDislike(postInfo.id, postInfo.isLiked, postInfo.isDisliked)"
      />
    </template>

    <template #comments-widget>
      <comments-widget
        :post-id="postInfo.id"
        post-type="project"
      />
    </template>
  </widget-layout>
</template>
