import {
  ref, computed, ComputedRef, watch
} from 'vue'
import {
  FullProjectInfo
} from '@/utils'
import { Member } from '../types'
import userCurrentProjectMembers from './useCurrentProjectMembers'

const useMembers = ({ currentProject }: {
  currentProject: ComputedRef<FullProjectInfo | null>
}) => {
  const currentProjectMembers = userCurrentProjectMembers({ currentProject })

  const searchedMembers = ref<Member[] | null>(null)
  watch(currentProjectMembers, (next, prev) => {
    if (prev !== null) searchedMembers.value = null
    if (next !== null) searchedMembers.value = currentProjectMembers.value
  })

  const onSearch = (searchString: string) => {
    if (!currentProjectMembers.value) return null
    searchedMembers.value = currentProjectMembers.value.filter((m) => {
      return m.fullName.toLocaleLowerCase().includes(searchString.toLocaleLowerCase().trim())
        || m.textID.toLocaleLowerCase().includes(searchString.toLocaleLowerCase().trim())
    })
    return null
  }

  const sortedMembers = computed(() => {
    if (!searchedMembers.value) return null
    return [
      ...searchedMembers.value.filter((m) => m.role === 'founder'),
      ...searchedMembers.value.filter((m) => m.role === 'administrator'),
      ...searchedMembers.value.filter((m) => m.role === 'editor')
    ]
  })

  return { currentProjectMembers, sortedMembers, onSearch }
}

export default useMembers
