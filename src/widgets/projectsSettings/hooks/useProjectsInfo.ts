import {
  ref, onMounted, computed, watch
} from 'vue'
import { FullAccountInfo, FullProjectInfo, useGlobalUpdate } from '@/utils'
import { useFetchFullProjectsInfo } from '@/api'

const useProjectsInfo = ({ fullAccountInfo }: { fullAccountInfo: FullAccountInfo }) => {
  const projectsInfo = ref<FullProjectInfo[] | null>(null)
  const currentProjectID = ref<number | null>(null)
  const { globalUpdate } = useGlobalUpdate()

  const fetchFullProjectsInfo = useFetchFullProjectsInfo()

  onMounted(async () => {
    projectsInfo.value = await fetchFullProjectsInfo({ fullAccountInfo })
    currentProjectID.value = projectsInfo.value[0].id
  })

  watch(globalUpdate, async () => {
    projectsInfo.value = await fetchFullProjectsInfo({ fullAccountInfo })
  })

  const currentProject = computed(() => {
    if (!projectsInfo.value || !currentProjectID.value) return null
    return projectsInfo.value.find((p) => p.id === currentProjectID.value) ?? null
  })

  return { projectsInfo, currentProjectID, currentProject }
}

export default useProjectsInfo
