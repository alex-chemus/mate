import { ref, computed, Ref } from 'vue'
import { fetchActions } from '@/store/constants'
import {
  useApiState, useAuthState, useDispatch, useGlobalUpdate
} from '@/utils'

const useUploadProjectSettings = ({ uploadImage, currentProjectID }: {
  uploadImage?: (type: 'avatar' | 'cover') => Promise<null | number>,
  currentProjectID: Ref<number | null>
}) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { setGlobalUpdate } = useGlobalUpdate()

  const allProjectsInfo = ref<{
    [index: number]: {
      slogan: string | null,
      foundationDate: string | null,
    }
  }>({})

  const currentProjectInfo = computed(() => {
    if (currentProjectID.value === null) return null

    if (!(currentProjectID.value! in allProjectsInfo.value)) {
      allProjectsInfo.value[currentProjectID.value!] = {
        slogan: null,
        foundationDate: null
      }

      return allProjectsInfo.value[currentProjectID.value!]
    }

    return allProjectsInfo.value[currentProjectID.value!]
  })

  const getSlogan = computed(() => {
    if (!currentProjectInfo.value) return null
    return currentProjectInfo.value.slogan
  })
  const setSlogan = (value: string) => {
    allProjectsInfo.value[currentProjectID.value!].slogan = value
  }

  const getFoundationDate = computed(() => {
    if (!currentProjectInfo.value || !currentProjectInfo.value.foundationDate) return null
    return currentProjectInfo.value.foundationDate?.split('.').reverse().join('-')
  })
  const setFoundationDate = (value: string) => {
    allProjectsInfo.value[currentProjectID.value!].foundationDate = value.split('-').reverse().join('.')
  }

  const uploadProjectSettings = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    const avatarID = uploadImage ? await uploadImage('avatar') : null
    const coverID = uploadImage ? await uploadImage('cover') : null

    if (currentProjectInfo.value) {
      if (currentProjectInfo.value.slogan)
        body.append('slogan', currentProjectInfo.value.slogan)
      if (currentProjectInfo.value.foundationDate)
        body.append('foundationDate', currentProjectInfo.value.foundationDate)
    }

    if (avatarID) body.append('avatar', avatarID.toString())
    if (coverID) body.append('profileCover', coverID.toString())

    if ((body.has('slogan') || body.has('foundationDate')
      || body.has('avatar') || body.has('profileCover')) && currentProjectID.value) {
      body.append('projectID', currentProjectID.value.toString())
      await dispatch(fetchActions.FETCH, {
        url: `${apiState.value.apiUrl}/mate/projects.setInfo/`,
        info: {
          method: 'POST',
          body
        }
      })
    }

    setGlobalUpdate()
  }

  return {
    setSlogan,
    getSlogan,
    setFoundationDate,
    getFoundationDate,
    uploadProjectSettings,
    currentProjectInfo
  }
}

export default useUploadProjectSettings
