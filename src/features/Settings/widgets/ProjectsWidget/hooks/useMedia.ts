import { ComputedRef } from 'vue'
import {
  useApiState, useAuthState, useDispatch, useGlobalUpdate
} from '@/utils'
import { FullProject } from '@/types'
import { fetchActions } from '@/store/constants'

const useMedia = ({
  currentProject
}: {
  currentProject: ComputedRef<FullProject | null>
}) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { setGlobalProjectsUpdate } = useGlobalUpdate()

  const onAdd = async (link: string, noUpdate?: boolean) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('type', 'socialNetwork')
    body.append('value', link)
    if (currentProject.value)
      body.append('projectID', currentProject.value.id.toString())

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projects.addContact/`,
      info: {
        method: 'POST',
        body
      }
    })

    if (!noUpdate) setGlobalProjectsUpdate()
  }

  const onRemove = async (id: number, noUpdate?: boolean) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('type', 'socialNetwork')
    body.append('id', id.toString())
    if (currentProject.value)
      body.append('projectID', currentProject.value.id.toString())

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projects.deleteContact/`,
      info: {
        method: 'POST',
        body
      }
    })

    if (!noUpdate) setGlobalProjectsUpdate()
  }

  const onEdit = async (payload: { id: number, link: string }) => {
    await onRemove(payload.id, true)
    await onAdd(payload.link, true)

    setGlobalProjectsUpdate()
  }

  return {
    onAdd, onRemove, onEdit
  }
}

export default useMedia
