<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import type { Tab } from '../types'
import TabButton from './TabButton.vue'

defineProps<{
  currentTab: Tab
}>()

const emit = defineEmits<{
  (e: 'change', payload: Tab): void
}>()
</script>

<template>
  <ul>
    <li>
      <tab-button
        :selected="currentTab === 'general'" color="#505298"
        @click="emit('change', 'general')"
      >
        <template #icon>
          <svg width="20" height="20" viewBox="0 0 20 20">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-id" />
          </svg>
        </template>
        <template #text>Основная информация</template>
      </tab-button>
    </li>

    <li>
      <tab-button
        :selected="currentTab === 'profile'" color="#07093D"
        @click="emit('change', 'profile')"
      >
        <template #icon>
          <svg width="20" height="20" viewBox="0 0 20 20">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-user" />
          </svg>
        </template>
        <template #text>Профиль</template>
      </tab-button>
    </li>

    <li>
      <tab-button
        :selected="currentTab === 'project'" color="#01CA7E"
        @click="emit('change', 'project')"
      >
        <template #icon>
          <svg width="20" height="20" viewBox="0 0 20 20">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-users" />
          </svg>
        </template>
        <template #text>Профиль проекта</template>
      </tab-button>
    </li>

    <li>
      <tab-button
        :selected="currentTab === 'privacy'" color="#455DF6"
        @click="emit('change', 'privacy')"
      >
        <template #icon>
          <svg width="20" height="20" viewBox="0 0 20 20">
            <use href="@/assets/imgs/tabler-sprite.svg#tabler-lock" />
          </svg>
        </template>
        <template #text>Безопасность</template>
      </tab-button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 0;
  margin: 0;
}
</style>
