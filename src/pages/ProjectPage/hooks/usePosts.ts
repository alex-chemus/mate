import { Ref, ref, watch } from 'vue'
import { FullProjectInfo, FullPostInfo } from '@/types'
import {
  useApiState, useAuthState, useDispatch,
} from '@/utils'
import { fetchActions } from '@/store/constants'

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
  const limit = ref({ from: 0, amount: 20 })
  const resetLimit = () => {
    limit.value = { from: 0, amount: 20 }
  }

  const fetchPosts = async () => {
    if (projectInfo.value === null) return

    const body = new FormData()
    body.append('token', authState.value.token as string)

    body.append('projectID', projectInfo.value.id.toString())
    body.append('limit', `${limit.value.from},${limit.value.amount}`)

    posts.value = (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projectPosts.getProjectPosts/`,
      info: { method: 'POST', body }
    })) as FullPostInfo[]
  }

  watch(projectInfo, () => {
    resetLimit()
    fetchPosts()
  })
  if (update) watch(update, fetchPosts)

  const next = () => {
    if (posts.value && posts.value.length < limit.value.amount) return
    limit.value = {
      from: limit.value.from + limit.value.amount,
      amount: limit.value.amount
    }
  }

  const prev = () => {
    if (limit.value.from === 0) return
    limit.value = {
      from: Math.max(0, limit.value.from - limit.value.amount),
      amount: limit.value.amount
    }
  }

  return { posts, next, prev }
}

export default usePosts
