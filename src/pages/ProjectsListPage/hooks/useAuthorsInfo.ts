import {
  Ref, ComputedRef, ref, watch, onMounted
} from 'vue'
import { FullProjectInfo, FullUserInfo } from '@/types'
import { useFetchFullUsersInfo } from '@/api'

const useAuthorsInfo = (
  { projectsInfo }:
  { projectsInfo: Ref<FullProjectInfo[] | null> | ComputedRef<FullProjectInfo[] | null> }
) => {
  const authorsInfo = ref<FullUserInfo[] | null>(null)
  const fetchFullUsersInfo = useFetchFullUsersInfo()

  const getAuthors = async () => {
    if (projectsInfo.value === null) return

    const authorIDs = [
      ...new Set(projectsInfo.value.map((p) => p.founderID))
    ]

    authorsInfo.value = await fetchFullUsersInfo(authorIDs)
  }

  onMounted(getAuthors)
  watch(projectsInfo, getAuthors)

  return authorsInfo
}

export default useAuthorsInfo
