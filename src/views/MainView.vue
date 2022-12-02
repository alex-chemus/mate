<script lang="ts" setup>
import { onMounted } from 'vue'
import { useFetch } from '@/shared'

// тестовый запрос
/*onMounted(async () => {
  const data = await useFetch({
    path: 'mate/account.getInfo'
  })

  console.log(data)
})*/
</script>

<template>
  <div>Main View</div>
</template>

<style lang="scss" scoped>
@import '@/styles/style.scss';
</style>
