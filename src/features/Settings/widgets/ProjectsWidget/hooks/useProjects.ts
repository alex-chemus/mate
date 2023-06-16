import {
  ref, onMounted, computed, watch
} from 'vue'
import { useGlobalUpdate } from '@/utils'
import { FullAccount, FullProject } from '@/types'
import { useFetchFullProjects } from '@/api'

const useProjects = ({ fullAccount }: { fullAccount: FullAccount }) => {
  const projectsInfo = ref<FullProject[] | null>(null)
  const currentProjectID = ref<number | null>(null)
  const { globalUpdate, globalProjectsUpdate } = useGlobalUpdate()

  const fetchFullProjects = useFetchFullProjects()

  onMounted(async () => {
    projectsInfo.value = await fetchFullProjects([
      ...fullAccount.projectsManagement.administrator,
      ...fullAccount.projectsManagement.editor,
      ...fullAccount.projectsManagement.founder
    ])
    currentProjectID.value = projectsInfo.value[0].id
  })

  watch([globalUpdate, globalProjectsUpdate], async () => {
    projectsInfo.value = await fetchFullProjects([
      ...fullAccount.projectsManagement.administrator,
      ...fullAccount.projectsManagement.editor,
      ...fullAccount.projectsManagement.founder
    ])
  })

  const currentProject = computed(() => {
    if (!projectsInfo.value || !currentProjectID.value) return null
    return projectsInfo.value.find((p) => p.id === currentProjectID.value) ?? null
  })

  return { projectsInfo, currentProjectID, currentProject }
}

export default useProjects
