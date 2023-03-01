import {
  ComputedRef, watch, ref, computed
} from 'vue'
import {
  useApiState, useAuthState, useDispatch, FullProjectInfo,
  useGlobalUpdate, FullUserInfo, ExcludeProperties
} from '@/utils'
import { fetchActions } from '@/store/constants'
import { Member, Role } from '../types'

const useCurrentProjectMembers = ({ currentProject }: {
  currentProject: ComputedRef<FullProjectInfo | null>
}) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { globalUpdate, globalProjectsUpdate } = useGlobalUpdate()

  const fetchMembers = async (usersIDs: number[]) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    body.append('usersIDs', usersIDs.join(', '))
    body.append('fields', 'firstName, lastName, textID, avatar')

    // return (await dispatch(fetchActions.FETCH, {
    //   url: `${apiState.value.apiUrl}/mate/users.getInfo/`,
    //   info: {
    //     method: 'POST',
    //     body
    //   }
    // })) as FullUserInfo[]

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/users.getInfo/`,
      info: {
        method: 'POST',
        body
      }
    })) as ExcludeProperties<Member, 'role'>[]
  }

  const allMembersInfo = ref<{
    [index: number]: Member[]
  }>({})

  watch([globalUpdate, globalProjectsUpdate], () => {
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

      //allMembersInfo.value[currentProject.value.id] = res
      //   allMembersInfo.value[currentProject.value.id] = res.map((m) => {
      //     return {
      //       avatar: m.avatar.avatarCompressed ?? m.avatar.avatar,
      //       fullName: `${m.firstName} ${m.lastName}`,
      //       textID: m.textID,
      //       role: getRoleById(m.findcreekID)!,
      //       findcreekID: m.findcreekID
      //     }
      //   })
      allMembersInfo.value[currentProject.value.id] = res.map((m) => ({
        ...m,
        role: getRoleById(m.findcreekID)!
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
