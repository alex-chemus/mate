import { ref, computed, watch } from 'vue'
import { fetchActions } from '@/store/constants'
import {
  useApiState, useAuthState, useDispatch, useDebounce
} from '@/utils'
import { Location, ExcludeProperties } from '@/types'

const useAddress = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const addressValue = ref<ExcludeProperties<Location, 'endpointName'> | null>(null)
  const allLocations = ref<Location[] | null>(null)
  const selectedLocation = ref<Location | undefined>()

  const onSelect = (loc: Location) => {
    selectedLocation.value = loc
    addressValue.value = {
      cityID: loc.cityID,
      regionID: loc.regionID,
      countryID: loc.countryID
    }
  }

  const isFetching = ref(false)
  const lclFetchLocation = async (address: string) => {
    isFetching.value = true
    if (address.length === 0) {
      allLocations.value = []
      isFetching.value = false
      return
    }
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('searchText', address)

    allLocations.value = await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/id/other.identifyLocation/`,
      info: {
        method: 'POST',
        body
      },
      errorMessage: '[features/Settings/ProfileWidget/useAddress] Failed to fetch locations'
    }) as Location[]

    isFetching.value = false
  }

  const {
    debounced: fetchLocations,
    debouncing
  } = useDebounce(lclFetchLocation, 1500)

  const locationsLoading = computed(() => {
    return debouncing.value || isFetching.value
  })

  return {
    fetchLocations, locationsLoading, allLocations, addressValue, onSelect, selectedLocation
  }
}

export default useAddress
