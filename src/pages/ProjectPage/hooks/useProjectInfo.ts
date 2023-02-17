import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  useApiState, useAuthState, useDispatch, useGlobalUpdate,
  FullProjectInfo
} from '@/utils'
import { fetchActions } from '@/store/constants'
import type { Employee, Role } from '../types'

const useProjectInfo = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const route = useRoute()
  const { globalUpdate } = useGlobalUpdate()

  const fetchProjectInfo = async (id: string) => {
    if (!authState.value.token) return null

    const body = new FormData()
    body.append('token', authState.value.token as string)

    body.append('projectsIDs', id)

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projects.getInfo/`,
      info: {
        method: 'POST',
        body
      }
    }))[0] as FullProjectInfo
  }

  const fetchProjectEmployees = async ({
    editors, admins, founder
  }: {
    editors: number[],
    admins: number[],
    founder: number
  }) => {
    if (!authState.value.token) return null

    const body = new FormData()
    body.append('token', authState.value.token as string)

    body.append('usersIDs', [
      ...editors, ...admins, founder
    ].join(', '))

    const res = (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/id/users.getInfo/`,
      info: {
        method: 'POST',
        body
      }
    })) as any[]

    const getRole = (id: number): Role => {
      if (editors.includes(id)) return 'editor'
      if (admins.includes(id)) return 'administrator'
      return 'founder'
    }

    return res.map((u: any) => ({
      name: `${u.firstName} ${u.lastName}`,
      avatar: u.avatar.avatarCompressed,
      id: u.id,
      role: getRole(u.id)
    } as Employee))
  }

  const projectInfo = ref<FullProjectInfo | null>(null)
  const projectEmployees = ref<Employee[] | null>(null)

  onMounted(async () => {
    projectInfo.value = await fetchProjectInfo(route.params.id as string)
  })

  watch(globalUpdate, async () => {
    projectInfo.value = await fetchProjectInfo(route.params.id as string)
  })

  watch(projectInfo, async () => {
    if (!projectInfo.value) return
    projectEmployees.value = await fetchProjectEmployees({
      editors: projectInfo.value.editors,
      admins: projectInfo.value.administrators,
      founder: projectInfo.value.founderID
    })
  })

  return { projectInfo, projectEmployees }
}

export default useProjectInfo
