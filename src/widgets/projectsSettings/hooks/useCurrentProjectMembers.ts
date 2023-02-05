import {
  ComputedRef, watch, ref, computed
} from 'vue'
import {
  useApiState, useAuthState, useDispatch, FullProjectInfo,
  useGlobalUpdate
} from '@/utils'
import { fetchActions } from '@/store/constants'
import { Member } from '../types'

const userCurrentProjectMembers = ({ currentProject }: {
  currentProject: ComputedRef<FullProjectInfo | null>
}) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { globalUpdate } = useGlobalUpdate()

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
      }
    })) as {
      findcreekID: number,
      firstName: string,
      lastName: string,
      textID: string,
      avatar: {
        avatar: string,
        avatarCompressed: string,
        avatarShiftX: number,
        avatarShiftY: number,
        avatarScale: number
      }
    }[]
  }

  const allMembersInfo = ref<{
    [index: number]: Member[]
  }>({})

  watch(globalUpdate, () => {
    allMembersInfo.value = {}
  })

  const getRoleById = (id: number) => {
    if (currentProject.value === null) return null
    if (currentProject.value.administrators.includes(id)) return 'administrator'
    if (currentProject.value.editors.includes(id)) return 'editor'
    if (currentProject.value.founderID === id) return 'founder'
    return null
  }

  watch(currentProject, async () => {
    if (currentProject.value === null) return null

    if (!(currentProject.value.id! in allMembersInfo.value)) {
      const res = await fetchMembers([
        ...currentProject.value.administrators,
        ...currentProject.value.editors,
        currentProject.value.founderID
      ])

      allMembersInfo.value[currentProject.value.id] = res.map((m) => {
        return {
          avatar: m.avatar.avatarCompressed,
          fullName: `${m.firstName} ${m.lastName}`,
          textID: m.textID,
          role: getRoleById(m.findcreekID)!,
          findcreekID: m.findcreekID
        }
      })
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

export default userCurrentProjectMembers
