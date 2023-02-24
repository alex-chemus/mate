import {
  ref, onMounted, watch, Ref, computed
} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useFetchFullUsersInfo, useFetchFullProjectsInfo } from '@/api'
import { FullProjectInfo, FullUserInfo, useGlobalUpdate } from '@/utils'
import useIsMe from './useIsMe'
import { Subscription } from '../types'

const usePageInfo = ({ update }: { update: Ref<symbol> }) => {
  const router = useRouter()
  const route = useRoute()
  const { globalUpdate, globalAccountUpdate } = useGlobalUpdate()

  const fetchFullUsersInfo = useFetchFullUsersInfo()
  const fetchFullProjectsInfo = useFetchFullProjectsInfo()
  const { fetchAccountInfo, isMe } = useIsMe()

  const fullUsersInfo = ref<FullUserInfo[] | null>(null)
  const fullProjectsInfo = ref<FullProjectInfo[] | null>(null)

  router.afterEach(async (to, from) => {
    const pattern = /user\/\d/
    if (to.path.match(pattern) && from.path.match(pattern))
      fullUsersInfo.value = await fetchFullUsersInfo([+to.params.id])
  })

  onMounted(async () => {
    fullUsersInfo.value = await fetchFullUsersInfo([+route.params.id])
  })

  watch([globalUpdate, update, globalAccountUpdate], async () => {
    fullUsersInfo.value = await fetchFullUsersInfo([+route.params.id])
  })

  watch(fullUsersInfo, async () => {
    if (!fullUsersInfo.value) return
    fetchAccountInfo()
    fullProjectsInfo.value = await fetchFullProjectsInfo([
      ...fullUsersInfo.value[0].projectsManagement.administrator,
      ...fullUsersInfo.value[0].projectsManagement.editor,
      ...fullUsersInfo.value[0].projectsManagement.founder
    ])
  })

  return { fullUsersInfo, fullProjectsInfo, isMe }
}

export default usePageInfo
