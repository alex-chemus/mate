import {
  ref, computed, ComputedRef, watch
} from 'vue'
import {
  useApiState, useAuthState, useDispatch, useGlobalUpdate
} from '@/utils'
import { FullProject, ExcludeProperties } from '@/types'
import { fetchActions } from '@/store/constants'
import { Member } from '../types'
import userCurrentProjectMembers from './useCurrentProjectMembers'

const useMembers = ({ currentProject }: {
  currentProject: ComputedRef<FullProject | null>
}) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { globalProjectsUpdate } = useGlobalUpdate()

  const currentProjectMembers = userCurrentProjectMembers({ currentProject })

  const defaultMembers = computed(() => {
    if (!currentProjectMembers.value) return null
    return [
      ...currentProjectMembers.value.filter((m) => m.role === 'founder'),
      ...currentProjectMembers.value.filter((m) => m.role === 'administrator'),
      ...currentProjectMembers.value.filter((m) => m.role === 'editor')
    ]
  })

  const getRoleById = (id: number) => {
    if (currentProject.value === null) return null
    if (currentProject.value.administrators.includes(id)) return 'administrator'
    if (currentProject.value.editors.includes(id)) return 'editor'
    if (currentProject.value.founderID === id) return 'founder'
    return 'user'
  }

  const searchedMembers = ref<Member[] | null>(null)
  const fetchOnSearch = async (searchString: string) => {
    if (!currentProject.value) return

    const body = new FormData()
    body.append('token', authState.value.token as string)

    body.append('projectID', currentProject.value.id.toString())
    body.append('searchText', searchString)

    body.append('fields', 'firstName, lastName, textID, avatar')

    const res = (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projects.searchUsers/`,
      info: {
        method: 'POST',
        body
      }
    })) as ExcludeProperties<Member, 'role'>[]

    searchedMembers.value = res.map((m) => ({
      ...m,
      role: getRoleById(m.findcreekID)!
    }))
  }

  const searchString = ref<string | null>(null)
  const onSearch = (s: string) => {
    searchString.value = s
    fetchOnSearch(searchString.value)
  }

  watch(globalProjectsUpdate, () => {
    if (typeof searchString.value === 'string')
      fetchOnSearch(searchString.value)
  })

  const getMembers = computed(() => {
    return searchedMembers.value ?? defaultMembers.value
  })

  return { getMembers, onSearch }
}

export default useMembers