<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'
import { FullUserInfo, FullUserPostInfo } from '@/types'
import { WidgetLayout } from './layouts'
import { useDate, useViewer, useLikes } from './hooks'
import {
  ImageViewer, PostText, PostHeader, PostGallery,
  PostButtons
} from './ui'

const props = defineProps<{
  post: FullUserPostInfo,
  author: FullUserInfo
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

const getReaction = computed(() => {
  if (props.post.isLiked) return 1
  if (props.post.isDisliked) return -1
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

    <template #buttons>
      <post-buttons
        :reaction="getReaction"
        :likes="post.likesNumber"
        :dislikes="post.dislikesNumber"
        @like="uploadLike(post.id, post.isLiked, post.isDisliked)"
        @dislike="uploadDislike(post.id, post.isLiked, post.isDisliked)"
      />
    </template>
  </widget-layout>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
