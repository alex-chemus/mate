import { ref, Ref, computed } from 'vue'
import { fetchActions } from '@/store/constants'
import { useApiState, useAuthState, useDispatch } from '@/shared/utils'
import { FileInfo } from '@/shared/types'

const useImages = ({ currentProjectID }: {
  currentProjectID: Ref<number | null>
}) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const allProjectImages = ref<{
    [index: number]: {
      avatar: File | null,
      cover: File | null
    }
  }>({})

  const currentProjectImages = computed(() => {
    if (currentProjectID.value === null) return null

    if (!(currentProjectID.value! in allProjectImages.value)) {
      allProjectImages.value[currentProjectID.value!] = {
        avatar: null,
        cover: null
      }

      return allProjectImages.value[currentProjectID.value!]
    }

    return allProjectImages.value[currentProjectID.value!]
  })

  const setAvatar = (files: FileList) => {
    //[avatar.value] = files
    [allProjectImages.value[currentProjectID.value!].avatar] = files
  }

  const setCover = (files: FileList) => {
    //[cover.value] = files
    [allProjectImages.value[currentProjectID.value!].cover] = files
  }

  const getAvatar = computed(() => {
    if (!currentProjectImages.value || !currentProjectImages.value.avatar) return null
    return URL.createObjectURL(currentProjectImages.value.avatar)
  })

  const getCover = computed(() => {
    if (!currentProjectImages.value || !currentProjectImages.value.cover) return null
    return URL.createObjectURL(currentProjectImages.value.cover)
  })

  const uploadImage = async (type: 'avatar' | 'cover') => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    if (!currentProjectImages.value) return null

    if (type === 'avatar') {
      if (!currentProjectImages.value.avatar) return null
      body.append('files', currentProjectImages.value.avatar)
    }

    if (type === 'cover') {
      if (!currentProjectImages.value.cover) return null
      body.append('files', currentProjectImages.value.cover)
    }

    return ((await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.cloudUlr}/methods/cloud.uploadFiles/`,
      info: {
        method: 'POST',
        body
      },
      errorMessage: '[features/Settings/projectsWidget/useImages] Failed to upload avatar or cover'
    })) as FileInfo[])[0].fileID
  }

  return {
    setAvatar, setCover, getAvatar, getCover, uploadImage
  }
}

export default useImages
