<script lang="ts" setup>
import {
  defineEmits, defineProps, computed, ref
} from 'vue'
import {
  FullProjectPostInfo, FullProjectInfo, FullUserInfo, FileInfo
} from '@/types'
import ProjectPostLayout from './ProjectPostLayout.vue'
import { useDate, useLikes, useViewer } from './hooks'
import {
  PostButtons, PostComment, PostText, PostGallery, PostHeader, ImageViewer
} from './components'

const props = defineProps<{
  postInfo: FullProjectPostInfo,
  authorInfo: FullUserInfo,
  projectInfo: FullProjectInfo
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

  <project-post-layout>
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
        @like="like(postInfo.id, postInfo.isLiked, postInfo.isDisliked)"
        @dislike="dislike(postInfo.id, postInfo.isLiked, postInfo.isDisliked)"
      />
    </template>

    <!-- <template #author>
      <post-author :author="author" />
    </template>

    <template #buttons>
      <post-buttons
        :likes="postLikes"
        :dislikes="postDislikes"
        :comments="comments"
        :reaction="reaction"
        @like="reaction = 1"
      />
    </template> -->

    <template #comment>
      <post-comment />
    </template>
  </project-post-layout>
</template>
