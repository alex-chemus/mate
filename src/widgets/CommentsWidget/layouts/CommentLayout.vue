<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { Comment } from '@/types'
import { useTimeUtils, useUserState } from '@/utils'

defineProps<{
  comment: Comment,
  replyToId: number | null,
  editingId: number | null
}>()

const userState = useUserState()
const { isToday, isYesterday } = useTimeUtils()

const getTime = ({ unixTime, date }: { unixTime: number, date: string }) => {
  if (isToday(unixTime * 1000))
    return date.slice(11, 16)

  if (isYesterday(unixTime * 1000))
    return `Вчера в ${date.slice(11, 16)}`

  return date
}

const isRepliesOpen = ref(false)
</script>

<template>
  <div class="root-comment">
    <div class="heading-container">
      <img class="avatar" :src="comment.authorData.avatar.avatarCompressed" alt="" />
      <div class="heading-wrapper">
        <h6 class="name">{{ comment.authorData.firstName }} {{ comment.authorData.lastName }}</h6>
        <p class="name-tag">@{{ comment.authorData.textID }}</p>
      </div>
      <p class="time">{{ getTime({ unixTime: comment.date.unixTime, date: comment.date.date }) }}</p>
    </div>

    <div
      v-if="comment.authorID === userState.id && editingId === comment.id"
      class="editing-wrapper"
    >
      <slot name="edit-comment-form" />
    </div>
    <p v-else class="comment-text">
      {{ comment.text }}
    </p>

    <div class="buttons-container">
      <slot name="add-reply-button" />
      <slot name="set-editing-button" />

      <div class="like-button-wrapper">
        <slot name="like-button" />
      </div>
      <slot name="dislike-button" />
    </div>

    <div v-if="replyToId === comment.id" class="comment-editor-wrapper">
      <slot name="add-reply-form" />
    </div>

    <template v-if="comment.answers && comment.answersNumber > 0">
      <div v-if="isRepliesOpen" class="replies-section">
        <button class="close-button" @click="isRepliesOpen = false">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-chevron-up" />
          </svg>
        </button>

        <div class="replies-container">
          <slot name="replies" :replies="comment.answers" />
        </div>
      </div>

      <button v-else class="replies-button" @click="isRepliesOpen = true">
        Показать ответы
      </button>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.root-comment {
 margin-left: 50px;
}

.heading-container {
  @include flex(flex-start, center);
  gap: 10px;
  margin-bottom: 11px;
}

.avatar {
  width: 28px;
  aspect-ratio: 1;
  border-radius: 100vmax;
  object-fit: cover;
}

.name {
  margin-bottom: 1px;
  @include findcreek-medium(14px, var(--heading-color-2));
}

.name-tag {
  @include findcreek(11px, var(--text-color-1));
}

.time {
  @include findcreek(10px, var(--text-color-1));
  align-self: flex-start;
}

.comment-text {
  @include findcreek(13px, var(--heading-color-1));
  margin-bottom: 10px;
}

.editing-wrapper {
  margin-bottom: 10px;
}

.buttons-container {
  margin-bottom: 12px;
  @include flex(flex-start, center);
  gap: 9px;
}

.edit-button {
  color: var(--text-color-1);
}

.like-button-wrapper {
  margin-left: auto;
}

.like-button,
.dislike-button {
  @include findcreek-medium(11px, var(--text-color-1));
  @include flex(flex-start, center);
  gap: 5px;
  transition: var(--fast);

  &:hover,
  &:focus,
  &.active {
    color: var(--accent);
  }
}

.comment-editor-wrapper {
  margin-bottom: 10px;
}

.replies-button {
  @include findcreek-medium(11px, var(--accent));
}

.reply-button {
  @include findcreek(11px, var(--text-color-1));
  transition: var(--fast);

  &:hover,
  &:focus {
    color: var(--accent);
  }
}

.replies-section {
  border-top: 1px solid var(--bg-color-3);
  padding-top: 15px;
  display: grid;
  grid-template-columns: 35px 1fr;
}

.close-button {
  width: 24px;
  aspect-ratio: 1;
  border-radius: 100vmax;
  color: var(--gray-1);
  border: 1px solid currentColor;
  background-color: var(--bg-color-3);
}

.replies-container {
  @include flex(flex-start, stretch, column);
  gap: 15px;
}
</style>
