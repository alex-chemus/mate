import { ref } from 'vue'
import { fetchActions } from '@/store/constants'
import useAppStore from '@/store/useAppStore'
import { FileInfo } from '@/shared/types'

const useUpload = () => {
  const { apiState, authState, dispatch } = useAppStore()

  const avatar = ref<null | File>(null)
  const cover = ref<null | File>(null)

  const setAvatar = (files: FileList) => {
    [avatar.value] = files
  }

  const setCover = (files: FileList) => {
    [cover.value] = files
  }

  const uploadImage = async (type: 'avatar' | 'cover') => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    if (type === 'avatar') {
      if (!avatar.value) return null
      body.append('files', avatar.value)
    }

    if (type === 'cover') {
      if (!cover.value) return null
      body.append('files', cover.value)
    }

    const res = (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.cloudUlr}/methods/cloud.uploadFiles/`,
      info: { method: 'POST', body },
      errorMessage: '[view/NewProjectView/useImages] Failed to upload avatar or cover'
    })) as FileInfo[]

    return res[0].fileID
  }

  return { setAvatar, setCover, uploadImage }
}

export default useUpload
