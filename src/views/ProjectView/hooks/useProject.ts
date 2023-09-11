import { onMounted, ref, watch, Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalUpdate, } from '@/shared/utils'
import { fetchActions } from '@/store/constants'
import useAppStore from '@/store/useAppStore'
import { FullProject } from '@/shared/types'
import type { Employee, Role } from '../types'

const useProject = ({ update }: { update: Ref<symbol> }) => {
  const { apiState, authState, dispatch } = useAppStore()

  const { globalUpdate, globalProjectsUpdate } = useGlobalUpdate()

  const route = useRoute()
  const router = useRouter()

  const fetchProjectInfo = async (id: string) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    body.append('projectsIDs', id)

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projects.getInfo/`,
      info: {
        method: 'POST',
        body
      },
      errorMessage: '[views/ProjectView/useProject] Failed to fetch projects info'
    }))[0] as FullProject
  }

  const fetchProjectEmployees = async ({
    editors, admins, founder
  }: {
    editors: number[],
    admins: number[],
    founder: number
  }) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    body.append('usersIDs', [
      ...editors, ...admins, founder
    ].join(', '))

    const res = (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/id/users.getInfo/`,
      info: { method: 'POST', body },
      errorMessage: '[views/ProjectView/useProject] Failed to load project employees'
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

  const project = ref<FullProject | null>(null)
  const projectEmployees = ref<Employee[] | null>(null)

  router.afterEach(async (to, from) => {
    const pattern = /project\/\d/
    if (to.path.match(pattern) && from.path.match(pattern))
      project.value = await fetchProjectInfo(route.params.id as string)
  })

  onMounted(async () => {
    project.value = await fetchProjectInfo(route.params.id as string)
  })

  watch([globalUpdate, update, globalProjectsUpdate], async () => {
    project.value = await fetchProjectInfo(route.params.id as string)
  })

  watch(project, async () => {
    if (!project.value) return
    projectEmployees.value = await fetchProjectEmployees({
      editors: project.value.editors,
      admins: project.value.administrators,
      founder: project.value.founderID
    })
  })

  return { project, projectEmployees }
}

export default useProject
