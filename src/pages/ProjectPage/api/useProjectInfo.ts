import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useApiState, useAuthState, useDispatch } from '@/utils'
import { fetchActions } from '@/store/constants'
import type { ProjectInfo, Employee } from '../types'

const useProjectInfo = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const route = useRoute()

  const fetchProjectInfo = async (id: string) => {
    if (!authState.value.token) return null

    const body = new FormData()
    body.append('token', authState.value.token as string)

    body.append('projectsIDs', id)

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/project.getInfo/`,
      info: {
        method: 'POST',
        body
      }
    }))[0] as ProjectInfo
  }

  const fetchProjectEmployees = async (ids: string) => {
    if (!authState.value.token) return null

    const body = new FormData()
    body.append('token', authState.value.token as string)

    body.append('usersIDs', ids)

    const res = (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/id/users.getInfo/`,
      info: {
        method: 'POST',
        body
      }
    })) as any[]

    return res.map((u: any) => ({
      name: `${u.firstName} ${u.lastName}`,
      avatar: u.avatar.avatarCompressed,
      id: u.id
    } as Employee))
  }

  const projectInfo = ref<ProjectInfo | null>(null)
  const projectEmployees = ref<Employee[] | null>(null)

  onMounted(async () => {
    projectInfo.value = await fetchProjectInfo(route.params.id as string)
  })

  watch(projectInfo, async () => {
    if (!projectInfo.value) return
    projectEmployees.value = await fetchProjectEmployees(projectInfo.value.members.join(', '))
  })

  return { projectInfo, projectEmployees }
}

export default useProjectInfo
