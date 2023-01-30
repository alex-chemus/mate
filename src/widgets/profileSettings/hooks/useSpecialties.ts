import { ref } from 'vue'
import {
  useApiState, useAuthState, useDispatch,
  Specialty, useAllSpecialties
} from '@/utils'
import { fetchActions } from '@/store/constants'

const useSpecialties = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const allSpecialties = useAllSpecialties()

  const selectedSpecialties = ref<number[] | null>(null)

  const uploadSpecialties = async () => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    if (selectedSpecialties.value?.length) {
      body.append('specialtiesIDs', selectedSpecialties.value.join(', '))

      await dispatch(fetchActions.FETCH, {
        url: `${apiState.value.apiUrl}/mate/account.addSpecialties/`,
        info: {
          method: 'POST',
          body
        }
      })
    }
  }

  return { allSpecialties, selectedSpecialties, uploadSpecialties }
}

export default useSpecialties
