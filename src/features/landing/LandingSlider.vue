<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { IState } from '@/store/types'
import SliderCard from './SliderCard.vue'

const { state } = useStore<IState>()

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
  <section class="slider">
    <transition :name="transitionType" mode="out-in">
      <!--<slider-card v-for="i in 3" :key="i" />-->
      <slider-card v-if="currSlide === 0" />
      <slider-card v-else-if="currSlide === 1" />
      <slider-card v-else-if="currSlide === 2" />
    </transition>
  </section>

  <section class="offer-container">
    <h2 class="title">Что мы можем?</h2>
    <p>Наш сервис может помочь Вам найти правильный путь продвижения Вашего проекта, найти людей, узнать много нового из мира технологий, свежие новости крупных компаний и многое другое</p>
  </section>

  <section class="buttons-container">
    <button class="prev-button nav-button" :class="state.theme" @click="prevSlide">
      <svg width="25" height="25" viewBox="0 0 25 25">
        <use href="@/assets/tabler-sprite.svg#tabler-chevron-left" />
      </svg>
    </button>

    <div class="dot-buttons-wrapper">
      <button
        v-for="i in 3" :key="i"
        class="dot-button" :class="[state.theme, i-1 === currSlide ? 'current' : '']"
        @click="toSlide(i-1)"
      />
    </div>

    <button class="next-button nav-button" :class="state.theme" @click="nextSlide">
      <svg width="25" height="25" viewBox="0 0 25 25">
        <use href="@/assets/tabler-sprite.svg#tabler-chevron-right" />
      </svg>
    </button>
  </section>
</template>


<style lang="scss" scoped>
@use 'sass:color';
@import '@/styles/style.scss';

.slider {
  //width: min-content;
  width: 500px;
  overflow-x: hidden;
  padding: 3px;
  //width: 100%;
  //@include flex(flex-start, center);
  //border: 1px solid blue;
  position: relative;
  margin-bottom: 34px;
}

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

.offer-container {
  margin-bottom: 30px;

  h2 {
    margin-bottom: 20px;
    text-align: center;
    color: var(--text-color);
    font-family: var(--ff-ubuntu);
    font-size: 24px;
    font-weight: var(--fw-bold);
  }

  p {
    text-align: center;
    font-size: 16px;
    font-family: var(--ff-ubuntu);
    color: var(--text-color);
  }
}

.buttons-container {
  @include flex(center, center);

  & > *:not(:last-child) {
    margin-right: 30px;
  }

  .nav-button {
    &.light {
      color: rgba(0 0 0 / .3);
    }

    &.dark {
      color: var(--light);
    }
  }
}

.dot-buttons-wrapper {
  @include flex(center, center);

  & > *:not(:last-child) {
    margin-right: 13px;
  }
}

.dot-button {
  height: 10px;
  aspect-ratio: 1;
  background-color: var(--accent-2);
  border-radius: 10vmax;

  &.current {
    &.dark {
      background-color: var(--light);
    }

    &.light {
      box-shadow: inset 0 0 5px 0 rgba(0 0 0 / .10);
      border: 1px solid color.change($gray-1, $alpha: .4);
    }
  }
}
</style>
