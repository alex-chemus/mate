import {
  ref, onMounted, computed, watch
} from 'vue'
import { useGlobalUpdate } from '@/utils'
import { FullAccountInfo, FullProjectInfo } from '@/types'
import { useFetchFullProjectsInfo } from '@/api'

const useProjectsInfo = ({ fullAccountInfo }: { fullAccountInfo: FullAccountInfo }) => {
  const projectsInfo = ref<FullProjectInfo[] | null>(null)
  const currentProjectID = ref<number | null>(null)
  const { globalUpdate, globalProjectsUpdate } = useGlobalUpdate()

  const fetchFullProjectsInfo = useFetchFullProjectsInfo()

  onMounted(async () => {
    projectsInfo.value = await fetchFullProjectsInfo([
      ...fullAccountInfo.projectsManagement.administrator,
      ...fullAccountInfo.projectsManagement.editor,
      ...fullAccountInfo.projectsManagement.founder
    ])
    currentProjectID.value = projectsInfo.value[0].id
  })

  watch([globalUpdate, globalProjectsUpdate], async () => {
    projectsInfo.value = await fetchFullProjectsInfo([
      ...fullAccountInfo.projectsManagement.administrator,
      ...fullAccountInfo.projectsManagement.editor,
      ...fullAccountInfo.projectsManagement.founder
    ])
  })

  const currentProject = computed(() => {
    if (!projectsInfo.value || !currentProjectID.value) return null
    return projectsInfo.value.find((p) => p.id === currentProjectID.value) ?? null
  })

  return { projectsInfo, currentProjectID, currentProject }
}

export default useProjectsInfo
