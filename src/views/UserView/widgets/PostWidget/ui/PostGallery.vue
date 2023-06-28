<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'
import { FileInfo } from '@/shared/types'
import PostSlider from './PostSlider.vue'

const props = defineProps<{
  images: FileInfo[]
}>()

const emit = defineEmits<{
  (e: 'image-click', payload: { file: FileInfo, i: number }): void
}>()

const getClass = computed(() => {
  switch (props.images.length) {
    case 10: return 'ten'
    case 9: return 'nine'
    case 8: return 'eight'
    case 7: return 'seven'
    case 6: return 'six'
    case 5: return 'five'
    case 4: return 'four'
    case 3: return 'three'
    case 2: return 'two'
    case 1: return 'one'
    case 0: return 'none'
    default: return 'slider'
  }
})
</script>

<template>
  <div v-if="getClass !== 'none' && getClass !== 'slider'" class="gallery" :class="getClass">
    <!-- eslint-disable-next-line -->
    <img
      v-for="(img, i) in images" :key="i"
      :src="img.additionalData.urlToFile" :alt="img.fileName"
      class="image"
      @click="emit('image-click', { file: img, i })"
    />
  </div>
  <div class="gallery slider" v-if="getClass === 'slider'">
    <post-slider :images="[...images, ...images]" />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.gallery {
  height: 380px;
  width: 100%;
  border-radius: 13px;
  overflow: hidden;

  &:not(.slider) {
    display: grid;
    grid-gap: 5px;
  }
}

.gallery.ten {
  grid-template-rows: 4fr 1fr;
  grid-template-columns: repeat(8, 1fr);

  img:first-child,
  img:nth-child(2) {
    grid-column-end: span 4;
  }
}

.gallery.nine {
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
}

.gallery.eight {
  grid-template-rows: 4fr 1fr;
  grid-template-columns: repeat(6, 1fr);

  img:first-child,
  img:nth-child(2) {
    grid-column-end: span 3;
  }
}

.gallery.seven {
  grid-template-rows: 4fr 1fr;
  grid-template-columns: repeat(10, 1fr);

  img:first-child,
  img:nth-child(2) {
    grid-column-end: span 5;
  }

  img {
    grid-column-end: span 2;
  }
}

.gallery.six {
  grid-template-rows: 2fr 1fr;
  grid-template-columns: repeat(4, 1fr);

  img:first-child,
  img:nth-child(2) {
    grid-column-end: span 2;
  }
}

.gallery.five {
  grid-template-rows: 3fr 2fr;
  grid-template-columns: repeat(6, 1fr);

  img:first-child,
  img:nth-child(2) {
    grid-column-end: span 3;
  }

  img {
    grid-column-end: span 2;
  }
}

.gallery.four {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
}

.gallery.three {
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 3fr 2fr;

  img:first-child {
    grid-row-end: span 2;
  }
}

.gallery.two {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
}

.gallery.one {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.gallery.slider {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.image {
  width: 100%;
  height: 100%;
  min-height: 0;
  min-width: 0;
  object-fit: cover;
  cursor: pointer;
}
</style>
