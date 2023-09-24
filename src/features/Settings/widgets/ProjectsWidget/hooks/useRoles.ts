import { ref } from 'vue'
import { useGlobalRefresher, useAlert } from '@/shared/utils'
import useAppStore from '@/store/useAppStore'
import { fetchActions } from '@/store/constants'

type Role = {
  projectID: number,
  userID: number,
  role: 'editor' | 'administrator' | 'user'
}

const useRoles = () => {
  const { apiState, authState, dispatch } = useAppStore()
  const { refreshProjectsGlobal } = useGlobalRefresher()
  const { setSuccessMessage } = useAlert()

  const selectedRole = ref<Role | null>(null)

  const disabled = ref(false)

  const onSelect = (role: Role) => {
    selectedRole.value = role
  }

  const updateRole = async () => {
    disabled.value = true

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

    refreshProjectsGlobal()
    setSuccessMessage('Должность изменена')

    disabled.value = false

    return null
  }

  return { onSelect, updateRole, disabled }
}

export default useRoles
