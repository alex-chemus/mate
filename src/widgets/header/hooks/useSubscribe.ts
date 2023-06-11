import { ref } from 'vue'
import { useFetchSubscribe } from '@/api'
import { KeyedSearchItem } from '../types'
import useTypeChecks from './useTypeChecks'

const useSubscribe = () => {
  const { fetchSubscribe, fetchUnsubscribe } = useFetchSubscribe()
  const { isUser } = useTypeChecks()

  const subUpdate = ref<symbol>(Symbol())

  const subscribe = (payload: KeyedSearchItem) => {
    if (isUser(payload)) fetchSubscribe('user', payload.findcreekID)
    else fetchSubscribe('project', payload.id)
    subUpdate.value = Symbol()
  }

  const unsubscribe = (payload: KeyedSearchItem) => {
    if (isUser(payload)) fetchUnsubscribe('user', payload.findcreekID)
    else fetchUnsubscribe('project', payload.id)
    subUpdate.value = Symbol()
  }

  return { subscribe, unsubscribe, subUpdate }
}

export default useSubscribe
