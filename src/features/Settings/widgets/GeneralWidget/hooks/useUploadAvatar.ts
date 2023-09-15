import { ref } from 'vue'
import { fetchActions } from '@/store/constants'
import useAppStore from '@/store/useAppStore'
import { FileInfo } from '@/shared/types'

const useUploadAvatar = () => {
  const { apiState, authState, dispatch } = useAppStore()

  const avatar = ref<null | File>(null)

  const setAvatar = (files: FileList) => {
    [avatar.value] = files
  }

  const uploadAvatar = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    if (!avatar.value) return null

    body.append('files', avatar.value)

    return ((await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.cloudUlr}/methods/cloud.uploadFiles/`,
      info: {
        method: 'POST',
        body
      },
      errorMessage: '[features/Settings/GeneralWidget/useUploadAvatar] Failed to upload avatar'
    })) as FileInfo[])[0].fileID
  }

  return { setAvatar, uploadAvatar }
}

export default useUploadAvatar
