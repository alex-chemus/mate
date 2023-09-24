import { ComputedRef, watch, ref, computed } from 'vue'
import { useGlobalRefresher } from '@/shared/utils'
import useAppStore from '@/store/useAppStore'
import { ExcludeProperties, FullProject } from '@/shared/types'
import { fetchActions } from '@/store/constants'
import { Member } from '../types'

const useCurrentProjectMembers = ({ currentProject }: {
  currentProject: ComputedRef<FullProject | null>
}) => {
  const { apiState, authState, dispatch } = useAppStore()
  const { globalRefresher, globalProjectsRefresher } = useGlobalRefresher()

  const fetchMembers = async (usersIDs: number[]) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    body.append('usersIDs', usersIDs.join(', '))
    body.append('fields', 'firstName, lastName, textID, avatar')

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/users.getInfo/`,
      info: {
        method: 'POST',
        body
      },
      errorMessage: '[features/Settings/ProfileWidget/useCurrentProjectMembers] Failed to fetch members info for current project'
    })) as ExcludeProperties<Member, 'role'>[]
  }

  const allMembersInfo = ref<{
    [index: number]: Member[]
  }>({})

  watch([globalRefresher, globalProjectsRefresher], () => {
    allMembersInfo.value = {}
  })

  const getRoleById = (id: number) => {
    if (currentProject.value === null) return null
    if (currentProject.value.administrators.includes(id)) return 'administrator'
    if (currentProject.value.editors.includes(id)) return 'editor'
    if (currentProject.value.founderID === id) return 'founder'
    return 'user'
  }

  watch(currentProject, async () => {
    if (currentProject.value === null) return null

    if (!(currentProject.value.id! in allMembersInfo.value)) {
      const res = await fetchMembers([
        ...currentProject.value.administrators,
        ...currentProject.value.editors,
        currentProject.value.founderID
      ])

      if (res) allMembersInfo.value[currentProject.value.id] = res.map((member) => ({
        ...member,
        role: getRoleById(member.findcreekID)!
      }))
    }

    return null
  })

  const currentProjectMembers = computed(() => {
    if (!currentProject.value) return null
    if (!(currentProject.value.id in allMembersInfo.value)) {
      return null
    }
    return allMembersInfo.value[currentProject.value.id]
  })

  return currentProjectMembers
}

export default useCurrentProjectMembers
