<script lang="ts" setup>
import { ref } from 'vue'
import LandingSlider from './Slider.vue'
import SliderCard from './SliderCard.vue'

const currSlide = ref(0);
const maxSlides = ref(2);
const transitionType = ref<'tonext' | 'toprev'>('tonext')
const reset = ref(setInterval(() => {
  if (currSlide.value === maxSlides.value) {
    transitionType.value = 'toprev'
    currSlide.value = 0
  } else {
    transitionType.value = 'tonext'
    currSlide.value++
  }
}, 10000))

const nextSlide = () => {
  clearInterval(reset.value)
  if (currSlide.value < maxSlides.value) currSlide.value++
  transitionType.value = 'tonext'
}

const prevSlide = () => {
  clearInterval(reset.value)
  if (currSlide.value > 0) currSlide.value--
  transitionType.value = 'toprev'
}

const toSlide = (n: number) => {
  if (currSlide.value === n) return
  clearInterval(reset.value)

  if (currSlide.value > n)
    transitionType.value = 'toprev'
  else
    transitionType.value = 'tonext'

  currSlide.value = n
}
</script>

<template>
  <landing-slider
    :current-slide="currSlide"
    @next-slide="nextSlide"
    @prev-slide="prevSlide"
    @to-slide="n => toSlide(n)"
  >
    <transition :name="transitionType" mode="out-in">
      <slider-card v-if="currSlide === 0" />
      <slider-card v-else-if="currSlide === 1" />
      <slider-card v-else-if="currSlide === 2" />
    </transition>
  </landing-slider>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.tonext-enter-from,
.toprev-leave-to {
  transform: translateX(110%);
}

.tonext-enter-active,
.tonext-leave-active,
.toprev-enter-active,
.toprev-leave-active {
  transition: transform 1.5s ease-out;
}

.tonext-enter-to,
.tonext-leave-from,
.toprev-leave-from,
.toprev-enter-to {
  transform: none;
}

.tonext-leave-to,
.toprev-enter-from {
  transform: translateX(-110%);
}
</style>
