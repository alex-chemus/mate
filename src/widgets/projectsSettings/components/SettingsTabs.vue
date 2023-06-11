<script lang="ts" setup>
import { defineEmits, defineProps, ref } from 'vue'
import { SettingsTab } from '../types'
import SettingsTabButton from './SettingsTabButton.vue'

defineProps<{
  currentTab: SettingsTab
}>()

const emit = defineEmits<{
  (e: 'select', payload: SettingsTab): void
}>()

const tabs = ref<SettingsTab[]>(['settings', 'members'])
</script>

<template>
  <ul class="tabs-list">
    <li v-for="(tab, i) in tabs" :key="i" class="tabs-item">
      <settings-tab-button
        :tab="tab"
        :selected="currentTab === tab"
        @click="emit('select', tab)"
      />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.tabs-list {
  margin: 0;
  padding: 0;
  list-style: none;
  @include flex(flex-start, stretch, column);
  gap: 7px;
}
</style>
