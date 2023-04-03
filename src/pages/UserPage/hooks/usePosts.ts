import {
  Ref, ref, watch, computed, ComputedRef
} from 'vue'
import { FullProjectInfo, FullUserPostInfo, FullUserInfo } from '@/types'
import {
  useApiState, useAuthState, useDispatch,
} from '@/utils'
import { fetchActions } from '@/store/constants'

const usePosts = (
  { update, userInfo }:
  {
    update?: Ref<symbol | null> | Ref<symbol | null>[],
    userInfo: Ref<FullUserInfo | null> | ComputedRef<FullUserInfo | null>
  }
) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const posts = ref<FullUserPostInfo[] | null>(null)

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
      info: { method: 'POST', body }
    })) as FullUserPostInfo[]

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

    const res = (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/userPosts.getInfo/`,
      info: { method: 'POST', body }
    })) as FullUserPostInfo[]

    // бинарный поиск
    let low = 0
    let high = posts.value.length - 1

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      const guess = posts.value[mid]
      if (guess.id === id) posts.value[mid] = res[0] // eslint-disable-line
      if (guess.id > id) high = mid - 1
      else low = mid + 1
    }
  }

  const next = () => {
    if (posts.value && posts.value.length < limit.value.from + limit.value.amount) return
    console.log('next')
    limit.value = {
      from: limit.value.from + limit.value.amount,
      amount: limit.value.amount
    }
    fetchPosts(true)
  }

  return { posts, updatePost, next }
}

export default usePosts
