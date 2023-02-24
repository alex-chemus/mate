import { fetchActions } from '@/store/constants'
import {
  useApiState, useAuthState, useDispatch, FullProjectInfo,
  FullAccountInfo
} from '@/utils'

const useFullProjectsInfo = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  //const fullProjectsInfo = ref<FullProjectInfo[] | null>(null)

  const fetchFullProjectsInfo = async (projectsIDs: number[]) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('projectsIDs', projectsIDs.join(', '))

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projects.getInfo/`,
      info: {
        method: 'POST',
        body
      }
    })) as FullProjectInfo[]
  }

  // onMounted(async () => {
  //   fullProjectsInfo.value = await fetchFullProjectsInfo()
  // })

  // watch(globalUpdate, async () => {
  //   fullProjectsInfo.value = await fetchFullProjectsInfo()
  // })

  return fetchFullProjectsInfo
}

export default useFullProjectsInfo
