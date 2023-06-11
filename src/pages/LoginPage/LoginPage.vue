<script lang="ts" setup>
import { ref } from 'vue'
import { useDispatch } from '@/utils'
import { authActions } from '@/store/constants'

const login = ref('')
const password = ref('')

const dispatch = useDispatch()

const signup = async () => {
  dispatch(authActions.FETCH_TOKEN, {
    login: login.value,
    password: password.value
  })
}
</script>

<template>
  <div>
    <!-- eslint-disable -->
    <input type="text" v-model="login">
    <input type="password" v-model="password">
    <button @click="signup">login</button>
    <!-- eslint-enable -->
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
