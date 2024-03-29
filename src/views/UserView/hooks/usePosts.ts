import { Ref, ref, watch, ComputedRef } from 'vue'
import { FullUserPost, FullUser } from '@/shared/types'
import useAppStore from '@/store/useAppStore'
import { fetchActions } from '@/store/constants'

const usePosts = (
  { update, userInfo }:
  {
    update?: Ref<symbol | null> | Ref<symbol | null>[],
    userInfo: Ref<FullUser | null> | ComputedRef<FullUser | null>
  }
) => {
  const { apiState, authState, dispatch } = useAppStore()

  const posts = ref<FullUserPost[] | null>(null)

  const limit = ref({ from: 0, amount: 20 })
  const resetLimit = () => {
    limit.value = { from: 0, amount: 20 }
  }

  const fetchPosts = async (shouldntReset?: boolean) => {
    if (userInfo.value === null) return

    const body = new FormData()
    body.append('token', authState.value.token as string)

    body.append('userID', userInfo.value.findcreekID.toString())
    body.append('limit', `${limit.value.from},${limit.value.amount}`)

    const res = (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/userPosts.getUserPosts/`,
      info: { method: 'POST', body },
      errorMessage: '[views/UserView/usePosts] Failed to fetch users posts'
    })) as FullUserPost[]

    posts.value = shouldntReset && posts.value
      ? [...posts.value, ...res]
      : res
  }

  watch(userInfo, () => {
    resetLimit()
    fetchPosts()
  })
  if (update) watch(update, () => fetchPosts)

  const updatePost = async (id: number) => {
    if (posts.value === null) return

    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('postsIDs', id.toString())
    body.append('returnComment', '1')

    const res = (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/userPosts.getInfo/`,
      info: { method: 'POST', body },
      errorMessage: '[views/UserView/usePosts] Failed to update post'
    })) as FullUserPost[]

    // бинарный поиск
    let left = 0
    let right = posts.value.length - 1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      const post = posts.value[mid]
      if (post.id === id) {
        posts.value[mid] = res[0] // eslint-disable-line
        break
      } else if (post.id < id) right = mid - 1
      else left = mid + 1
    }
  }

  const next = () => {
    if (posts.value && posts.value.length < limit.value.from + limit.value.amount) return
    limit.value = {
      from: limit.value.from + limit.value.amount,
      amount: limit.value.amount
    }
    fetchPosts(true)
  }

  return { posts, updatePost, next }
}

export default usePosts
