<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { IconPencil } from '@tabler/icons-vue'
import { useWindowWidth, useFetchApi } from '@/shared/utils'
import useAppStore from '@/store/useAppStore'
import useSettings from '@/features/Settings/useSettings'

const props = defineProps<{
  userId: number,
  isSubscribed: boolean
}>()

const emit = defineEmits<{
  (e: 'refresh'): void
}>()

const fetchApi = useFetchApi()

const { userState } = useAppStore()

const { openSettings } = useSettings()

const { windowWidth, breakpoints } = useWindowWidth()

const unsubscribe = async () => {
  await fetchApi('users.unsubscribe', { userID: `${props.userId}` })
  emit('refresh')
}

const subscribe = async () => {
  await fetchApi('users.subscribe', { userID: `${props.userId}` })
  emit('refresh')
}
</script>

<template>
  <button
    v-if="userId === userState?.findcreekID"
    @click="openSettings('profile')"
    class="button"
  >
    <icon-pencil v-if="windowWidth < breakpoints.sm" />
    <span v-else>Редактировать профиль</span>
  </button>

  <button
    v-else-if="isSubscribed"
    :class="['button', 'unsubscribe']"
    @click="unsubscribe"
  >Отписаться</button>

  <button
    v-else 
    :class="['button', 'subscribe']"
    @click="subscribe"
  >Подписаться</button>
</template>

<style scoped lang="scss" src="./UserActionsButton.scss" />