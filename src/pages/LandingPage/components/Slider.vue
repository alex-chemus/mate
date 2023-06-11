<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import { useTheme } from '@/utils'

defineProps<{
  currentSlide: number
}>()

const emit = defineEmits<{
  (e: 'next-slide'): void,
  (e: 'prev-slide'): void,
  (e: 'to-slide', payload: number): void
}>()

const { theme } = useTheme()
</script>


<template>
  <section class="slider">
    <slot />
  </section>

  <section class="offer-container">
    <h2 class="title">Что мы можем?</h2>
    <p>Наш сервис может помочь Вам найти правильный путь продвижения Вашего проекта, найти людей, узнать много нового из мира технологий, свежие новости крупных компаний и многое другое</p>
  </section>

  <section class="buttons-container">
    <button class="prev-button nav-button" :class="theme" @click="emit('prev-slide')">
      <svg width="25" height="25" viewBox="0 0 25 25">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-chevron-left" />
      </svg>
    </button>

    <div class="dot-buttons-wrapper">
      <button
        v-for="i in 3" :key="i"
        class="dot-button" :class="[theme, i-1 === currentSlide ? 'current' : '']"
        @click="emit('to-slide', i-1)"
      />
    </div>

    <button class="next-button nav-button" :class="theme" @click="emit('next-slide')">
      <svg width="25" height="25" viewBox="0 0 25 25">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-chevron-right" />
      </svg>
    </button>
  </section>
</template>


<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

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

.offer-container {
  margin-bottom: 30px;

  h2 {
    margin-bottom: 20px;
    text-align: center;
    @include findcreek-bold(24px, var(--heading-color-2));
  }

  p {
    text-align: center;
    @include findcreek(16px, var(--heading-color-2));
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
