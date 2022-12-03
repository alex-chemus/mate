<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { IState } from '@/store/types'

const { state } = useStore<IState>()

const commentText = ref('')
const img = ref<string | null>()
</script>

<template>
  <div class="comment-container">
    <img v-if="img" :src="img" alt="" class="icon" />
    <div v-else class="icon placeholder" />

    <div class="comment-wrapper" :class="state.theme">
      <!-- eslint-disable-next-line -->
      <input
        type="text" v-model="commentText" placeholder="Прокомментируйте запись..."
        class="comment-input" :class="state.theme"
      />

      <button class="image-button">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <use href="@/assets/tabler-sprite.svg#tabler-photo" />
        </svg>
      </button>
    </div>

    <button class="send-button" :class="state.theme">
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.51099 20.895L20.3443 11.6385C21.2186 11.2054 21.2186 9.79463 20.3443 9.3615L1.51099 0.105039C0.798664 -0.253835 0.0107927 0.352538 0.0107927 1.23116L0 6.93601C0 7.55476 0.399332 8.08688 0.938969 8.16113L16.1891 10.5L0.938969 12.8265C0.399332 12.9131 0 13.4452 0 14.064L0.0107927 19.7688C0.0107927 20.6475 0.798664 21.2538 1.51099 20.895Z" fill="currentColor"/>
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/styles/style.scss';

.comment-container {
  @include flex(flex-start, center);
}

.icon {
  width: 30px;
  height: 30px;
  border: 1px solid #727272;
  object-fit: cover;
  border-radius: 100vmax;
  margin-right: 11px;

  &.placeholder {
    background-color: color.change($gray-1, $alpha: .25);
  }
}

.comment-wrapper {
  margin-right: 20px;
  height: 40px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid color.change($gray-1, $alpha: .5);
  @include flex(flex-start, center);
  flex-grow: 1;

  &.light {
    background-color: transparent;
    color: #5c5c5c;
  }

  &.dark {
    background-color: var(--dark-theme-color-5);
    color: #bbb;
  }
}

.comment-input {
  min-width: 0;
  flex-grow: 1;
  outline: none;
  border: none;
  margin-right: 10px;
  color: inherit;
  font-family: var(--ff-ubuntu);
  font-size: 14px;
}

.image-button {
  color: inherit;
}

.send-button {
  &.light {
    color: #5c5c5c;
  }

  &.dark {
    color: #bbb;
  }
}
</style>
