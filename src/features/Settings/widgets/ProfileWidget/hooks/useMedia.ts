import { useGlobalUpdate } from '@/shared/utils'
import useAppStore from '@/store/useAppStore'
import { fetchActions } from '@/store/constants'

const useMedia = () => {
  const { apiState, authState, dispatch } = useAppStore()
  const { setGlobalAccountUpdate } = useGlobalUpdate()

  const uploadMedia = async (payload: string, noUpdate?: boolean) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('type', 'socialNetwork')
    body.append('value', payload)

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/account.addContact/`,
      info: {
        method: 'POST',
        body
      },
      errorMessage: '[features/Settings/ProfileWidget/useMedia] Failed to upload contact'
    })

    if (!noUpdate) setGlobalAccountUpdate()
  }

  const removeMedia = async (payload: number, noUpdate?: boolean) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('type', 'socialNetwork')
    body.append('id', payload.toString())

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/account.deleteContact/`,
      info: {
        method: 'POST',
        body
      },
      errorMessage: '[features/Settings/ProfileWidget/useMedia] Failed to delete contact'
    })

    if (!noUpdate) setGlobalAccountUpdate()
  }

  const editMedia = async (payload: { id: number, link: string }) => {
    await removeMedia(payload.id, true)
    await uploadMedia(payload.link, true)

    setGlobalAccountUpdate()
  }

  return {
    uploadMedia, removeMedia, editMedia
  }
}

export default useMedia
