import { ref, onMounted, watch } from 'vue'
import { fetchActions } from '@/store/constants'
import {
  useApiState, useAuthState, useDispatch
} from '@/utils'
import { SpecialtiesList } from '@/types'

const useAllSpecialties = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const fetchAllSpecialties = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

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
  watch(authState, async () => {
    allSpecialties.value = await fetchAllSpecialties()
  })

  return allSpecialties
}

export default useAllSpecialties
