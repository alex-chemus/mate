<script lang="ts" setup>
import {
  defineProps, defineEmits, computed, ref
} from 'vue'
import { Location } from '@/shared/types'
import { SearchDropdown } from '@/shared/ui'

const props = defineProps<{
  locations: Location[] | null,
  isLoading?: boolean,
  isVisible?: boolean,
  selected?: Location,
  address?: string
}>()

const emit = defineEmits<{
  (e: 'update:visible', payload: boolean): void
  (e: 'select', location: Location): void,
  (e: 'input', value: string): void
}>()

const getLocations = computed(() => {
  if (!props.locations) return null
  return props.locations.map((loc, i) => ({
    id: i,
    value: loc.endpointName
  }))
})

const inputValue = ref(props.address ?? '')
const emitInput = (s: string) => {
  inputValue.value = s
  emit('input', s)
}

const selected = ref<number | undefined>()
const emitSelect = (i: number) => {
  selected.value = i
  if (props.locations) {
    inputValue.value = props.locations[i].endpointName
    emit('select', props.locations[i])
  }
}
</script>

<template>
  <search-dropdown
    :items="getLocations"
    :selected="selected"
    :loading="isLoading"
    :visible="isVisible"
    :input-value="inputValue"
    @update:visible="p => emit('update:visible', p)"
    @update:input-value="emitInput"
    @select="emitSelect"
  />
</template>
