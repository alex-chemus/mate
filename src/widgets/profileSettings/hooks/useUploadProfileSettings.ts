import { ref } from 'vue'
import { fetchActions } from '@/store/constants'
import {
  useApiState, useAuthState, useDispatch, useGlobalUpdate,
  Specialty
} from '@/utils'

const useUploadProfileSettings = ({
  uploadImage, uploadSpecialties
}: {
  uploadImage?: (type: 'avatar' | 'cover') => Promise<null | number>,
  uploadSpecialties?: () => Promise<void>
}) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { setGlobalUpdate } = useGlobalUpdate()

  const bio = ref<string | null>(null)
  const media = ref<null | {[index: string]: string}>(null)
  const skills = ref<string[] | null>(null)
  //const specialties = ref<Specialty[] | null>(null)

  // const uploadSpecialties = async () => {
  //   const body = new FormData()
  //   body.append('token', authState.value.token as string)
  //   if (specialties.value === null) return null
  //   body.append('specialtiesIDs', specialties.value.map((s) => s.id).join(', '))

  //   await dispatch(fetchActions.FETCH, {
  //     url: `${apiState.value.apiUrl}/mate/account.addSpecialties/`,
  //     info: {
  //       method: 'POST',
  //       body
  //     }
  //   })

  //   return null
  // }

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

    if (coverID) body.append('profileCover', `${coverID}`)
    if (avatarID) await uploadAvatar(avatarID)

    if (uploadSpecialties) await uploadSpecialties()

    if (bio.value || media.value || skills.value) {
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
  }
}

export default useUploadProfileSettings
