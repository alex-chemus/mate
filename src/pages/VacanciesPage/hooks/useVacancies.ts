import {
  onMounted, Ref, ref, watch, computed
} from 'vue'
import {
  useApiState, useAuthState, useDebounce, useDispatch
} from '@/utils'
import { useFetchFullProjectsInfo } from '@/api'
import { FullProjectInfo, FullVacancyInfo } from '@/types'
import { fetchActions } from '@/store/constants'
import { Theme } from '../types'

const useVacancies = (
  { selectedTheme, update }:
  {
    selectedTheme: Ref<Theme | null>,
    update?: Ref<symbol | null> | Ref<symbol | null>[]
  }
) => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()
  const fetchFullProjectsInfo = useFetchFullProjectsInfo()

  const searchText = ref<string | null>(null)
  const limit = ref({ from: 0, amount: 20 })
  const vacancies = ref<FullVacancyInfo[] | null>(null)
  const isLoading = ref(false)
  const isLastPage = ref(false)
  const projectsInfo = ref<FullProjectInfo[] | null>(null)

  const fetchVacancies = async (shouldNotSetLoading?: boolean) => {
    if (!shouldNotSetLoading) isLoading.value = true

    const body = new FormData()
    body.append('token', authState.value.token as string)

    if (searchText.value)
      body.append('searchText', searchText.value)
    if (selectedTheme.value)
      body.append('themeID', selectedTheme.value.id.toString())
    body.append('limit', `${limit.value.from},${limit.value.amount}`)

    vacancies.value = (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projectVacancies.search/`,
      info: {
        method: 'POST',
        body
      }
    })) as FullVacancyInfo[]

    if (vacancies.value.length < limit.value.amount)
      isLastPage.value = true

    if (!shouldNotSetLoading) isLoading.value = false
  }

  onMounted(fetchVacancies)
  if (update) watch(update, () => fetchVacancies(true))
  watch(selectedTheme, () => {
    limit.value = { from: 0, amount: 20 }
    fetchVacancies()
  })

  watch(vacancies, async () => {
    if (vacancies.value === null) return
    const projectsIDs = [...new Set(vacancies.value.map((v) => v.projectID))]
    if (projectsIDs.length > 0)
      projectsInfo.value = await fetchFullProjectsInfo(projectsIDs)
  })

  const { debounced: debouncedFetch } = useDebounce(fetchVacancies, 1500)
  const onType = (s: string) => {
    searchText.value = s
    limit.value = { from: 0, amount: 20 }
    debouncedFetch()
  }

  const nextPage = () => {
    if (isLastPage.value) return
    limit.value = {
      from: limit.value.from + limit.value.amount,
      amount: limit.value.amount
    }
    fetchVacancies()
  }

  const prevPage = () => {
    if (limit.value.from === 0) return
    limit.value = {
      from: limit.value.from - limit.value.amount,
      amount: limit.value.amount
    }
    fetchVacancies()
  }

  const isFirstPage = computed(() => limit.value.from === 0)

  return {
    vacancies,
    onType,
    isLoading,
    nextPage,
    prevPage,
    projectsInfo,
    isLastPage,
    isFirstPage
  }
}

export default useVacancies
