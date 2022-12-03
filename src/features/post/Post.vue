<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { IState } from '@/store/types'

import PostAuthor from './PostAuthor.vue'
import PostButtons from './PostButtons.vue'
import PostComment from './PostComment.vue'

const { state } = useStore<IState>()

interface IAuthor {
  img?: string,
  fullname: string,
  nickname: string
}

const date = ref('Сегодня в 12:22')
const img = ref<string | null>(null)
const text = ref('Я обожаю это признавать, поэтому напишу это здесь! Долгие месяцы мы трудились над одной целью, которая могла помочь всем без ислючения, и мы это сделали! В связи с тем, что продукт FINDCREEK Mate вышел в свет, нам предложили переехать заграницу. Это моя мечта детства, поэтому с огромной радостью вам сообщаю, что компания FINDCREEK переезжает в главный офис в Объединённых Арабских Эмиратах. Желаю всем своим подписчикам огромного счастья и денег!Ну а я пошёл собирать свои вещи. Много вещей...')
const author = ref<IAuthor>({
  fullname: 'Александр Соромотин',
  nickname: 'alexandersoromotin'
})
const postLikes = ref('5,6 тыч.')
const postDislikes = ref('1,2 тыч.')
const comments = ref('1 тыс.')
const reaction = ref<0 | 1 | -1>(1)
</script>

<template>
  <article class="post-section" :class="state.theme">
    <div class="date-wrapper">{{ date }}</div>

    <img v-if="img" :src="img" alt="" class="image" />
    <div v-else class="image placeholder" />

    <div class="post-container">
      <p class="text" :class="state.theme">{{ text }}</p>

      <div class="author-container">
        <post-author :author="author" />
      </div>

      <div class="buttons-wrapper">
        <post-buttons
          :likes="postLikes"
          :dislikes="postDislikes"
          :comments="comments"
          :reaction="reaction"
          @like="reaction = 1"
        />
      </div>

      <div class="comment-container">
        <post-comment />
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/styles/style.scss';

.post-section {
  border-radius: 13px;
  position: relative;
  overflow: hidden;

  &.light {
    background-color: var(--light);
  }

  &.dark {
    background-color: var(--dark-theme-color-2);
  }
}

.date-wrapper {
  height: 20px;
  width: fit-content;
  padding: 0 12px;
  @include flex(center, center);
  border-radius: 10px;
  background-color: rgba(224 224 224 / .2);
  color: rgba(190 190 190 / .7);
  font-family: var(--ff-ubuntu);
  font-weight: var(--fw-medium);
  font-size: 10px;
  letter-spacing: -3%;
  position: absolute;
  top: 14px;
  right: 14px;
}

.image {
  object-fit: cover;
  max-height: 300px;
  width: 100%;

  &.placeholder {
    height: 282px;
    background-color: color.change($gray-1, $alpha: .25);
  }
}

.post-container {
  padding: 14px;
}

.text {
  font-family: var(--ff-ubuntu);
  font-size: 13px;
  line-height: 140%;
  letter-spacing: -3.3%;
  margin-bottom: 12px;

  &.light {
    color: var(--dark-2);
  }

  &.dark {
    color: var(--light);
  }
}

.author-container {
  margin-bottom: 16px;
}

.buttons-wrapper {
  margin-bottom: 18px;
}
</style>
