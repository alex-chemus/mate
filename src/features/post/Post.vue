<script lang="ts" setup>
import { ref } from 'vue'
import PostLayout from './PostLayout.vue'
import PostAuthor from './components/PostAuthor.vue'
import PostButtons from './components/PostButtons.vue'
import PostComment from './components/PostComment.vue'
import PostText from './components/PostText.vue'

interface IAuthor {
  img?: string,
  fullname: string,
  nickname: string
}

const date = ref('Сегодня в 12:22')
const img = ref<string | undefined>(undefined)
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
  <post-layout :img="img" :date="date">
    <template #text>
      <post-text :text="text" />
    </template>

    <template #author>
      <post-author :author="author" />
    </template>

    <template #buttons>
      <post-buttons
        :likes="postLikes"
        :dislikes="postDislikes"
        :comments="comments"
        :reaction="reaction"
        @like="reaction = 1"
      />
    </template>

    <template #comment>
      <post-comment />
    </template>
  </post-layout>
</template>
