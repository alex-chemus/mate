import { ref, onMounted, watch } from 'vue'
import { fetchActions } from '@/store/constants'
import useAppStore from '@/store/useAppStore'
import { SpecialtiesList } from '@/shared/types'

const useAllSpecialties = (logErrorMessage?: string) => {
  const { apiState, authState, dispatch } = useAppStore()

  const fetchAllSpecialties = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/specialties.get/`,
      info: { method: 'POST', body },
      errorMessage: logErrorMessage
    })) as SpecialtiesList
  }

  const allSpecialties = ref<SpecialtiesList | null>(null)

  onMounted(async () => {
    allSpecialties.value = await fetchAllSpecialties()
  })
  watch(authState, async () => {
    allSpecialties.value = await fetchAllSpecialties()
  })

  return allSpecialties
}

export default useAllSpecialties
