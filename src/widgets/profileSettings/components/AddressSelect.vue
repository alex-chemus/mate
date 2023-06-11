<script lang="ts" setup>
import {
  defineProps, defineEmits, computed, ref
} from 'vue'
import { Location } from '@/types'
import { SearchDropdown } from '@/ui'

const props = defineProps<{
  locations: Location[] | null,
  loading?: boolean,
  visible?: boolean,
  selected?: Location,
  address?: string
}>()

const emit = defineEmits<{
  (e: 'update:visible', payload: boolean): void
  (e: 'select', payload: Location): void,
  (e: 'input', payload: string): void
}>()

const getLocations = computed(() => {
  if (!props.locations) return null
  return props.locations.map((loc, i) => ({
    id: i,
    value: loc.endpointName
  }))
})

const inputValue = ref(props.address ?? '')
const onInput = (s: string) => {
  inputValue.value = s
  emit('input', s)
}

const selected = ref<number | undefined>()
const onSelect = (i: number) => {
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
    :loading="loading"
    :visible="visible"
    :input-value="inputValue"
    @update:visible="p => emit('update:visible', p)"
    @update:input-value="onInput"
    @select="onSelect"
  />
</template>
