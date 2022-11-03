<script lang="ts" setup>
import { useStore } from 'vuex'
import { IState } from '@/store/types'
import { CustomButton, Search } from '@/UI'

const { state } = useStore<IState>()
</script>


<template>
  <section class="card-container">
    <div class="search-container" :class="state.theme">
      <search placeholder="Поиск" />
      <button class="search-button">
        <svg width="25" height="25" viewBox="0 0 25 25">
          <use href="@/assets/tabler-sprite.svg#tabler-search" />
        </svg>
      </button>
    </div>

    <div class="content-container" :class="state.theme">
      <div class="content-wrapper">
        <h4 :class="state.theme">Программирование, дизайн, уборка</h4>
        <div class="badge" :class="state.theme">
          <svg width="15" height="15" viewBox="0 0 15 15">
            <use href="@/assets/tabler-sprite.svg#tabler-users" />
          </svg>
        </div>
        <p :class="state.theme">Всем привет! Я представляю компанию Google. Рад всем сообщить, что в нашей компании открывается набор персонала. Нам нужны молодые, крутые программисты, дизайнеры и уборщики. Отбор начинается 10 апреля 2022 года. Если Вы нам подойдёте, то у Вас появится крутая возможность построить свою карьеру в компании Google. Будем ждать всех!</p>
      </div>

      <div class="user-wrapper">
        <div class="profile">
          <!--<img src="@/assets/user.jpg" alt="" />-->
          <!--<div class="placeholder" />-->
          <!--<div class="placeholder">
            <div class="border" />
          </div>-->
          <div class="border">
            <div class="placeholder" />
          </div>
          <h5>Андрей Петров</h5>
        </div>

        <div class="user-auth">
          <img src="@/assets/google.svg" alt="" />
          <span>Google</span>
        </div>
      </div>

      <div class="button-wrapper">
        <custom-button>Узнать больше</custom-button>
        <custom-button :is-primary="true">Ответить</custom-button>
      </div>

      <div class="info-wrapper">
        <button class="crumbs-button">
          <svg width="25" height="25" viewBox="0 0 25 25">
            <use href="@/assets/tabler-sprite.svg#tabler-dots" />
          </svg>
        </button>
        <p class="date">07.07.2021</p>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
@use 'sass:color';
@import '@/styles/style.scss';

.card-container {
  @include flex(flex-start, stretch, column);
}

.search-container {
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-gap: 16px;
  padding: 8px;
  border-radius: 15px;
  margin-bottom: 26px;

  &.light {
    box-shadow: 0 0 3px 0 rgba(0 0 0 / .25);
  }

  &.dark {
    background-color: var(--dark-theme-color-1);
    box-shadow: 0 0 3px 2px rgba(0 0 0 / .5);
  }
}

.search-button {
  height: 100%;
  aspect-ratio: 1;
  color: var(--text-color);
}

.content-container {
  border-radius: 15px;
  padding: 14px 10px;

  &.light {
    box-shadow: 0 0 3px 0 rgba(0 0 0 / .25);
  }

  &.dark {
    background-color: var(--dark-theme-color-3);
    box-shadow: inset 0 0 3px 2px rgba(0 0 0 / .5);
  }
}

.content-wrapper {
  padding-left: 23px;
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-auto-flow: row;
  grid-auto-rows: fit-content;
  grid-gap: 8px;
  align-items: center;
  margin-bottom: 15px;
}

.content-wrapper h4 {
  font-family: var(--ff-ubuntu);
  font-size: 16px;
  font-weight: var(--fw-bold);

  &.light {
    color: var(--dark-2);
  }

  &.dark {
    color: var(--light);
  }
}

.badge {
  padding: 5px;
  border: 1px solid currentColor;
  border-radius: 100vmax;
  width: min-content;
  @include flex;

  &.light {
    color: var(--gray-1);
  }

  &.dark {
    color: color.change($gray-1, $alpha: .4);
  }
}

.content-wrapper p {
  font-family: var(--ff-ubuntu);
  font-size: 13px;
  color: var(--text-color);
}

.user-wrapper {
  @include flex(space-between, center);
  margin-bottom: 10px;
  padding: 0 8px;
}

.profile {
  @include flex(flex-start, flex-start);

  h5 {
    margin: 0;
    margin-left: 6px;
    font-family: var(--ff-ubuntu);
    font-size: 13px;
    color: var(--text-color)
  }

  .border {
    width: 32px;
    height: 32px;
    margin-left: -1px;
    margin-top: -1px;
    padding: 1px;
    background-image: linear-gradient(180deg, #4A90E2 0%, #EA4335 100%);
    border-radius: 100vmax;

    .placeholder {
      height: 30px;
      aspect-ratio: 1;
      background-color: var(--gray-1);
      border-radius: 100vmax;
    }
  }
}

.user-auth {
  @include flex(flex-start, center);

  img {
    margin-right: 3px;
  }

  span {
    font-size: 13px;
    font-family: var(--ff-ubuntu);
    color: var(--gray-1);
    font-weight: var(--fw-medium);
  }
}

.button-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  margin-bottom: 10px;
}

.info-wrapper {
  @include flex(space-between, center);
}

.crumbs-button {
  color: var(--gray-1);
}

.date {
  font-family: var(--ff-ubuntu);
  font-size: 13px;
  font-weight: var(--fw-medium);
  color: var(--gray-1);
}
</style>
