<script lang="ts" setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { useApiState, useAuthState, useDispatch } from '@/utils'
import { fetchActions, userActions } from '@/store/constants'
import { RootState } from '@/store/types'

const dispatch = useDispatch()
const apiState = useApiState()
const authState = useAuthState()
const store = useStore<RootState>()

onMounted(async () => {
  const body = new FormData()
  body.append('token', authState.value.token as string)
  body.append('fields', 'findcreekID')

  const res = await dispatch(fetchActions.FETCH, {
    url: `${apiState.value.apiUrl}/mate/account.getInfo/`,
    info: { body, method: 'POST' }
  })

  store.commit(userActions.SET_ID, res.findcreekID as number)
})
</script>

<template>
  <slot />
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
