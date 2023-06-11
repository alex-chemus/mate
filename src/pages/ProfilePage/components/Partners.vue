<script lang="ts" setup>
import { defineProps } from 'vue'
import { useTheme } from '@/utils'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import type { Partner } from '../types'
//import './carousel.css'

const { theme } = useTheme()

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
  // font-family: -bold);
  // font-size: 16px;
  // font-weight: var(--bold);
  @include findcreek-bold(16px);
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

<style lang="scss">
:root {
  /* Color */
  --vc-clr-primary: #000;
  --vc-clr-secondary: #090f207f;
  --vc-clr-white: #ffffff;

  /* Icon */
  --vc-icn-width: 1.2em;

  /* Navigation */
  --vc-nav-width: 30px;
  --vc-nav-height: 30px;
  --vc-nav-border-radius: 0;
  --vc-nav-color: var(--vc-clr-primary);
  --vc-nav-color-hover: var(--vc-clr-secondary);
  --vc-nav-background: transparent;

  /* Pagination */
  --vc-pgn-width: 12px;
  --vc-pgn-height: 4px;
  --vc-pgn-margin: 4px;
  --vc-pgn-border-radius: 0;
  --vc-pgn-background-color: var(--vc-clr-secondary);
  --vc-pgn-active-color: var(--vc-clr-primary);
}

.partners-section .carousel {
  position: relative;
  text-align: center;
  box-sizing: border-box;
}

.partners-section .carousel * {
  box-sizing: border-box;
}

.partners-section .carousel__track {
  display: flex;
  margin: 0;
  padding: 0;
  position: relative;
}

.partners-section .carousel__viewport {
  overflow: hidden;
}

.partners-section .carousel__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.partners-section .carousel__icon {
  width: var(--vc-icn-width);
  height: var(--vc-icn-width);
  fill: var(--text-color-2);
}

.partners-section .carousel__slide {
  scroll-snap-stop: auto;
  flex-shrink: 0;
  margin: 0;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  /* Fix iOS scrolling #22 */
  transform: translateZ(0);
}

.partners-section .carousel__prev,
.partners-section .carousel__next {
  box-sizing: content-box;
  /*background: var(--vc-nav-background);*/
  /*border-radius: var(--vc-nav-border-radius);*/
  width: var(--vc-nav-width);
  height: var(--vc-nav-height);
  text-align: center;
  font-size: var(--vc-nav-height);
  /*padding: 0;*/
  color: var(--vc-nav-color);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  /*border: 0;*/
  cursor: pointer;
  margin: 0 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  border: 1px solid #767676;
  border-radius: 100vmax;
  box-shadow: 0 0 14px 0 black;
}

.partners-section .carousel__prev::after,
.partners-section .carousel__next::after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--local-bg-color, var(--vc-nav-background));
  padding: 5px;
  border-radius: 100vmax;
  border: var(--local-border);
  z-index: 0;
}

.partners-section .carousel__prev::before,
.partners-section .carousel__next::before {
  content: '';
  display: block;
  height: 80px;
  width: 80px;
  background-image: var(--local-gradient);
  position: absolute;
  z-index: -1;
}

.partners-section .carousel__prev::before {
  left: -10px;
  transform: rotate(180deg);
}

.partners-section .carousel__next::before {
  right: -10px;
}

.partners-section .carousel__prev:hover,
.partners-section .carousel__next:hover {
  color: var(--vc-nav-color-hover);
}

.partners-section .carousel__next--disabled,
.partners-section .carousel__prev--disabled {
  /*cursor: not-allowed;
  opacity: 0.5;*/
  display: none;
}

.partners-section .carousel__prev {
  left: 0;
}

.partners-section .carousel__next {
  right: 0;
}

.partners-section .carousel--rtl .carousel__prev {
  left: auto;
  right: 0;
}

.partners-section .carousel--rtl .carousel__prev {
  left: auto;
  right: 0;
}

.partners-section .carousel--rtl .carousel__next {
  right: auto;
  left: 0;
}

.partners-section .carousel__pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  line-height: 0;
  margin: 10px 0 0;
}

.partners-section .carousel__pagination-button {
  display: block;
  border: 0;
  margin: 0;
  cursor: pointer;
  padding: var(--vc-pgn-margin);
  background: transparent;
}

.partners-section .carousel__pagination-button::after {
  display: block;
  content: '';
  width: var(--vc-pgn-width);
  height: var(--vc-pgn-height);
  border-radius: var(--vc-pgn-border-radius);
  background-color: var(--vc-pgn-background-color);
}

.partners-section .carousel__pagination-button:hover::after,
.partners-section .carousel__pagination-button--active::after {
  background-color: var(--vc-pgn-active-color);
}
</style>
