<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { CommentInfo, ReplyInfo } from '@/types'
import { useTimeUtils, useUserState } from '@/utils'
import CommentEditor from './CommentEditor.vue'
import Reply from './Reply.vue'
import LikeSvg from './LikeSvg.vue'
import DislikeSvg from './DislikeSvg.vue'

defineProps<{
  commentInfo: CommentInfo
}>()

const emit = defineEmits<{
  (e: 'new-reply', payload: { text: string, id: number }): void,
  (e: 'like', payload: CommentInfo | ReplyInfo): void,
  (e: 'dislike', payload: CommentInfo | ReplyInfo): void,
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

const showReplies = ref(false)
const newReply = ref<null | number>(null)
const editing = ref<number | null>(null)

const onNewReply = ({ text, id }: { text: string, id: number }) => {
  emit('new-reply', { text, id })
  newReply.value = null
}

const onEdit = ({ text, id }: { text: string, id: number }) => {
  if (text !== '') {
    emit('edit-comment', { text, id })
    editing.value = null
  }
}
</script>

<template>
  <div class="root-comment">
    <div class="heading-container">
      <img class="avatar" :src="commentInfo.authorData.avatar.avatarCompressed" alt="" />
      <div class="heading-wrapper">
        <h6 class="name">{{ commentInfo.authorData.firstName }} {{ commentInfo.authorData.lastName }}</h6>
        <p class="name-tag">@{{ commentInfo.authorData.textID }}</p>
      </div>
      <p class="time">{{ getTime({ unixTime: commentInfo.date.unixTime, date: commentInfo.date.date }) }}</p>
    </div>

    <div
      v-if="commentInfo.authorID === userState.id && editing === commentInfo.id"
      class="editing-wrapper"
    >
      <comment-editor
        :initial-text="commentInfo.text"
        :no-avatar="true"
        placeholder="Отредактируйте комментарий"
        @submit="p => onEdit({ text: p, id: commentInfo.id })"
      />
    </div>
    <p v-else class="comment-text">
      {{ commentInfo.text }}
    </p>

    <div class="buttons-container">
      <button
        class="reply-button"
        @click="newReply = newReply === null ? commentInfo.id : null"
      >Ответить</button>
      <button
        v-if="commentInfo.authorID === userState.id"
        class="edit-button"
        @click="editing = editing === null ? commentInfo.id : null"
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-pencil" />
        </svg>
      </button>

      <button
        class="like-button" :class="{ 'active': commentInfo.isLiked }"
        @click="emit('like', commentInfo)"
      >
        <like-svg :active="commentInfo.isLiked" />
        <span>{{ commentInfo.likesNumber }}</span>
      </button>
      <button
        class="dislike-button" :class="{ 'active': commentInfo.isDisliked }"
        @click="emit('dislike', commentInfo)"
      >
        <dislike-svg :active="commentInfo.isDisliked" />
        <span>{{ commentInfo.dislikesNumber }}</span>
      </button>
    </div>

    <div v-if="newReply === commentInfo.id" class="comment-editor-wrapper">
      <comment-editor @submit="text => onNewReply({ text, id: commentInfo.id })" />
    </div>

    <template v-if="commentInfo.answers && commentInfo.answersNumber > 0">
      <div v-if="showReplies" class="replies-section">
        <button class="close-button" @click="showReplies = false">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-chevron-up" />
          </svg>
        </button>
        <div class="replies-container">
          <reply
            v-for="reply in commentInfo.answers" :key="reply.id"
            :reply-info="reply"
            :comment-info="commentInfo"
            v-model:new-reply="newReply"
            v-model:editing="editing"
            @new-reply="p => emit('new-reply', p)"
            @like="p => emit('like', p)"
            @dislike="p => emit('dislike', p)"
            @edit-comment="p => emit('edit-comment', p)"
          />
        </div>
      </div>

      <button v-else class="replies-button" @click="showReplies = true">
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
