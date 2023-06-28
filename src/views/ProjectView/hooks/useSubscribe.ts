import { ref } from 'vue'
import { useFetchSubscribe } from '@/shared/api'

const useSubscribe = () => {
  const subUpdate = ref<symbol>(Symbol())
  const { fetchSubscribe, fetchUnsubscribe } = useFetchSubscribe('[views/ProjectView/useSubscribe] Failed to subscribe or unsubscribe')

  const subscribe = async (projectID: number) => {
    await fetchSubscribe('project', projectID)
    subUpdate.value = Symbol()
  }

  const unsubscribe = async (projectID: number) => {
    await fetchUnsubscribe('project', projectID)
    subUpdate.value = Symbol()
  }

  return { subscribe, unsubscribe, subUpdate }
}

export default useSubscribe
