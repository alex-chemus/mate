<script lang="ts" setup>
import { defineProps } from 'vue'
import { useTheme } from '@/utils'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import type { Partner } from '../types'
import './carousel.css'

const theme = useTheme()

defineProps<{
  partners: Partner[]
}>()
</script>

<template>
  <section class="partners-section" :class="theme">
    <h5 class="title" :class="theme">Наши партнёры</h5>
    <carousel
      :items-to-show="6"
      :mouse-drag="true"
      :touch-drag="true"
    >
      <slide v-for="item in partners" :key="item.id">
        <img v-if="item.img" :src="item.img" alt="" class="icon" :class="theme" />
        <div v-else class="icon placeholder" :class="theme" />
      </slide>

      <template #addons>
        <navigation />
      </template>
    </carousel>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.partners-section {
  max-width: 100%;

  &.dark {
    --local-elem-color: var(--gray-3);
    --local-bg-color: #424242;
    --local-border: 1px solid color.change($light, $alpha: .6);
    --local-gradient: linear-gradient(90deg, transparent 0%, rgba(44 46 57 / .6) 66.15%);
  }

  &.light {
    --local-elem-color: var(--gray-1);
    --local-bg-color: var(--light);
    --local-border: 1px solid color.change($gray-1, $alpha: .5);
    --local-gradient: linear-gradient(90deg, transparent 0%, rgba(246, 246, 246, 0.4) 66.15%);
  }
}

.title {
  font-family: var(--ff-ubuntu);
  font-size: 16px;
  font-weight: var(--fw-bold);
  margin-bottom: 15px;

  &.light {
    color: var(--gray-1);
  }

  &.dark {
    color: #8b8b8b;
  }
}

.icon {
  width: 70px;
  height: 70px;
  object-fit: cover;
  background-color: var(--gray-1);
  border-radius: 100vmax;
  position: relative;
  /*box-shadow: inset 1px 1px 0 2px color.change($gray-1, $alpha: .4);*/

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: -5px;
    left: -5px;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    border: 1px solid color.change($gray-1, $alpha: .4);
    border-radius: 100vmax;
  }

  &.light {
    border: 5px solid color.change($light, $alpha: .7);
  }

  &.dark {
    border: 5px solid color.change($gray-3, $alpha: .2);
  }
}
</style>
