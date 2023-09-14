<script lang="ts" setup>
import useAppStore from '@/store/useAppStore';

const { fetchState } = useAppStore()
</script>

<template>
  <div>{{ fetchState.errorMsg }}</div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
