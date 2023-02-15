<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'
import { Modal } from 'ant-design-vue'
import { ModalLayout } from '@/hocs'
import { useTheme } from '@/utils'
import { SaveButton } from '@/ui'
import { Member } from '../types'

const props = defineProps<{
  visible: boolean,
  member: Member
}>()

const emit = defineEmits<{
  (e: 'toggle', payload: boolean): void,
  (e: 'change-role'): void
}>()

const { theme } = useTheme()

const getContainer = () => {
  return document.querySelector('.settings-modal') as HTMLElement
}

const getRole = computed(() => {
  switch (props.member.role) {
    case 'administrator': return 'Администратор'
    case 'editor': return 'Редактор'
    default: return 'Владелец'
  }
})

const getText = computed(() => {
  switch (props.member.role) {
    case 'administrator': return 'Пользователь может управлять проектом как владелец, но не может его удалить.'
    case 'editor': return 'Пользователь может управлять новостями проекта.'
    default: return 'Пользователь может управлять проектом и удалить его.'
  }
})
</script>

<template>
  <modal
    :visible="visible" @update:visible="p => emit('toggle', p)"
    centered width="470px"
    wrap-class-name="role-modal"
    :get-container="getContainer"
  >
    <modal-layout @close="emit('toggle', false)">
      <div class="modal-section">
        <h5 class="main-title" :class="theme">Редактировать должность</h5>

        <div class="name-container">
          <img v-if="member.avatar" class="avatar" :src="member.avatar" alt="" />
          <div v-else class="avatar" />
          <div class="name-wrapper">
            <h6 class="name-title" :class="theme">{{ member.fullName }}</h6>
            <p class="role" :class="theme">{{ getRole }}</p>
          </div>
        </div>

        <div class="warning-container" :class="theme">
          <svg width="30" height="30" viewBox="0 0 30 30">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-alert-circle" />
          </svg>
          <p class="warning-text" :class="theme">
            Пользователь занимает должность <strong>{{ getRole }}</strong> в Вашем проекте. {{ getText }}
          </p>
        </div>

        <slot />

        <div class="save-button-wrapper">
          <save-button @click="emit('change-role')" />
        </div>
      </div>
    </modal-layout>
  </modal>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.modal-section {
  @include flex(flex-start, stretch, column);
  gap: 20px;
  padding: 5px 10px;
}

.main-title {
  font-family: var(--findcreek-bold);
  font-size: 14px;
  letter-spacing: -0.02em;
  color: var(--heading-color-1);
}

.name-container {
  @include flex(flex-start, center);
  gap: 14px;
}

.avatar {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 100vmax;
  background-color: var(--gray-1);
  object-fit: cover;
}

.name-title {
  font-family: var(--findcreek-medium);
  font-size: 14px;
  letter-spacing: -0.02em;
  margin-bottom: 2px;
  color: var(--heading-color-1);
}

.role {
  font-family: var(--findcreek);
  font-size: 12px;
  letter-spacing: -0.02em;
  color: var(--text-color-1);
}

.warning-container {
  padding: 8px 11px;
  border: 1px solid color.change($gray-1, $alpha: .4);
  border-radius: 8px;
  @include flex(flex-start, flex-start);
  gap: 10px;

  svg {
    flex-shrink: 0;
    color: var(--accent);
  }

  &.light {
    background-color: #F7F9FA;
  }

  &.dark {
    background-color: #262837;
  }
}

.warning-text {
  font-family: var(--findcreek);
  font-size: 12px;
  letter-spacing: -0.02em;
  line-height: 1.3em;
  color: var(--heading-color-2);

  strong {
    font-family: var(--findcreek-bold);
  }
}

.save-button-wrapper {
  margin-top: 15px;
  z-index: 0;
}
</style>
