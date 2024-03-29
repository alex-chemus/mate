import { fetchActions } from '@/store/constants'
import useAppStore from '@/store/useAppStore'

const useLikes = (
  { onUpdate }:
  { onUpdate: () => void }
) => {
  const { apiState, authState, dispatch } = useAppStore()

  const localFetch = async (id: number, method: 'like' | 'dislike' | 'removeLike' | 'removeDislike') => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('postID', id.toString())

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/userPosts.${method}/`,
      info: { method: 'POST', body },
      errorMessage: `[views/UserView/PostWidget/useLikes] Failed to set ${method}`
    })
  }

  const uploadLike = async (id: number, likes: boolean, dislikes: boolean) => {
    if (likes && !dislikes) {
      await localFetch(id, 'removeLike')
    }

    if (!likes && !dislikes) {
      await localFetch(id, 'like')
    }

    if (!likes && dislikes) {
      await localFetch(id, 'removeDislike')
      await localFetch(id, 'like')
    }

    onUpdate()
  }

  const uploadDislike = async (id: number, likes: boolean, dislikes: boolean) => {
    if (likes && !dislikes) {
      await localFetch(id, 'removeLike')
      await localFetch(id, 'dislike')
    }

    if (!likes && !dislikes) {
      await localFetch(id, 'dislike')
    }

    if (!likes && dislikes) {
      await localFetch(id, 'removeDislike')
    }

    onUpdate()
  }

  return { uploadLike, uploadDislike }
}

export default useLikes
