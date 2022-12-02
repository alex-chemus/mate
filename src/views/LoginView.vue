<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { IState } from '@/store/types'

const { state } = useStore<IState>()

const login = ref('')
const password = ref('')

const signup = async () => {
  const formData = new FormData();
  formData.append('login', login.value)
  formData.append('password', password.value)

  try {
    const res = await fetch(`${state.apiUrl}/id/auth.getToken`, {
      method: 'POST',
      body: formData
    })
    const token: string = (await res.json()).response as string
  } catch (e) {
    console.log(`error in login: ${e}`)
  }
}
</script>

<template>
  <div>
    <!-- eslint-disable -->
    <input type="text" v-model="login">
    <input type="text" v-model="password">
    <button @click="signup">login</button>
    <!-- eslint-enable -->
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/style.scss';
</style>
