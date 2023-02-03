<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { Modal } from 'ant-design-vue'
import { ModalLayout } from '@/hocs'
import { Member } from '../types';

defineProps<{
  visible: boolean,
  member: Member
}>()

const emit = defineEmits<{
  (e: 'toggle', payload: boolean): void
}>()

const getContainer = () => {
  return document.querySelector('.settings-modal') as HTMLElement
}
</script>

<template>
  <modal
    :visible="visible" @update:visible="p => emit('toggle', p)"
    centered width="470px"
    wrap-class-name="role-modal"
    :get-container="getContainer"
  >
    <modal-layout @close="emit('toggle', false)">
    </modal-layout>
  </modal>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';
</style>
