import { Ref, ref, watch } from 'vue'
import { useApiState, useAuthState, useDispatch } from '@/utils'
import { FullUserInfo } from '@/types'
import { fetchActions } from '@/store/constants'
import { Subscription } from '../types'

const useSubscriptions = (
  { fullUsersInfo }: { fullUsersInfo: Ref<FullUserInfo[] | null> }
) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const subscriptions = ref<Subscription[] | null>(null)

  const fetchSubscriptions = async (projectIDs: number[]) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('projectsIDs', projectIDs.join(', '))
    body.append('fields', 'subscribers, id, name, avatar')

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projects.getInfo/`,
      info: {
        method: 'POST',
        body
      }
    })) as Subscription[]
  }

  watch(fullUsersInfo, async () => {
    if (!fullUsersInfo.value) return
    const subs = fullUsersInfo.value[0].subscriptions.projects
    if (subs.length === 0) subscriptions.value = []
    else subscriptions.value = await fetchSubscriptions(subs)
  })

  return { subscriptions }
}

export default useSubscriptions
