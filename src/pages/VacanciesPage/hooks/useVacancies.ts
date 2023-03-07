import {
  onMounted, Ref, ref, watch
} from 'vue'
import {
  useApiState, useAuthState, useDebounce, useDispatch
} from '@/utils'
import { useFetchFullProjectsInfo } from '@/api'
import { FullProjectInfo, FullVacancyInfo } from '@/types'
import { fetchActions } from '@/store/constants'
import { Theme } from '../types'

const useVacancies = (
  { selectedTheme }:
  {
    selectedTheme: Ref<Theme | null>
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

  const fetchVacancies = async () => {
    isLoading.value = true

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

    isLoading.value = false
  }

  onMounted(fetchVacancies)
  watch(selectedTheme, () => {
    limit.value = { from: 0, amount: 20 }
    fetchVacancies()
  })

  watch(vacancies, async () => {
    if (vacancies.value === null) return
    const projectsIDs = [...new Set(vacancies.value.map((v) => v.projectID))]
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

  return {
    vacancies, onType, isLoading, nextPage, prevPage, projectsInfo
  }
}

export default useVacancies
