import { ref, watch } from 'vue'
import useAppStore from '@/store/useAppStore'
import { useAllSpecialties } from '@/shared/api'
import { fetchActions } from '@/store/constants'
import { FullAccount } from '@/shared/types'

const useSpecialties = ({ fullAccount }: { fullAccount: FullAccount }) => {
  const { apiState, authState, dispatch } = useAppStore()

  const allSpecialties = useAllSpecialties('[features/Settings/ProfileWidget/useSpecialties] Failed to fetch specialties')

  const selectedSpecialties = ref<number[]>(fullAccount.specialties.map((s) => s.id))
  const wasUpdated = ref(false)
  watch(selectedSpecialties, () => {
    wasUpdated.value = true
  })

  const addedSpecialties = ref(new Set<number>())
  const deletedSpecialties = ref(new Set<number>())

  const uploadSpecialties = async () => {
    if (addedSpecialties.value.size > 0) {
      const body = new FormData()
      body.append('token', authState.value.token as string)
      body.append('specialtiesIDs', [...addedSpecialties.value].join(', '))

      await dispatch(fetchActions.FETCH, {
        url: `${apiState.value.apiUrl}/mate/account.addSpecialties/`,
        info: { method: 'POST', body },
        errorMessage: '[features/Settings/ProfileWidget/useSpecialties] Failed to add specialties'
      })
    }

    if (deletedSpecialties.value.size > 0) {
      const body = new FormData()
      body.append('token', authState.value.token as string)
      body.append('specialtiesIDs', [...deletedSpecialties.value].join(', '))

      await dispatch(fetchActions.FETCH, {
        url: `${apiState.value.apiUrl}/mate/account.deleteSpecialties/`,
        info: { method: 'POST', body },
        errorMessage: '[features/Settings/ProfileWidget/useSpecialties] Failed to delete specialties'
      })
    }
  }

  // const uploadAddSpecialty = async (id: number, callback?: () => void) => {
  //   const body = new FormData()
  //   body.append('token', authState.value.token as string)
  //   body.append('specialtiesIDs', id.toString())

  //   await dispatch(fetchActions.FETCH, {
  //     url: `${apiState.value.apiUrl}/mate/account.addSpecialties/`,
  //     info: { method: 'POST', body },
  //     errorMessage: '[features/Settings/ProfileWidget/useSpecialties] Failed to add specialties'
  //   })

  //   if (callback) callback()
  // }

  // const uploadDeleteSpecialty = async (id: number, callback?: () => void) => {
  //   const body = new FormData()
  //   body.append('token', authState.value.token as string)
  //   body.append('specialtiesIDs', id.toString())

  //   await dispatch(fetchActions.FETCH, {
  //     url: `${apiState.value.apiUrl}/mate/account.deleteSpecialties/`,
  //     info: { method: 'POST', body },
  //     errorMessage: '[features/Settings/ProfileWidget/useSpecialties] Failed to delete specialties'
  //   })

  //   if (callback) callback()
  // }

  return {
    allSpecialties, addedSpecialties, deletedSpecialties, uploadSpecialties, selectedSpecialties
  }
}

export default useSpecialties
