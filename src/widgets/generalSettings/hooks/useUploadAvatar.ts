import { ref } from 'vue'
import { fetchActions } from '@/store/constants'
import {
  useApiState, useAuthState, useDispatch, FileInfo
} from '@/utils'

const useUploadAvatar = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const avatar = ref<null | File>(null)

  const setAvatar = (files: FileList) => {
    [avatar.value] = files
  }

  const uploadAvatar = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    if (!authState.value.token || !avatar.value) return null

    body.append('files', avatar.value)

    return ((await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.cloudUlr}/methods/cloud.uploadFiles/`,
      info: {
        method: 'POST',
        body
      }
    })) as FileInfo[])[0].fileID
  }

  return { setAvatar, uploadAvatar }
}

export default useUploadAvatar
