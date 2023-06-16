import { onMounted, ref, watch } from 'vue'
import { fetchActions } from '@/store/constants'
import { useApiState, useAuthState, useDispatch } from '@/utils'
import { Comment } from '@/types'
import { PostType } from '../types'

const useComments = (
  {
    postID, postType, editCallback, addCallback
  }: {
    postID: number,
    postType: PostType,
    editCallback: () => void,
    addCallback: () => void
  }
) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const comments = ref<Comment[] | null>(null)
  const commentsUpdate = ref<symbol | null>(null)

  const fetchComments = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('postType', postType)
    body.append('postID', postID.toString())
    body.append('returnAnswers', '1')

    const res = await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/comment.getPostComments/`,
      info: { body, method: 'POST' }
    })
    comments.value = res as Comment[]
  }

  const addComment = async ({ text, commentID }: { text: string, commentID?: number }) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('postType', postType)
    body.append('postID', postID.toString())
    body.append('text', text)
    if (commentID) body.append('answerToCommentID', commentID.toString())
    // todo: media

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/comment.create/`,
      info: { body, method: 'POST' }
    })

    commentsUpdate.value = Symbol()
    addCallback()
  }

  onMounted(fetchComments)
  watch(commentsUpdate, fetchComments)

  const editComment = async ({ text, commentID }: { text: string, commentID: number }) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('commentID', commentID.toString())
    body.append('text', text)

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/comment.setInfo/`,
      info: { body, method: 'POST' }
    })

    commentsUpdate.value = Symbol()
    editCallback()
  }

  return {
    comments,
    commentsUpdate,
    addComment,
    editComment
  }
}

export default useComments
