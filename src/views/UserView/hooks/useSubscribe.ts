import { ref } from 'vue'
import { useFetchSubscribe } from '@/shared/api'

const useSubscribe = () => {
  const subUpdate = ref<symbol>(Symbol())
  const { fetchSubscribe, fetchUnsubscribe } = useFetchSubscribe('[views/UserView/useSubscribe] Failed to subscribe or unsubscribe')

  const uploadSubscribe = async (userID: number) => {
    await fetchSubscribe('user', userID)
    subUpdate.value = Symbol()
  }

  const uploadUnsubscribe = async (userID: number) => {
    await fetchUnsubscribe('user', userID)
    subUpdate.value = Symbol()
  }

  return { uploadSubscribe, uploadUnsubscribe, subUpdate }
}

export default useSubscribe
