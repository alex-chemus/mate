<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { useTimeUtils, useUserState } from '@/utils'
import { CommentInfo, ReplyInfo } from '@/types'
import CommentForm from './CommentForm.vue'
import LikeSvg from './LikeSvg.vue'
import DislikeSvg from './DislikeSvg.vue'

const props = defineProps<{
  reply: ReplyInfo,
  comment: CommentInfo,
  replyToId: number | null,
  editingId: number | null
}>()

// const emit = defineEmits<{
//   (e: 'update:newReply', payload: number | null): void,
//   (e: 'update:editing', payload: number | null): void,
//   (e: 'new-reply', payload: { text: string, id: number }): void,
//   (e: 'like', payload: reply): void,
//   (e: 'dislike', payload: reply): void,
//   (e: 'edit-comment', payload: { text: string, id: number }): void,
//   (e: 'set-reply-to-id', id: number | null): void,
//   (e: 'set-editing-id', id: number | null): void
// }>()

const userState = useUserState()
const { isToday, isYesterday } = useTimeUtils()

const getTime = ({ unixTime, date }: { unixTime: number, date: string }) => {
  if (isToday(unixTime * 1000))
    return date.slice(11, 16)

  if (isYesterday(unixTime * 1000))
    return `Вчера в ${date.slice(11, 16)}`

  return date
}

// const onNewReply = ({ text, id }: { text: string, id: number }) => {
//   emit('new-reply', { text, id })
//   emit('update:newReply', null)
// }

// const onReplyButtonClick = () => {
//   if (props.newReply === null)
//     emit('update:newReply', props.reply.id)
//   else
//     emit('update:newReply', null)
// }

// const onEditClick = () => {
//   if (props.editing === null)
//     emit('update:editing', props.reply.id)
//   else
//     emit('update:editing', null)
// }

// const onEdit = ({ text, id }: { text: string, id: number }) => {
//   emit('update:editing', null)
//   emit('edit-comment', { text, id })
// }
</script>

<template>
  <div class="reply-comment">
    <div class="heading-container">
      <img class="avatar" :src="reply.authorData.avatar.avatarCompressed" alt="" />
      <div class="heading-wrapper">
        <h6 class="name">{{ reply.authorData.firstName }} {{ reply.authorData.lastName }}</h6>
        <p class="name-tag">@{{ reply.authorData.textID }}</p>
      </div>
      <p class="time">{{ getTime({ unixTime: reply.date.unixTime, date: reply.date.date }) }}</p>
    </div>

    <div
      v-if="reply.authorID === userState.id && editingId === reply.id"
      class="editing-wrapper"
    >
      <!-- <comment-form
        :initial-text="reply.text"
        :no-avatar="true"
        placeholder="Отредактируйте комментарий"
        @submit="text=> onEdit({ text, id: reply.id })"
      /> -->
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

    <div class="buttons-container">
      <!-- <button class="reply-button" @click="onReplyButtonClick">Ответить</button> -->
      <slot name="add-reply-button" />

      <!-- <button
        v-if="reply.authorID === userState.id"
        class="edit-button"
        @click="onEditClick"
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-pencil" />
        </svg>
      </button> -->
      <slot name="set-editing-button" />

      <!-- <button
        class="like-button" :class="{ 'active': reply.isLiked }"
        @click="emit('like', reply)"
      >
        <like-svg :active="reply.isLiked" />
        <span>{{ reply.likesNumber }}</span>
      </button> -->
      <div class="like-button-wrapper">
        <slot name="like-button" />
      </div>

      <!-- <button
        class="dislike-button" :class="{ 'active': reply.isDisliked }"
        @click="emit('dislike', reply)"
      >
        <dislike-svg :active="reply.isDisliked" />
        <span>{{ reply.dislikesNumber }}</span>
      </button> -->
      <slot name="dislike-button" />
    </div>

    <div v-if="replyToId === reply.id">
      <!-- <comment-form @submit="text => onNewReply({ text, id: reply.id })" /> -->
      <slot name="add-reply-form" />
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
  @include findcreek(11px, var(--text-color-1));
  transition: var(--fast);

  &:hover,
  &:focus {
    color: var(--accent);
  }
}
</style>
