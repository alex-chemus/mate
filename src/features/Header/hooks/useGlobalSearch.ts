import { ref, computed, watch, Ref } from 'vue'
import { useDebounce } from '@/shared/utils'
import useAppStore from '@/store/useAppStore'
import { fetchActions } from '@/store/constants'
import { SearchItem, KeyedSearchItem, SearchFilters } from '../types'

const useGlobalSearch = ({ update }: { update: Ref<symbol> }) => {
  const { apiState, authState, dispatch } = useAppStore()

  const searchItems = ref<SearchItem[] | null>(null)
  const isLoading = ref(false)
  const getSearchItems = computed<KeyedSearchItem[] | undefined>(() => {
    if (searchItems.value === null) return undefined
    return searchItems.value.map((item, i) => ({ ...item, searchID: i } as KeyedSearchItem))
  })

  const filters = ref<SearchFilters[]>(['projects', 'users']) // null - both
  const toggleFilters = (filter: SearchFilters) => {
    if (filters.value.includes(filter))
      filters.value = filters.value.filter((f) => f !== filter)
    else
      filters.value = [...filters.value, filter]
  }

  const fetchGlobalSearch = async (text: string) => {
    if (text === '') return []

    isLoading.value = true
    const body = new FormData()
    body.append('token', authState.value.token as string)

    body.append('searchText', text)

    body.append('searchArea', filters.value.join(', '))

    body.append('usersFields', [
      'firstName', 'lastName', 'bio', 'textID',
      'specialties', 'avatar', 'profileCover', 'findcreekID',
      'isSubscribed'
    ].join(', '))

    body.append('projectsFields', [
      'name', 'textID', 'avatar', 'profileCover',
      'description', 'id', 'isSubscribed'
    ].join(', '))

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/other.globalSearch/`,
      info: {
        method: 'POST',
        body
      },
      errorMessage: '[features/Header/useGlobalSearch] Failed to fetch global search'
    })) as SearchItem[]
  }

  const searchText = ref<string | null>(null)

  const { debounced: onSearch } = useDebounce(async (p: string) => {
    searchText.value = p
    searchItems.value = await fetchGlobalSearch(p)
    isLoading.value = false
  }, 1000)

  watch([filters, update], () => {
    if (searchText.value === null) return
    onSearch(searchText.value)
  })

  return {
    onSearch, getSearchItems, toggleFilters, isLoading, filters
  }
}

export default useGlobalSearch
