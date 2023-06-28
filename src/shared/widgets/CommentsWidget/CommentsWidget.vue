<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { useUserState } from '@/shared/utils'
import { useFullAccount } from '@/shared/api'
import { CommentLayout, ReplyLayout, WidgetLayout } from './layouts'
import {
  CommentForm, AddReplyButton, SetEditingButton, LikeButton,
  DislikeButton
} from './ui'
import { useComments, useLikes } from './hooks'
import { PostType } from './types'

const props = defineProps<{
  postId: number,
  postType: PostType
}>()

const account = useFullAccount('[widgets/CommentsWidget] Failed to fetch account info')

const userState = useUserState()

const replyToID = ref<number | null>(null)
const editingID = ref<number | null>(null)

const {
  comments, addComment, editComment, commentsUpdate
} = useComments({
  postID: props.postId,
  postType: props.postType,
  addCallback: () => { replyToID.value = null },
  editCallback: () => { editingID.value = null }
})

const { uploadLike, uploadDislike } = useLikes({
  onUpdate: () => { commentsUpdate.value = Symbol() }
})
</script>

<template>
  <widget-layout>
    <template #comment-form>
      <comment-form
        :clear-on-submit="true"
        :img="account?.avatar.avatarCompressed ?? account?.avatar.avatar"
        @submit="text => addComment({ text })"
      />
    </template>

    <template v-if="comments" #comments>
      <comment-layout
        v-for="comment in comments" :key="comment.id"
        :comment="comment"
        :reply-to-id="replyToID"
        :editing-id="editingID"
      >
        <template #edit-comment-form>
          <comment-form
            :initial-text="comment.text"
            :no-avatar="true"
            @submit="text => editComment({ text, commentID: comment.id })"
          />
        </template>

        <template #add-reply-button>
          <add-reply-button
            @add-reply="replyToID = replyToID === comment.id ? null : comment.id"
          />
        </template>

        <template #set-editing-button>
          <set-editing-button
            v-if="userState.id === comment.authorID"
            @set-editing="editingID = editingID === comment.id ? null : comment.id"
          />
        </template>

        <template #like-button>
          <like-button
            :is-liked="comment.isLiked"
            :likes-number="comment.likesNumber"
            @like="uploadLike(comment)"
          />
        </template>

        <template #dislike-button>
          <dislike-button
            :is-disliked="comment.isDisliked"
            :dislikes-number="comment.dislikesNumber"
            @dislike="uploadDislike(comment)"
          />
        </template>

        <template #add-reply-form>
          <comment-form
            :clear-on-submit="true"
            :img="account?.avatar.avatarCompressed ?? account?.avatar.avatar"
            @submit="text => addComment({ text, commentID: comment.id })"
          />
        </template>

        <template #replies="{ replies }">
          <reply-layout
            v-for="reply in replies" :key="reply.id"
            :reply="reply"
            :comment="comment"
            :reply-to-id="replyToID"
            :editing-id="editingID"
          >
            <template #edit-reply-form>
              <comment-form
                :initial-text="reply.text"
                :no-avatar="true"
                @submit="text => editComment({ text, commentID: reply.id })"
              />
            </template>

            <template #add-reply-button>
              <add-reply-button
                @add-reply="replyToID = replyToID === reply.id ? null : reply.id"
              />
            </template>

            <template #set-editing-button>
              <set-editing-button
                v-if="userState.id === reply.authorID"
                @set-editing="editingID = editingID === reply.id ? null : reply.id"
              />
            </template>

            <template #like-button>
              <like-button @like="uploadLike(reply)" />
            </template>

            <template #dislike-button>
              <dislike-button @dislike="uploadDislike(reply)" />
            </template>

            <template #add-reply-form>
              <comment-form
                :clear-on-submit="true"
                :img="account?.avatar.avatarCompressed ?? account?.avatar.avatar"
                @submit="text => addComment({ text, commentID: reply.id })"
              />
            </template>
          </reply-layout>
        </template>
      </comment-layout>
    </template>
  </widget-layout>
</template>
