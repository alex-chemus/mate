import { Ref, ref, watch } from 'vue'
import { FullProjectInfo, FullPostInfo, FullUserInfo } from '@/types'
import {
  useApiState, useAuthState, useDispatch,
} from '@/utils'
import { fetchActions } from '@/store/constants'
import { useFetchFullUsersInfo } from '@/api'

const usePosts = (
  { projectInfo, update }:
  {
    projectInfo: Ref<FullProjectInfo | null>,
    update?: Ref<symbol | null> | Ref<symbol | null>[]
  }
) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const posts = ref<FullPostInfo[] | null>(null)
  const authors = ref<{
    author: FullUserInfo,
    postID: number
  }[] | null>(null)

  const limit = ref({ from: 0, amount: 20 })
  const resetLimit = () => {
    limit.value = { from: 0, amount: 20 }
  }

  const fetchPosts = async (shouldntReset?: boolean) => {
    if (projectInfo.value === null) return

    const body = new FormData()
    body.append('token', authState.value.token as string)

    body.append('projectID', projectInfo.value.id.toString())
    body.append('limit', `${limit.value.from},${limit.value.amount}`)

    const res = (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projectPosts.getProjectPosts/`,
      info: { method: 'POST', body }
    })) as FullPostInfo[]

    if (shouldntReset && posts.value) posts.value = [...posts.value, ...res]
    else posts.value = res
  }

  watch(projectInfo, () => {
    resetLimit()
    fetchPosts()
  })
  if (update) watch(update, () => fetchPosts)

  const fetchFullUsersInfo = useFetchFullUsersInfo()
  watch(posts, async () => {
    if (posts.value === null) return
    const IDs = posts.value.map((p) => p.authorID)
    const users = await fetchFullUsersInfo(IDs)
    authors.value = posts.value.map((p) => {
      return {
        postID: p.id,
        author: users.find((u) => u.findcreekID === p.authorID)!
      }
    })
  })

  const updatePost = async (id: number) => {
    if (posts.value === null) return

    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('postsIDs', id.toString())

    const res = (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projectPosts.getInfo/`,
      info: { method: 'POST', body }
    })) as FullPostInfo[]

    //posts.value = posts.value.map((p) => p.id === id ? res[0] : p)
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
    limit.value = {
      from: limit.value.from + limit.value.amount,
      amount: limit.value.amount
    }
    fetchPosts(true)
  }

  const prev = () => {
    if (limit.value.from === 0) return
    limit.value = {
      from: Math.max(0, limit.value.from - limit.value.amount),
      amount: limit.value.amount
    }
    fetchPosts(true)
  }

  return {
    posts, authors, next, prev, updatePost
  }
}

export default usePosts
