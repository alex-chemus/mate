<script lang="ts" setup>
import {
  defineProps, defineEmits, onMounted, onBeforeUnmount, computed, ref, watch
} from 'vue'
import { Input, Loader } from '@/ui'
import { useTheme, Location } from '@/utils'
import { PopupTransition } from '@/hocs'

const props = defineProps<{
  locations: Location[] | null,
  loading?: boolean,
  visible?: boolean,
  selected?: Location
}>()

const emit = defineEmits<{
  (e: 'update:visible', payload: boolean): void
  (e: 'select', payload: Location): void,
  (e: 'input', payload: string): void
}>()

const { theme } = useTheme()

const focusedItem = ref<number | null>(null)

const closeTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const onDropdownClick = () => {
  if (closeTimeout.value) clearTimeout(closeTimeout.value)
}
const onFocusChange = (p: boolean) => {
  closeTimeout.value = setTimeout(() => {
    emit('update:visible', p)
    if (!p) focusedItem.value = null
  }, 100)
}

const handleDropdownClicks = (e: MouseEvent) => {
  if (!props.visible) return
  const target = e.target as HTMLElement
  const dropdown = document.querySelector('.select-container .dropdown')
  if (!dropdown?.contains(target)) {
    emit('update:visible', false)
    focusedItem.value = null
  }
}

const onKeyDown = (e: KeyboardEvent) => {
  if (props.visible && e.key === 'ArrowUp') {
    e.preventDefault()
  }
  if (props.visible && e.key === 'ArrowDown') e.preventDefault()
}

const onKeyUp = (e: KeyboardEvent) => {
  if (!props.visible) return

  if (focusedItem.value === null) {
    focusedItem.value = 0
    return
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (focusedItem.value === 0 && props.locations) return
    focusedItem.value!--
    const dropdown = document.querySelector('.select-container .dropdown') as HTMLElement
    if (dropdown.scrollTop > focusedItem.value * 32) {
      let i = 0
      const timer = setInterval(() => {
        if (i === 32) clearInterval(timer)
        dropdown.scrollTop--
        i++
      }, 2)
    }
    return
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (!props.locations) return
    if (focusedItem.value === props.locations.length - 1) return
    focusedItem.value!++
    const dropdown = document.querySelector('.select-container .dropdown') as HTMLElement
    if (dropdown.scrollTop + dropdown.clientHeight < (focusedItem.value + 1) * 32) {
      let i = 0
      const timer = setInterval(() => {
        if (i === 32) clearInterval(timer)
        dropdown.scrollTop++
        i++
      }, 2)
    }
  }

  if (e.key === 'Enter') {
    if (focusedItem.value && props.locations)
      emit('select', props.locations[focusedItem.value])
  }
}

onMounted(() => {
  document.addEventListener('click', handleDropdownClicks)
  document.addEventListener('keyup', onKeyUp)
  document.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDropdownClicks)
  document.removeEventListener('keyup', onKeyUp)
  document.removeEventListener('keydown', onKeyDown)
})

const inputValue = ref<string | undefined>()
watch(inputValue, () => {
  if (typeof inputValue.value === 'string') emit('input', inputValue.value)
})

const getLocations = computed(() => {
  if (!props.locations) return null
  return props.locations.map((l, i) => ({ ...l, i }))
})

const isSelected = (loc: Location) => {
  const hasSelected = !!props.selected
  const cityID = loc.cityID === props.selected?.cityID
  const regionID = loc.regionID === props.selected?.regionID
  const countryID = loc.countryID === props.selected?.countryID
  return hasSelected && cityID && regionID && countryID
}
</script>

<template>
  <!-- eslint-disable -->
  <div class="select-container">
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
  </div>
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
