import {
  ref, onMounted, watch, Ref
} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useFetchFullUsers, useFetchFullProjects } from '@/api'
import { useGlobalUpdate } from '@/utils'
import { FullProject, FullUser } from '@/types'
import useIsMe from './useIsMe'

const useViewInfo = ({ update }: { update: Ref<symbol> }) => {
  const router = useRouter()
  const route = useRoute()
  const { globalUpdate, globalAccountUpdate } = useGlobalUpdate()

  const fetchFullUsers = useFetchFullUsers()
  const fetchFullProjects = useFetchFullProjects()
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

  watch([globalUpdate, update, globalAccountUpdate], async () => {
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
  })

  return { fullUsers, fullProjects, isMe }
}

export default useViewInfo
