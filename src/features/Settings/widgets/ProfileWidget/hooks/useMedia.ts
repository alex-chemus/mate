import { useGlobalRefresher } from '@/shared/utils'
import useAppStore from '@/store/useAppStore'
import { fetchActions } from '@/store/constants'

const useMedia = () => {
  const { apiState, authState, dispatch } = useAppStore()
  const { refreshAccountGlobal } = useGlobalRefresher()

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

    if (!noUpdate) refreshAccountGlobal()
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

    if (!noUpdate) refreshAccountGlobal()
  }

  const editMedia = async (payload: { id: number, link: string }) => {
    await removeMedia(payload.id, true)
    await uploadMedia(payload.link, true)

    refreshAccountGlobal()
  }

  return {
    uploadMedia, removeMedia, editMedia
  }
}

export default useMedia
