import { ref, watch } from 'vue'
import { useGlobalUpdate } from '@/utils'
import { Tab } from '../types'

const useUpdate = (len: number) => {
  const { setGlobalUpdate } = useGlobalUpdate()

  const updatedTabs = ref(new Set<Tab>())

  const updated = (tab: Tab) => {
    updatedTabs.value.add(tab)
  }

  watch(updatedTabs, () => {
    if (updatedTabs.value.size === len) {
      setGlobalUpdate()
      updatedTabs.value.clear()
    }
  })

  return updated
}

export default useUpdate
