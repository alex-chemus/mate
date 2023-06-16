<script lang="ts" setup>
import { useFetchState } from '@/utils'

const fetchState = useFetchState()
</script>

<template>
  <div>{{ fetchState.errorMsg }}</div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
