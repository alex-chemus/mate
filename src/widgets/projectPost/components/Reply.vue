<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { CommentInfo, ReplyInfo } from '@/types'
import { useTimeUtils, useUserState } from '@/utils'
import CommentEditor from './CommentEditor.vue'
import LikeSvg from './LikeSvg.vue'
import DislikeSvg from './DislikeSvg.vue'

const props = defineProps<{
  replyInfo: ReplyInfo,
  commentInfo: CommentInfo,
  newReply: number | null,
  editing: number | null
}>()

const emit = defineEmits<{
  (e: 'update:newReply', payload: number | null): void,
  (e: 'update:editing', payload: number | null): void,
  (e: 'new-reply', payload: { text: string, id: number }): void,
  (e: 'like', payload: ReplyInfo): void,
  (e: 'dislike', payload: ReplyInfo): void,
  (e: 'edit-comment', payload: { text: string, id: number }): void
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

const onNewReply = ({ text, id }: { text: string, id: number }) => {
  emit('new-reply', { text, id })
  emit('update:newReply', null)
}

const onReplyButtonClick = () => {
  if (props.newReply === null)
    emit('update:newReply', props.replyInfo.id)
  else
    emit('update:newReply', null)
}

const onEditClick = () => {
  if (props.editing === null)
    emit('update:editing', props.replyInfo.id)
  else
    emit('update:editing', null)
}

const onEdit = ({ text, id }: { text: string, id: number }) => {
  emit('update:editing', null)
  emit('edit-comment', { text, id })
}
</script>

<template>
  <div class="reply-comment">
    <div class="heading-container">
      <img class="avatar" :src="replyInfo.authorData.avatar.avatarCompressed" alt="" />
      <div class="heading-wrapper">
        <h6 class="name">{{ replyInfo.authorData.firstName }} {{ replyInfo.authorData.lastName }}</h6>
        <p class="name-tag">@{{ replyInfo.authorData.textID }}</p>
      </div>
      <p class="time">{{ getTime({ unixTime: replyInfo.date.unixTime, date: replyInfo.date.date }) }}</p>
    </div>

    <div
      v-if="replyInfo.authorID === userState.id && editing === replyInfo.id"
      class="editing-wrapper"
    >
      <comment-editor
        :initial-text="replyInfo.text"
        :no-avatar="true"
        placeholder="Отредактируйте комментарий"
        @submit="p => onEdit({ text: p, id: replyInfo.id })"
      />
    </div>
    <template v-else>
      <p v-if="replyInfo.answerToCommentID === replyInfo.rootCommentID" class="comment-text">
        {{ replyInfo.text }}
      </p>
      <p v-else class="comment-text">
        <span class="reply-tag">
          @{{ commentInfo.answers!.find((a) => a.id === replyInfo.answerToCommentID)!.authorData.textID }}
        </span>
        {{ replyInfo.text }}
      </p>
    </template>

    <div class="buttons-container">
      <button class="reply-button" @click="onReplyButtonClick">Ответить</button>
      <button
        v-if="replyInfo.authorID === userState.id"
        class="edit-button"
        @click="onEditClick"
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-pencil" />
        </svg>
      </button>
      <button
        class="like-button" :class="{ 'active': replyInfo.isLiked }"
        @click="emit('like', replyInfo)"
      >
        <like-svg :active="replyInfo.isLiked" />
        <span>{{ replyInfo.likesNumber }}</span>
      </button>
      <button
        class="dislike-button" :class="{ 'active': replyInfo.isDisliked }"
        @click="emit('dislike', replyInfo)"
      >
        <dislike-svg :active="replyInfo.isDisliked" />
        <span>{{ replyInfo.dislikesNumber }}</span>
      </button>
    </div>

    <div v-if="newReply === replyInfo.id">
      <comment-editor @submit="text => onNewReply({ text, id: replyInfo.id })" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

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

.buttons-container {
  margin-bottom: 12px;
  @include flex(flex-start, center);
  gap: 9px;
}

.editing-wrapper {
  margin-bottom: 10px;
}

.edit-button {
  color: var(--text-color-1);
}

.like-button {
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
  @include findcreek(11px, var(--text-color-1));
  transition: var(--fast);

  &:hover,
  &:focus {
    color: var(--accent);
  }
}
</style>
