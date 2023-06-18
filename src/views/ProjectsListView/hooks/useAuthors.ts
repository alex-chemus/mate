import {
  Ref, ComputedRef, ref, watch, onMounted
} from 'vue'
import { FullProject, FullUser } from '@/types'
import { useFetchFullUsers } from '@/api'

const useAuthors = (
  { projects }:
  { projects: Ref<FullProject[] | null> | ComputedRef<FullProject[] | null> }
) => {
  const authors = ref<FullUser[] | null>(null)
  const fetchFullUsers = useFetchFullUsers()

  const getAuthors = async () => {
    if (projects.value === null) return

    const authorIDs = [
      ...new Set(projects.value.map((p) => p.founderID))
    ]

    authors.value = await fetchFullUsers(authorIDs)
  }

  onMounted(getAuthors)
  watch(projects, getAuthors)

  return authors
}

export default useAuthors