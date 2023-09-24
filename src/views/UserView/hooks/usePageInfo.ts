import { ref, onMounted, watch, Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useFetchFullUsers, useFetchFullProjects } from '@/shared/api'
import { useGlobalRefresher } from '@/shared/utils'
import { FullProject, FullUser } from '@/shared/types'
import useIsMe from './useIsMe'

const useViewInfo = ({ update }: { update?: Ref<symbol> }) => {
  const router = useRouter()
  const route = useRoute()
  const { globalRefresher, globalAccountRefresher } = useGlobalRefresher()

  const fetchFullUsers = useFetchFullUsers('[views/UserView/usePageInfo] Failed to fetch users')
  const fetchFullProjects = useFetchFullProjects('[views/UserView/usePageInfo] Failed to fetch projects')
  const { fetchAccountInfo, isMe } = useIsMe()

  const fullUsers = ref<FullUser[] | null>(null)
  const fullProjects = ref<FullProject[] | null>(null)

  router.afterEach(async (to, from) => {
    const pattern = /user\/\d/
    if (to.path.match(pattern) && from.path.match(pattern))
      fullUsers.value = await fetchFullUsers([+to.params.id])
  })

  onMounted(async () => {
    fullUsers.value = await fetchFullUsers([+route.params.id])
  })

  watch([globalRefresher, update, globalAccountRefresher], async () => {
    fullUsers.value = await fetchFullUsers([+route.params.id])
  })

  watch(fullUsers, async () => {
    if (!fullUsers.value) return
    fetchAccountInfo()
    const projects = [
      ...fullUsers.value[0].projectsManagement.administrator,
      ...fullUsers.value[0].projectsManagement.editor,
      ...fullUsers.value[0].projectsManagement.founder
    ]
    if (projects.length)
      fullProjects.value = await fetchFullProjects(projects)
    else
      fullProjects.value = []
  })

  return { fullUsers, fullProjects, isMe }
}

export default useViewInfo
