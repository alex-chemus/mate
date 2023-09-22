<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { Input } from '@/shared/ui'

defineProps<{
  getTitle: string | null,
  setTitle: (s: string) => void
}>()

const focused = ref(false)
</script>

<template>
  <Input
    label-text="Заголовок"
    placeholder="Заголовок"
    :value="getTitle ?? ''"
    @update:value="setTitle"
    v-model:focused="focused"
  />
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
