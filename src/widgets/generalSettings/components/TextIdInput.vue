<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import { Input } from '@/ui'

defineProps<{
  value: string
}>()

const emit = defineEmits<{
  (e: 'update:value', payload: string): void
}>()
</script>

<template>
  <Input
    label-text="Имя страницы"
    placeholder="Имя страницы"
    :value="value"
    @update:value="p => emit('update:value', p)"
  >
    <template #before>
      <svg class="at" width="16" height="16" viewBox="0 0 16 16">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-at" />
      </svg>
    </template>
  </Input>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.at {
  color: var(--text-color-1);
}
</style>
