import { ref } from 'vue'
import {
  FullAccountInfo, SocialMedia, useApiState, useAuthState, useDispatch, useGlobalUpdate
} from '@/utils'
import { fetchActions } from '@/store/constants'

const useMedia = ({ fullAccountInfo }: { fullAccountInfo: FullAccountInfo }) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { setGlobalUpdate } = useGlobalUpdate()

  const media = ref<SocialMedia[]>(fullAccountInfo.contacts.socialNetworks)

  const onAdd = async (payload: string, noUpdate?: boolean) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('type', 'socialNetwork')
    body.append('value', payload)

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/account.addContact/`,
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

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/account.deleteContact/`,
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
    media, onAdd, onRemove, onEdit
  }
}

export default useMedia
