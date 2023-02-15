import { ComputedRef } from 'vue'
import {
  FullAccountInfo, useApiState, useAuthState, useDispatch, useGlobalUpdate, FullProjectInfo
} from '@/utils'
import { fetchActions } from '@/store/constants'

const useMedia = ({
  fullAccountInfo, currentProject
}: {
  fullAccountInfo: FullAccountInfo,
  currentProject: ComputedRef<FullProjectInfo | null>
}) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { setGlobalUpdate } = useGlobalUpdate()

  const onAdd = async (payload: string, noUpdate?: boolean) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('type', 'socialNetwork')
    body.append('value', payload)
    if (currentProject.value)
      body.append('projectID', currentProject.value.id.toString())

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projects.addContact/`,
      info: {
        method: 'POST',
        body
      }
    })

    if (!noUpdate) setGlobalUpdate()
  }

  const onRemove = async (payload: number, noUpdate?: boolean) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('type', 'socialNetwork')
    body.append('id', payload.toString())
    if (currentProject.value)
      body.append('projectID', currentProject.value.id.toString())

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projects.deleteContact/`,
      info: {
        method: 'POST',
        body
      }
    })

    if (!noUpdate) setGlobalUpdate()
  }

  const onEdit = async (payload: { id: number, link: string }) => {
    await onRemove(payload.id, true)
    await onAdd(payload.link, true)

    setGlobalUpdate()
  }

  return {
    onAdd, onRemove, onEdit
  }
}

export default useMedia
