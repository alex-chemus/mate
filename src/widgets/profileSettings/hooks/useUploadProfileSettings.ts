import { ref, Ref } from 'vue'
import { fetchActions } from '@/store/constants'
import {
  useApiState, useAuthState, useDispatch, useGlobalUpdate,
  Location
} from '@/utils'

const useUploadProfileSettings = ({
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
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { setGlobalUpdate } = useGlobalUpdate()

  const bio = ref<string | null>(null)
  const media = ref<null | {[index: string]: string}>(null)
  const skills = ref<string[] | null>(null)
  //const address = ref<Location | null>(null)

  const uploadAvatar = async (avatarID: number) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('avatarImage', `${avatarID}`)

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/id/account.setInfo/`,
      info: {
        method: 'POST',
        body
      }
    })
  }

  const uploadProfileSettings = async () => {
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

    if (bio.value || media.value || skills.value || address.value) {
      await dispatch(fetchActions.FETCH, {
        url: `${apiState.value.apiUrl}/mate/account.setInfo/`,
        info: {
          method: 'POST',
          body
        }
      })
    }

    setGlobalUpdate()

    return null
  }

  return {
    uploadProfileSettings,
    bio,
    media,
    skills,
    address
  }
}

export default useUploadProfileSettings
