<script lang="ts" setup>
import { watch, onMounted } from 'vue'
import { themeActions } from '@/store/constants'
import { useTheme, useDispatch } from '@/utils'

const theme = useTheme()
const dispatch = useDispatch()

const changeTheme = () => {
  const app = document.getElementById('app') as HTMLElement

  //console.log('set theme to app')
  if (theme.value === 'light')
    app.className = 'light'
  else
    app.className = 'dark'
}

watch(theme, changeTheme)

onMounted(() => {
  dispatch(themeActions.GET_DEFAULT_THEME)
  changeTheme()
})
</script>


<template>
  <slot />
</template>
