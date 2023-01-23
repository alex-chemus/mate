<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { Modal } from 'ant-design-vue'
import { ModalLayout } from '@/ui'
import { useTheme } from '@/utils'

defineProps<{
  visible: boolean
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
  >
    <modal-layout @close="emit('toggle', false)">
      <section class="modal-container">
        <aside>
          <slot name="user-card" />
          <h6 :class="theme">Меню</h6>
          <slot name="tabs" />
        </aside>

        <section class="main-section">
          <slot name="title" />
          <slot name="main-content" />
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
  //padding-top: 20px;
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
  gap: 20px;
  padding-top: 10px;
}

.save-button-wrapper {
  margin-top: auto;
}
</style>
