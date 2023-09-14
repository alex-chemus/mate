import { ref, Ref } from 'vue'
import { fetchActions } from '@/store/constants'
import useAppStore from '@/store/useAppStore'
import { useGlobalUpdate, useAlert } from '@/shared/utils'

const useSettings = ({
  uploadImage, uploadSpecialties, address
}: {
  uploadImage?: (type: 'avatar' | 'cover') => Promise<null | number>,
  uploadSpecialties?: () => Promise<void>,
  address: Ref<{
    cityID: number,
    regionID: number,
    countryID: number
  } | null>
}) => {
  const { apiState, authState, dispatch } = useAppStore()
  const { setGlobalAccountUpdate } = useGlobalUpdate()
  const { setSuccessMessage } = useAlert()

  const bio = ref<string | null>(null)
  const media = ref<null | {[index: string]: string}>(null)
  const skills = ref<string[] | null>(null)
  const disabled = ref(false)
  //const address = ref<Location | null>(null)

  const uploadAvatar = async (avatarID: number) => {
    disabled.value = true

    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('avatarImage', `${avatarID}`)

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/id/account.setInfo/`,
      info: {
        method: 'POST',
        body
      },
      errorMessage: '[features/Settings/ProfileWidget/useSettings] Failed to set avatar image'
    })

    disabled.value = false
  }

  const uploadSettings = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    const avatarID = uploadImage ? await uploadImage('avatar') : null
    const coverID = uploadImage ? await uploadImage('cover') : null

    if (bio.value) body.append('bio', bio.value)
    if (media.value) body.append('media', JSON.stringify(media.value))
    if (skills.value) body.append('skills', skills.value.join(', '))

    if (address.value) {
      body.append('address', JSON.stringify(address.value))
    }

    if (coverID) body.append('profileCover', `${coverID}`)
    if (avatarID) await uploadAvatar(avatarID)

    if (uploadSpecialties) await uploadSpecialties()

    if (bio.value || media.value || skills.value || address.value || coverID) {
      await dispatch(fetchActions.FETCH, {
        url: `${apiState.value.apiUrl}/mate/account.setInfo/`,
        info: { method: 'POST', body },
        errorMessage: '[features/Settings/ProfileWidget/useSettings] Failed to upload settings'
      })
    }

    setGlobalAccountUpdate()
    setSuccessMessage('Сохранено')

    return null
  }

  return {
    uploadSettings,
    bio,
    media,
    skills,
    address,
    disabled
  }
}

export default useSettings
