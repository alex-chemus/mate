<script lang="ts" setup>
</script>

<template>
  <div class="content-container">
    <img src="@/assets/imgs/emoji-done.png" class="emoji" alt="" />
    <h1 class="heading">Данные заполнены. Всю введённую информацию Вы сможете изменить позже</h1>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.content-container {
  @include flex(flex-start, center, column);
}

.emoji {
  margin-bottom: 20px;
}

.heading {
  @include findcreek-bold(30px, var(--heading-color-1));
  text-align: center;
}
</style>
