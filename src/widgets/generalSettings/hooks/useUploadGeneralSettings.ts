import { ref, computed } from 'vue'
import { fetchActions } from '@/store/constants'
import {
  useApiState, useAuthState, useDispatch, useGlobalUpdate,
  FullAccountInfo
} from '@/utils'

const useUploadGeneralSettings = ({
  uploadAvatar,
}: {
  uploadAvatar?: () => Promise<null | number>,
  fullAccountInfo: FullAccountInfo
}) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { setGlobalAccountUpdate } = useGlobalUpdate()

  const firstName = ref<string | null>(null)
  const lastName = ref<string | null>(null)
  const patronymic = ref<string | null>(null)
  const textID = ref<string | null>(null)
  const sex = ref<1 | 2 | null>(null)
  const birthday = ref<string | null>()

  const getBirthday = computed(() => {
    if (!birthday.value) return null
    return birthday.value.split('.').reverse().join('-')
  })

  const setBirthday = (bd: string) => {
    birthday.value = bd.split('-').reverse().join('.')
  }

  const uploadGeneralSettings = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    const avatarID = uploadAvatar ? await uploadAvatar() : null

    if (firstName.value) body.append('firstName', firstName.value)
    if (lastName.value) body.append('lastName', lastName.value)
    if (patronymic.value) body.append('patronymic', patronymic.value)
    if (textID.value) body.append('textID', textID.value)
    if (sex.value) body.append('sex', `${sex.value}`)
    if (birthday.value) body.append('birthday', birthday.value)

    if (avatarID !== null)
      body.append('avatarImage', `${avatarID}`)

    if (firstName.value || lastName.value || patronymic.value ||
      textID.value || sex.value || birthday.value) {
      await dispatch(fetchActions.FETCH, {
        url: `${apiState.value.apiUrl}/id/account.setInfo/`,
        info: {
          method: 'POST',
          body
        }
      })
    }

    setGlobalAccountUpdate()
  }

  return {
    uploadGeneralSettings,
    firstName,
    lastName,
    patronymic,
    textID,
    sex,
    getBirthday,
    setBirthday
  }
}

export default useUploadGeneralSettings
