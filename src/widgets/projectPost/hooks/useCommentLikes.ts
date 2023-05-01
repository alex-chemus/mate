import { Ref } from 'vue'
import { ReplyInfo, CommentInfo } from '@/types'
import { useApiState, useAuthState, useDispatch } from '@/utils'
import { fetchActions } from '@/store/constants'

const useCommentLikes = (
  { onUpdate }: { onUpdate: () => void }
) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const setReaction = async (id: number, method: 'like' | 'dislike' | 'removeLike' | 'removeDislike') => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('commentID', id.toString())

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/comment.${method}/`,
      info: { body, method: 'POST' }
    })
  }

  const likeComment = async (info: CommentInfo | ReplyInfo) => {
    if (info.isLiked === false && info.isDisliked === false) {
      await setReaction(info.id, 'like')
      onUpdate()
      return
    }

    if (info.isLiked === false && info.isDisliked) {
      await setReaction(info.id, 'removeDislike')
      await setReaction(info.id, 'like')
      onUpdate()
      return
    }

    if (info.isLiked) {
      await setReaction(info.id, 'removeLike')
      onUpdate()
    }
  }

  const dislikeComment = async (info: CommentInfo | ReplyInfo) => {
    if (info.isDisliked === false && info.isLiked === false) {
      await setReaction(info.id, 'dislike')
      onUpdate()
      return
    }

    if (info.isDisliked === false && info.isLiked) {
      await setReaction(info.id, 'removeLike')
      await setReaction(info.id, 'dislike')
      onUpdate()
      return
    }

    if (info.isDisliked) {
      await setReaction(info.id, 'removeDislike')
      onUpdate()
    }
  }

  return { likeComment, dislikeComment }
}

export default useCommentLikes
