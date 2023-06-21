import { ref } from 'vue'
import {
  useApiState, useAuthState, useDispatch, useGlobalUpdate,
  useAlert
} from '@/utils'
import { fetchActions } from '@/store/constants'

type Role = {
  projectID: number,
  userID: number,
  role: 'editor' | 'administrator' | 'user'
}

const useRoles = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { setGlobalProjectsUpdate } = useGlobalUpdate()
  const { setSuccessMessage } = useAlert()

  const selectedRole = ref<Role | null>(null)

  const onSelect = (role: Role) => {
    selectedRole.value = role
  }

  const updateRole = async () => {
    if (!selectedRole.value) return null

    const body = new FormData()
    body.append('token', authState.value.token as string)

    body.append('projectID', selectedRole.value.projectID.toString())
    body.append('userID', selectedRole.value.userID.toString())
    body.append('role', selectedRole.value.role)

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projects.setUserRole/`,
      info: {
        method: 'POST',
        body
      },
      errorMessage: '[features/Settings/ProjectsWidget/useRoles] Failed to set user role'
    })

    setGlobalProjectsUpdate()
    setSuccessMessage('Должность изменена')

    return null
  }

  return { onSelect, updateRole }
}

export default useRoles
