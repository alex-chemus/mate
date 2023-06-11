<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { CommentInfo, ReplyInfo } from '@/types'
import { useTimeUtils, useUserState } from '@/utils'
import { AddReplyButton, SetEditingButton } from '../ui'
// import CommentForm from './CommentForm.vue'
// import Reply from './Reply.vue'
// import LikeSvg from './LikeSvg.vue'
// import DislikeSvg from './DislikeSvg.vue'

defineProps<{
  comment: CommentInfo,
  replyToId: number | null,
  editingId: number | null
}>()

const emit = defineEmits<{
  // (e: 'add-reply', payload: { text: string, id: number }): void,
  // (e: 'like', payload: CommentInfo | ReplyInfo): void,
  // (e: 'dislike', payload: CommentInfo | ReplyInfo): void,
  // (e: 'edit-comment', payload: { text: string, id: number }): void
  // (e: 'set-reply-to-id', id: number | null): void,
  // (e: 'set-editing-id', id: number | null): void
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
// const replyToID = ref<null | number>(null)
// const editingID = ref<number | null>(null)

// const emitNewReply = ({ text, id }: { text: string, id: number }) => {
//   emit('add-reply', { text, id })
//   replyToID.value = null
// }

// const emitEditComment = ({ text, id }: { text: string, id: number }) => {
//   if (text !== '') {
//     emit('edit-comment', { text, id })
//     editingID.value = null
//   }
// }
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
      <!-- <comment-form
        :initial-text="commentInfo.text"
        :no-avatar="true"
        placeholder="Отредактируйте комментарий"
        @submit="text => emitEditComment({ text, id: commentInfo.id })"
      /> -->
      <slot name="edit-comment-form" />
    </div>
    <p v-else class="comment-text">
      {{ comment.text }}
    </p>

    <div class="buttons-container">
      <!-- <button
        class="reply-button"
        @click="replyToID = replyToID === null ? commentInfo.id : null"
      >Ответить</button> -->
      <slot name="add-reply-button" />

      <!-- <button
        v-if="commentInfo.authorID === userState.id"
        class="edit-button"
        @click="editingID = editingID === null ? commentInfo.id : null"
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-pencil" />
        </svg>
      </button> -->
      <slot name="set-editing-button" />

      <!-- <button
        class="like-button" :class="{ 'active': commentInfo.isLiked }"
        @click="emit('like', commentInfo)"
      >
        <like-svg :active="commentInfo.isLiked" />
        <span>{{ commentInfo.likesNumber }}</span>
      </button> -->
      <div class="like-button-wrapper">
        <slot name="like-button" />
      </div>
      <!-- <button
        class="dislike-button" :class="{ 'active': commentInfo.isDisliked }"
        @click="emit('dislike', commentInfo)"
      >
        <dislike-svg :active="commentInfo.isDisliked" />
        <span>{{ commentInfo.dislikesNumber }}</span>
      </button> -->
      <slot name="dislike-button" />
    </div>

    <div v-if="replyToId === comment.id" class="comment-editor-wrapper">
      <!-- <comment-form @submit="text => emitNewReply({ text, id: commentInfo.id })" /> -->
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
          <!-- <reply
            v-for="reply in commentInfo.answers" :key="reply.id"
            :reply-info="reply"
            :comment-info="commentInfo"
            v-model:new-reply="newReply"
            v-model:editing="editingID"
            @new-reply="p => emit('add-reply', p)"
            @like="p => emit('like', p)"
            @dislike="p => emit('dislike', p)"
            @edit-comment="p => emit('edit-comment', p)"
          /> -->

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
