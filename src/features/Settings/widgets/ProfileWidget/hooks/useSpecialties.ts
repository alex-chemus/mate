import { ref } from 'vue'
import { useApiState, useAuthState, useDispatch } from '@/shared/utils'
import { useAllSpecialties } from '@/shared/api'
import { fetchActions } from '@/store/constants'

const useSpecialties = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const allSpecialties = useAllSpecialties('[features/Settings/ProfileWidget/useSpecialties] Failed to fetch specialties')

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
        },
        errorMessage: '[features/Settings/ProfileWidget/useSpecialties] Failed to add specialties'
      })
    }
  }

  return { allSpecialties, selectedSpecialties, uploadSpecialties }
}

export default useSpecialties
