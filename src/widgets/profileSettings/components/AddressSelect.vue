<script lang="ts" setup>
import {
  defineProps, defineEmits, computed, ref
} from 'vue'
import { Location } from '@/utils'
import { Select } from '@/hocs'

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
  <Select
    :items="getLocations"
    :selected="selected"
    :loading="loading"
    :visible="visible"
    :input-value="inputValue"
    @update:visible="p => emit('update:visible', p)"
    @update:input-value="onInput"
    @select="onSelect"
  />
  <!-- eslint-disable -->
  <!-- <div class="select-container">
    <Input
      :value="selected?.endpointName ?? inputValue"
      @update:value="p => inputValue = p"
      @update:focused="onFocusChange"
      placeholder="Адрес проживания" label-text="Адрес проживания"
    />
 
    <popup-transition>
      <div v-if="visible" class="dropdown" :class="theme" @click="onDropdownClick">
        <div v-if="loading" class="loader">
          <loader />
        </div>
      
        <ul v-else-if="getLocations && getLocations.length">
          <li
            v-for="loc in getLocations" :key="loc.i"
            class="item" :class="[
              focusedItem === loc.i ? 'focused' : '',
              theme,
              isSelected(loc) ? 'selected' : ''
            ]"
            @mouseover="focusedItem = loc.i"
          >
            <button class="item-button" @click="emit('select', loc)">{{ loc.endpointName }}</button>
          </li>
        </ul>

        <div class="dropdown-text" :class="theme" v-else-if="getLocations && getLocations.length === 0">
          Уфф... Ничего не найдено
        </div>

        <div class="dropdown-text" :class="theme" v-else-if="getLocations === null">
          Введите место проживания
        </div>
      </div>
    </popup-transition>
  </div> -->
  <!-- eslint-enable -->
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.select-container {
  position: relative;
  z-index: 2;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  transform: translateY(10px);
  cursor: pointer;

  border-radius: 8px;
  box-shadow: var(--popup-shadow);
  padding: 10px;
  width: 100%;
  max-height: 150px;
  overflow-y: scroll;
  background-color: var(--bg-color-1);

  &::-webkit-scrollbar {
    width: 0;
  }
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.item {
  height: 32px;
  border-radius: 5px;
  padding: 0 4px;
  @include flex(flex-start, center);
  transition: var(--fast);
  color: var(--heading-color-2);

  &.focused,
  &.selected {
    background-color: var(--bg-color-2);
  }

  &.selected {
    color: var(--accent);
  }
}

.item-button {
  width: 100%;
  justify-content: flex-start;
  color: inherit;
  outline: none;
  border: none;
}

.dropdown-text {
  font-family: var(--findcreek);
  font-size: 15px;
  letter-spacing: -0.01em;
  color: var(--heading-color-1);
}

.loader {
  @include flex(center, center);
}
</style>
