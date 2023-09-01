<script lang="ts" setup>
import { defineProps } from 'vue'
import { useTimeUtils, useUserState } from '@/shared/utils'
import { Comment, Reply } from '@/shared/types'

defineProps<{
  reply: Reply,
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
</script>

<template>
  <div class="reply-comment" :class="replyToId === reply.id ? 'active-form' : ''">
    <router-link :to="`/user/${reply.authorID}`" class="heading-container">
      <img class="avatar" :src="reply.authorData.avatar.avatarCompressed" alt="" />
      <div class="heading-wrapper">
        <div class="name-wrapper">
          <h6 class="name">{{ reply.authorData.firstName }} {{ reply.authorData.lastName }}</h6>
          <p class="time">{{ getTime({ unixTime: reply.date.unixTime, date: reply.date.date }) }}</p>
        </div>
        <p class="name-tag">@{{ reply.authorData.textID }}</p>
      </div>
    </router-link>

    <div
      v-if="reply.authorID === userState.id && editingId === reply.id"
      class="editing-wrapper"
    >
      <slot name="edit-reply-form" />
    </div>
    <template v-else>
      <p v-if="reply.answerToCommentID === reply.rootCommentID" class="comment-text">
        {{ reply.text }}
      </p>
      <p v-else class="comment-text">
        <span class="reply-tag">
          @{{ comment.answers!.find((a) => a.id === reply.answerToCommentID)!.authorData.textID }}
        </span>
        {{ reply.text }}
      </p>
    </template>

    <div class="buttons-container" :class="replyToId === reply.id ? 'active-form' : ''">
      <slot name="add-reply-button" />

      <slot name="set-editing-button" />

      <div class="like-button-wrapper">
        <slot name="like-button" />
      </div>

      <slot name="dislike-button" />
    </div>

    <div v-if="replyToId === reply.id">
      <slot name="add-reply-form" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.reply-comment {
  &.active-form {
    margin-bottom: 10px;
  }
}

.heading-container {
  @include flex(flex-start, center);
  gap: 10px;
  margin-bottom: 11px;
  text-decoration: none;
}

.avatar {
  width: 28px;
  aspect-ratio: 1;
  border-radius: 100vmax;
  object-fit: cover;
}

.name-wrapper {
  @include flex(flex-start, baseline);
  gap: 12px;
}

.name {
  margin-bottom: 2px;
  @include findcreek-medium(14px, var(--heading-color-1));
}

.name-tag {
  @include findcreek(12px, var(--text-color-2));
}

.time {
  @include findcreek(12px, var(--text-color-2));
}

.comment-text {
  @include findcreek(14px, var(--heading-color-1));
  margin-bottom: 10px;
}

.buttons-container {
  @include flex(flex-start, center);
  gap: 13px;

  &.active-form {
    margin-bottom: 15px;
  }
}

.editing-wrapper {
  margin-bottom: 10px;
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

.reply-tag {
  color: var(--accent);
}

.reply-button {
  @include findcreek(12px, var(--text-color-1));
  transition: var(--fast);

  &:hover,
  &:focus {
    color: var(--accent);
  }
}
</style>
