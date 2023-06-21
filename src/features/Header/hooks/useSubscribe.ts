import { ref } from 'vue'
import { useFetchSubscribe } from '@/api'
import { KeyedSearchItem } from '../types'
import useTypeChecks from './useTypeChecks'

const useSubscribe = () => {
  const { fetchSubscribe, fetchUnsubscribe } = useFetchSubscribe('[features/Header/useSubscribe] Failed to subscribe or unsubscribe')
  const { isUser } = useTypeChecks()

  const subUpdate = ref<symbol>(Symbol())

  const uploadSubscribe = (payload: KeyedSearchItem) => {
    if (isUser(payload)) fetchSubscribe('user', payload.findcreekID)
    else fetchSubscribe('project', payload.id)
    subUpdate.value = Symbol()
  }

  const uploadUnsubscribe = (payload: KeyedSearchItem) => {
    if (isUser(payload)) fetchUnsubscribe('user', payload.findcreekID)
    else fetchUnsubscribe('project', payload.id)
    subUpdate.value = Symbol()
  }

  return { uploadSubscribe, uploadUnsubscribe, subUpdate }
}

export default useSubscribe
