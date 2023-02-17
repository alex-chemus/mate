import { onMounted, ref, watch } from 'vue'
import {
  useApiState, useAuthState, useDispatch, useGlobalUpdate,
  FullUserInfo
} from '@/utils'
import { fetchActions } from '@/store/constants'

const useFullUsersInfo = (usersIDs: number[]) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { globalUpdate } = useGlobalUpdate()

  const fullUsersInfo = ref<FullUserInfo[] | null>(null)

  const fetchUsersInfo = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('usersIDs', usersIDs.join(', '))

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/users.getInfo/`,
      info: {
        method: 'POST',
        body
      }
    })) as FullUserInfo[]
  }

  onMounted(async () => {
    fullUsersInfo.value = await fetchUsersInfo()
  })

  watch(globalUpdate, async () => {
    fullUsersInfo.value = await fetchUsersInfo()
  })

  return fullUsersInfo
}

export default useFullUsersInfo
