<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import Flicking from '@egjs/vue3-flicking'
import { FullProject } from '@/shared/types'
import SliderButton from './SliderButton.vue'
import '@/assets/styles/carousel.css'

import '@egjs/vue3-flicking/dist/flicking.css'
import '@egjs/vue3-flicking/dist/flicking-inline.css'

defineProps<{
  projects: FullProject[]
  currentTabId: number
}>()

const emit = defineEmits<{
  (e: 'select', id: number): void
}>()
</script>

<template>
  <section class="projects-slider">
    <flicking :options="{ align: 'prev', bound: true }">
      <slider-button
        v-for="project in projects" :key="project.id"
        :selected="project.id === currentTabId"
        @click="emit('select', project.id)"
      >
        {{ project.name }}
      </slider-button>
    </flicking>
  </section>
</template>

<style lang="scss">
.projects-slider .flicking-camera {
  gap: 13px;
}
</style>
