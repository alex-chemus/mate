import { ref, computed, Ref } from 'vue'
import { fetchActions } from '@/store/constants'
import {
  useApiState, useAuthState, useDispatch, useGlobalUpdate,
  useAlert
} from '@/shared/utils'

const useSettings = ({ uploadImage, currentProjectID }: {
  uploadImage?: (type: 'avatar' | 'cover') => Promise<null | number>,
  currentProjectID: Ref<number | null>
}) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { setGlobalProjectsUpdate } = useGlobalUpdate()
  const { setSuccessMessage } = useAlert()

  const disabled = ref(false)

  const allProjectsInfo = ref<{
    [index: number]: {
      slogan: string | null,
      foundationDate: string | null,
    }
  }>({})

  const currentProject = computed(() => {
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
    if (!currentProject.value) return null
    return currentProject.value.slogan
  })
  const setSlogan = (slogan: string) => {
    allProjectsInfo.value[currentProjectID.value!].slogan = slogan
  }

  const getFoundationDate = computed(() => {
    if (!currentProject.value || !currentProject.value.foundationDate) return null
    return currentProject.value.foundationDate?.split('.').reverse().join('-')
  })
  const setFoundationDate = (date: string) => {
    allProjectsInfo.value[currentProjectID.value!].foundationDate = date.split('-').reverse().join('.')
  }

  const uploadSettings = async () => {
    disabled.value = true

    const body = new FormData()
    body.append('token', authState.value.token as string)

    const avatarID = uploadImage ? await uploadImage('avatar') : null
    const coverID = uploadImage ? await uploadImage('cover') : null

    if (currentProject.value) {
      if (currentProject.value.slogan)
        body.append('slogan', currentProject.value.slogan)
      if (currentProject.value.foundationDate)
        body.append('foundationDate', currentProject.value.foundationDate)
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
        },
        errorMessage: '[features/Settings/ProjectsWidget/useSettings] Failed to upload project settings'
      })
    }

    setGlobalProjectsUpdate()
    setSuccessMessage('Сохранено')

    disabled.value = false
  }

  return {
    setSlogan,
    getSlogan,
    setFoundationDate,
    getFoundationDate,
    uploadSettings,
    currentProject,
    disabled
  }
}

export default useSettings
