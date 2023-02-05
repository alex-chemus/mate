import { ref, onMounted } from 'vue'
import { fetchActions } from '@/store/constants'
import {
  useApiState, useAuthState, useDispatch, SpecialtiesList
} from '@/utils'

const useAllSpecialties = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const fetchAllSpecialties = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    if (!authState.value.token) return null

    return (await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/specialties.get/`,
      info: {
        method: 'POST',
        body
      }
    })) as SpecialtiesList
  }

  const allSpecialties = ref<SpecialtiesList | null>(null)

  onMounted(async () => {
    allSpecialties.value = await fetchAllSpecialties()
  })

  return allSpecialties
}

export default useAllSpecialties
