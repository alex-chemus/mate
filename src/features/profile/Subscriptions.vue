<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { IState } from '@/store/types'

const { state } = useStore<IState>()

interface ICompany {
  name: string,
  followers: string,
  avatar?: string | null,
  id: number,
}

const subscriptions = ref<ICompany[]>([
  { name: 'Yandex', followers: '800 тыс. подписчиков', id: 0 },
  { name: 'Google', followers: '8 млн подписчиков', id: 1 },
  { name: 'Tesla', followers: '1 млн подписчиков', id: 2 }
])
</script>

<template>
  <section class="subscriptions-section" :class="state.theme">
    <div class="title-wrapper" :class="state.theme">
      <h4 class="title" :class="state.theme">Подписки</h4>
      <button class="search-button">
        <svg width="25" height="25" viewBox="0 0 25 25">
          <use href="@/assets/tabler-sprite.svg#tabler-search" />
        </svg>
      </button>
    </div>

    <ul class="subscriptions-list">
      <li v-for="item in subscriptions" :key="item.id" class="item">
        <img v-if="item.avatar" :alt="item.name" class="avatar" :class="state.theme" />
        <div v-else class="avatar placeholder" :class="state.theme" />

        <div class="item-content-wrapper" :class="state.theme">
          <h6>{{ item.name }}</h6>
          <small>{{ item.followers }}</small>
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/styles/style.scss';

.subscriptions-section {
  padding: 20px 16px 12px 17px;
  border-radius: 13px;
  border: 1px solid color.change($gray-1, $alpha: .25);

  &.light {
    background-color: var(--light);
  }

  &.dark {
    background-color: var(--dark-theme-color-2)
  }
}

.title-wrapper {
  @include flex(space-between, center);
  margin-bottom: 16px;

  &.dark {
    color: var(--gray-3);
  }

  &.light {
    color: var(--gray-1);
  }
}

.title {
  font-family: var(--ff-ubuntu);
  font-size: 14px;
  font-weight: var(--fw-medium);

  &.light {
    color: var(--dark-2);
  }

  &.dark {
    color: var(--light);
  }
}

.search-button {
  color: inherit;
}

.subscriptions-list {
  list-style: none;
  padding: 0;
  margin: 0;

  & > *:not(:last-child) {
    margin-bottom: 21px;
  }
}

.item {
  @include flex(flex-start, center);

  & > *:not(:last-child) {
    margin-right: 20px;
  }
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 100vmax;
  border: 4px solid color.change($gray-1, $alpha: .3);
  object-fit: cover;

  &.placeholder.light {
    background-color: color.change($gray-1, $alpha: .3);
  }

  &.placeholder.dark {
    background-color: var(--gray-3);
  }
}

.item-content-wrapper {
  h6 {
    margin: 0;
    margin-bottom: 1px;
    font-family: var(--ff-noto-sans);
    font-size: 18px;
  }

  &.dark h6 {
    color: var(--light);
  }

  &.light h6 {
    color: var(--dark-2);
  }

  small {
    margin: 0;
    font-family: var(--ff-noto-sans);
    font-size: 14px;
  }

  &.dark small {
    color: var(--gray-3);
  }

  &.light small {
    color: var(--gray-1);
  }
}
</style>
