import { ref, onMounted } from 'vue'
import { useFetchFullProjects } from '@/api'
import { fetchActions } from '@/store/constants'
import { FullProject } from '@/types'
import { useApiState, useAuthState, useDispatch } from '@/utils'

const useProjects = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const fetchFullProjects = useFetchFullProjects()

  const projects = ref<FullProject[] | null>(null)

  type ProjectsMembership = {
    projectsManagement: {
      founder: number[],
      administrator: number[],
      editor: number[]
    }
  }

  const fetchMyProjectsIDs = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('fields', 'projectsManagement')

    const res = await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/account.getInfo/`,
      info: { body, method: 'POST' }
    }) as ProjectsMembership

    return [
      ...res.projectsManagement.founder,
      ...res.projectsManagement.administrator,
      ...res.projectsManagement.editor
    ]
  }

  onMounted(async () => {
    const projectsIDs = await fetchMyProjectsIDs()
    if (projectsIDs.length)
      projects.value = await fetchFullProjects(projectsIDs)
  })

  return projects
}

export default useProjects
