import { ref } from 'vue'
import { fetchActions } from '@/store/constants'
import {
  useApiState, useAuthState, useDispatch, useGlobalUpdate
} from '@/utils'

const useUploadForm = ({
  uploadAvatar
}: {
  uploadAvatar?: () => Promise<null | number>
}) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { setGlobalUpdate } = useGlobalUpdate()

  const firstName = ref<string | null>(null)
  const lastName = ref<string | null>(null)
  const patronymic = ref<string | null>(null)
  const textID = ref<string | null>(null)
  const sex = ref<1 | 2 | null>(null)

  const body = new FormData()
  body.append('token', authState.value.token as string)

  const uploadForm = async () => {
    const avatarID = uploadAvatar ? await uploadAvatar() : null

    if (firstName.value)
      body.append('firstName', firstName.value)

    if (lastName.value)
      body.append('lastName', lastName.value)

    if (patronymic.value)
      body.append('patronymic', patronymic.value)

    if (textID.value)
      body.append('textID', textID.value)

    if (sex.value)
      body.append('sex', `${sex.value}`)

    if (avatarID !== null)
      body.append('avatarImage', `${avatarID}`)

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/id/account.setInfo/`,
      info: {
        method: 'POST',
        body
      }
    })

    setGlobalUpdate()
  }

  return {
    uploadForm,
    firstName,
    lastName,
    patronymic,
    textID,
    sex
  }
}

export default useUploadForm
