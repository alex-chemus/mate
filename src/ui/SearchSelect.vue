<script lang="ts" setup>
import {
  defineProps, defineEmits, onMounted, computed, ref, watch
} from 'vue'
import { Input } from '@/ui'

type Group = {
  groupName: string,
  items: string[]
}

const props = defineProps<{
  // ungrouped | grouped
  data: string[] | Group[] | null,
  placement?: 'topLeft' | 'top' | 'topRight' | 'right' | 'bottomRight' |
  'bottom' | 'bottomLeft' | 'left'
  visible?: boolean,
  container?: HTMLElement,
  placeholder?: string,
  labelText?: string
}>()

const emit = defineEmits<{
  (e: 'update:visible', payload: boolean): void
}>()

const isGrouped = computed(() => {
  if (!props.data || props.data.length === 0) return null
  if (typeof props.data[0] === 'string') return 'ungrouped'
  return 'grouped'
})

const closeTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const onDropdownClick = () => {
  if (closeTimeout.value) clearTimeout(closeTimeout.value)
}
const onFocusChange = (p: boolean) => {
  closeTimeout.value = setTimeout(() => {
    emit('update:visible', p)
  }, 100)
}

onMounted(() => {
  document.addEventListener('click', (e: MouseEvent) => {
    if (!props.visible) return
    const target = e.target as HTMLElement
    const dropdown = document.querySelector('.select-container .dropdown')
    if (!dropdown?.contains(target)) {
      emit('update:visible', false)
    }
  })
})

const inputValue = ref<string | undefined>()

const getSearchUngroupedItems = computed(() => {
  if (isGrouped.value === 'ungrouped') {
    const arr = (props.data as string[]).map((item, i) => {
      return { name: item, i }
    })

    if (!inputValue.value) return arr
    return arr.filter((i) => i.name.trim().toLocaleLowerCase().includes(inputValue.value!.trim().toLocaleLowerCase()))
  }

  return null
})

const getSearchedGroupedItems = computed(() => {
  if (isGrouped.value === 'grouped') {
    const arr = (props.data as Group[]).map((item) => {
      return {
        groupName: (item as Group).groupName,
        items: (item as Group).items.map((i, j) => ({ name: i, i: j })),
      }
    })

    if (!inputValue.value) return arr
    return arr.map((group) => ({
      groupName: group.groupName,
      items: group.items.filter((i) => {
        return i.name.trim().toLocaleLowerCase().includes(inputValue.value!.trim().toLocaleLowerCase())
      })
    }))
  }

  return null
})
</script>

<template>
  <div class="select-container">
    <Input
      v-model:value="inputValue"
      @update:focused="onFocusChange"
      :placeholder="placeholder" :label-text="labelText"
    />
    <!-- eslint-disable-next-line -->
    <div v-if="visible" class="dropdown" @click="onDropdownClick">
      <ul v-if="data && isGrouped === 'ungrouped'">
        <li class="item" v-for="item in getSearchUngroupedItems" :key="item.i">
          <button class="item-button">{{ item.name }}</button>
        </li>
      </ul>
    </div>
  </div>
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
  width: 200px;
  height: 50px;
  cursor: pointer;
  background-color: white;
  border: 1px solid red;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.item {
}

.item-button {
  width: 100%;
  justify-content: flex-start;
}
</style>
