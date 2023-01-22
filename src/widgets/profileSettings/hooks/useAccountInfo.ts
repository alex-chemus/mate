import {
  ref, onMounted, watch, computed
} from 'vue'
import {
  useApiState, useAuthState, useDispatch, useUpdate
} from '@/utils'
import { fetchActions } from '@/store/constants'
import { AccountInfo } from '../types'

type Props = Readonly<{
  isOpen: boolean,
  fullName?: string,
  email?: string,
  img?: string
}>

const useAccountInfo = (props: Props) => {
  if (props.email && props.fullName && props.img) {
    return {
      getFullName: computed(() => props.fullName),
      getEmail: computed(() => props.email),
      getImg: computed(() => props.img)
    }
  }

  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const { update } = useUpdate()

  const body = new FormData()
  body.append('token', authState.value.token as string)

  const fields = ['firstName', 'lastName', 'avatar', 'email']
  body.append('fields', fields.join(', '))

  const fetchAccountInfo = async () => {
    if (!authState.value.token) return null

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/account.getInfo/`,
      info: {
        method: 'POST',
        body
      }
    })) as AccountInfo
  }

  const accountInfo = ref<AccountInfo | null>(null)

  onMounted(async () => {
    accountInfo.value = await fetchAccountInfo()
  })

  watch(update, async () => {
    accountInfo.value = await fetchAccountInfo()
  })

  const getFullName = computed(() => {
    if (props.fullName) return props.fullName
    return accountInfo.value
      ? `${accountInfo.value.firstName} ${accountInfo.value.lastName}`
      : null
  })

  const getImg = computed(() => {
    if (props.img) return props.img
    return accountInfo.value
      ? accountInfo.value.avatar.avatarCompressed
      : null
  })

  const getEmail = computed(() => {
    if (props.email) return props.email
    return accountInfo.value
      ? accountInfo.value.email
      : null
  })

  return { getFullName, getImg, getEmail }
}

export default useAccountInfo
