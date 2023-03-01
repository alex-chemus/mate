import { ref } from 'vue'
import { useFetchSubscribe } from '@/api'

const useSubscribe = () => {
  const subUpdate = ref<symbol>(Symbol())
  const { fetchSubscribe, fetchUnsubscribe } = useFetchSubscribe()

  const subscribe = async (userID: number) => {
    await fetchSubscribe('user', userID)
    subUpdate.value = Symbol()
  }

  const unsubscribe = async (userID: number) => {
    await fetchUnsubscribe('user', userID)
    subUpdate.value = Symbol()
  }

  return { subscribe, unsubscribe, subUpdate }
}

export default useSubscribe
