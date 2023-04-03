<script lang="ts" setup>
import { defineProps } from 'vue'
import { FileInfo } from '@/types'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

defineProps<{
  images: FileInfo[]
}>()
</script>

<template>
  <div class="post-slider-container">
    <carousel>
      <slide v-for="img in images" :key="img.fileID">
        <img
          :src="img.additionalData.urlToFile" :alt="img.fileName"
          class="image"
        />
      </slide>

      <template #addons>
        <navigation />
      </template>
    </carousel>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.image {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.post-slider-container {
  height: 380px;
}
</style>

<style lang="scss">
.carousel {
  max-height: 100%;
}

// .carousel__slide {
//   padding: 10px;
// }

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

.post-slider-container .carousel__prev,
.post-slider-container .carousel__next {
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
  //box-shadow: 0 0 14px 0 black;
  box-shadow: none;
  transition: var(--fast);

  &:hover,
  &:focus {
    box-shadow: 0 0 4px 0 currentColor;
  }
}

.post-slider-container .carousel__prev::after,
.post-slider-container .carousel__next::after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--light, var(--vc-nav-background));
  padding: 5px;
  border-radius: 100vmax;
  border: var(--border-2);
  z-index: 0;
}
</style>
