<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'
import { FullUserInfo, FullUserPostInfo } from '@/types'
import { useDate, useViewer, useLikes } from './hooks'
import {
  ImageViewer, PostText, PostHeader, PostGallery,
  PostButtons
} from './components'
import UserPostLayout from './UserPostLayout.vue'

const props = defineProps<{
  postInfo: FullUserPostInfo,
  authorInfo: FullUserInfo
}>()

const emit = defineEmits<{
  (e: 'reload', id: number): void
}>()

const { like, dislike } = useLikes({
  onUpdate: () => emit('reload', props.postInfo.id)
})

const date = useDate({
  timestamp: computed(() => props.postInfo.date.unixTime * 1000)
})

const getImages = computed(() => {
  return props.postInfo.media
    .filter((f) => f.additionalData.fileType === 'image')
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

  <user-post-layout>
    <template #header>
      <post-header
        :avatar="authorInfo.avatar.avatarCompressed ?? authorInfo.avatar.avatar"
        :author="`${authorInfo.firstName} ${authorInfo.lastName}`"
        :author-id="authorInfo.findcreekID"
        :author-text-id="authorInfo.textID"
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
      <post-text :text="postInfo.description" />
    </template>

    <template #buttons>
      <post-buttons
        :reaction="getReaction"
        :likes="postInfo.likesNumber"
        :dislikes="postInfo.dislikesNumber"
        @like="like(postInfo.id, postInfo.isLiked, postInfo.isDisliked)"
        @dislike="dislike(postInfo.id, postInfo.isLiked, postInfo.isDisliked)"
      />
    </template>
  </user-post-layout>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
