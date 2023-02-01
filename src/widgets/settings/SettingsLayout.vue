<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { Modal } from 'ant-design-vue'
import { ModalLayout } from '@/hocs'
import { useTheme } from '@/utils'
import { Tab } from './types'

defineProps<{
  visible: boolean,
  currentTab?: Tab
}>()

const emit = defineEmits<{
  (e: 'toggle', payload: boolean): void
}>()

const { theme } = useTheme()
</script>

<template>
  <modal
    :visible="visible" @update:visible="payload => emit('toggle', payload)"
    centered width="1000px"
    wrap-class-name="settings-modal"
  >
    <modal-layout @close="emit('toggle', false)">
      <section class="modal-container">
        <aside>
          <slot name="user-card" />
          <h6 :class="theme">Меню</h6>
          <slot name="tabs" />
        </aside>

        <section class="main-section">
          <h2 class="title" :class="theme">
            <slot name="title" />
          </h2>
          <!-- <slot name="main-content" /> -->

          <div v-show="currentTab === 'general'">
            <slot name="general-settings" />
          </div>

          <div v-show="currentTab === 'profile'">
            <slot name="profile-settings" />
          </div>

          <div v-show="currentTab === 'projects'">
            <slot name="projects-settings" />
          </div>

          <div class="save-button-wrapper">
            <slot name="save-button" />
          </div>
        </section>
      </section>
    </modal-layout>
  </modal>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.modal-container {
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-gap: 55px;
  padding-right: 20px;
  min-height: 700px;
}

aside {
  @include flex(flex-start, stretch, column);
  gap: 20px;
}

aside h6 {
  //margin-left: 20px;
  font-family: var(--findcreek-medium);
  font-weight: var(--medium);
  font-size: 14px;
  margin: 0;

  &.light {
    color: #5c5c5c;
  }

  &.dark {
    color: var(--gray-2);
  }
}

.main-section {
  @include flex(flex-start, stretch, column);
  gap: 30px;
  padding-top: 10px;
}

.save-button-wrapper {
  margin-top: auto;
}

.title {
  font-family: var(--findcreek-medium);
  font-size: 18px;

  &.light {
    color: var(--dark-1);
  }

  &.dark {
    color: var(--light);
  }
}
</style>
