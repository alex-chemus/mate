<script lang="ts" setup>
import {
  defineProps, defineEmits, ref, watch
} from 'vue'
import { ModalLayout, Modal } from '@/shared/hocs'
import { useTheme } from '@/shared/utils'
import { Tab } from '../types'

const props = defineProps<{
  visible: boolean,
  currentTab?: Tab,
  hasProjects: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle', payload: boolean): void
}>()

const { theme } = useTheme()
const width = ref(1000)
watch(() => props.currentTab, () => {
  switch (props.currentTab) {
    case 'projects':
    case 'profile':
      width.value = 1200
      break

    default:
      width.value = 1000
      break
  }
})
</script>

<template>
  <modal
    :visible="visible" @update:visible="payload => emit('toggle', payload)"
    :width="width" :fixed-height="true"
  >
    <modal-layout @close="emit('toggle', false)">
      <section class="modal-container">
        <aside>
          <slot name="user-card" />
          <slot name="tabs" />
        </aside>

        <section class="main-section">
          <h2 class="title" :class="theme">
            <slot name="title" />
          </h2>
          <!-- <slot name="main-content" /> -->

          <div v-show="currentTab === 'general'" class="widget-wrapper">
            <slot name="general-settings" />
          </div>

          <div v-show="currentTab === 'profile'" class="widget-wrapper">
            <slot name="profile-settings" />
          </div>

          <template v-if="hasProjects">
            <div v-show="currentTab === 'projects'" class="widget-wrapper">
              <slot name="projects-settings" />
            </div>
          </template>

          <div v-show="currentTab === 'privacy'" class="widget-wrapper">
            <slot name="privacy-settings" />
          </div>

          <!-- <div class="save-button-wrapper">
            <slot name="save-button" />
          </div> -->
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
  grid-template-rows: 100%;
  grid-gap: 55px;
  padding-right: 50px;
  min-height: 700px;
  max-height: 100%;
  height: 100%;
  overflow: hidden;
}

aside {
  @include flex(flex-start, stretch, column);
  gap: 20px;
}

aside h6 {
  @include findcreek-medium(14px, var(--text-color-1));
  margin: 0;
}

.main-section {
  @include flex(flex-start, stretch, column);
  gap: 30px;
  /* padding-top: 10px; */
  max-height: 100%;
  overflow: scroll;
  @include scrollbar;
  /* padding-right: 15px; */
  /* padding: 10px; */
  padding: 15px 15px 15px 12px;
}

.save-button-wrapper {
  margin-top: auto;
}

.title {
  @include findcreek-medium(18px, var(--heading-color-1));
}

.widget-wrapper {
  flex-grow: 2;
  display: grid;
  grid-area: 1fr / 1fr;
}
</style>
