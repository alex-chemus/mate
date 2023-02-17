<script lang="ts" setup>
import { defineProps } from 'vue'
import { Logo } from '@/ui'
import { useTheme } from '@/utils'

defineProps<{
  name: string,
  img?: string,
  banner?: string,
  followers: string,
  following: string,
  nickname: string
}>()

const { theme } = useTheme()
</script>

<template>
  <section class="card-section" :class="theme">
    <!-- <button class="more-button">
      <svg width="25" height="25" viewBox="0 0 25 25">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-dots-vertical" />
      </svg>
    </button> -->

    <div v-if="banner" class="cover-container">
      <img :src="banner" :alt="name" class="banner-img" />

      <button class="cover-button">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-camera" />
        </svg>
      </button>
    </div>

    <div class="profile-container">
      <div class="content-container">
        <!-- <div class="content-wrapper" :class="theme">
          <h5>{{ followers }}</h5>
          <p>Подписчиков</p>
        </div> -->

        <img v-if="img" :src="img" :alt="name" class="avatar" />
        <div v-else class="placeholder" />

        <!-- <div class="content-wrapper" :class="theme">
          <h5>{{ following }}</h5>
          <p>Подписок</p>
        </div> -->
      </div>

      <h3 class="fullname" :class="theme">{{ name }}</h3>
      <p class="nickname" :class="theme">@{{ nickname }}</p>

      <button class="button logo-button" :class="theme">
        <div class="logo">
          <logo height="19" width="15" />
        </div>
        <strong>FINDCREEK</strong>
      </button>

      <button class="button edit-button" :class="theme">
        <span>Редактировать профиль</span>
      </button>

      <!-- <div class="separator" /> -->
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.card-section {
  border-radius: 13px;
  overflow: hidden;
  border: 1px solid color.change($gray-1, $alpha: .25);
  position: relative;
  background-color: var(--bg-color-1);
}

// .more-button {
//   position: absolute;
//   top: 0;
//   right: 0;
//   border-radius: 0 0 0 10px;
//   padding: 6px;
//   background-color: color.change($gray-1, $alpha: .1);
//   color: var(--gray-1);
// }

.cover-button {
  position: absolute;
  top: 5px;
  right: 5px;
  border-radius: 100vmax;
  height: 40px;
  width: 40px;
  @include flex(center, center);
  background-color: color.change($gray-1, $alpha: .1);
  color: #5C5C5C;
  display: none;
}

.cover-container:hover .cover-button {
  display: flex;
}

.cover-container {
  margin-bottom: 32px;
}

.banner-img {
  border-bottom: 1px solid color.change($gray-1, $alpha: .25);
  background-color: var(--light);
  object-fit: cover;
  height: 140px;
  width: 100%;
}

.profile-container {
  @include flex(flex-start, center, column);
  padding: 17px;
}

.content-container {
  //@include flex(space-between, center);
  // display: grid;
  // grid-template-columns: 1fr max-content 1fr;
  // align-items: center;
  // align-self: stretch;
  // margin: 32px 0 12px;
  margin-bottom: 12px;
  @include flex(center, center);
}

.content-wrapper {
  @include flex(flex-start, center, column);

  h5 {
    margin: 0;
    margin-bottom: 10px;
    font-family: var(--noto-sans-bold);
    //font-weight: var(--bold);
    font-size: 16px;
    color: var(--heading-color-2);
  }

  p {
    font-size: 12px;
    font-family: var(--findcreek-medium);
    margin: 0;
    color: var(--text-color-2);
  }
}

.avatar,
.placeholder {
  border-radius: 100vmax;
  width: 95px;
  height: 95px;
}

.avatar {
  object-fit: cover;
}

.placeholder {
  background-color: var(--gray-1);
}

.fullname {
  font-family: var(--findcreek-medium);
  font-size: 16px;
  margin: 0;
  margin-bottom: 3px;
  color: var(--heading-color-2);
}

.nickname {
  font-family: var(--noto-sans);
  font-size: 12px;
  margin: 0;
  margin-bottom: 18px;
  color: var(--text-color-2);
}

.button {
  background-color: transparent;
  @include flex(center, center);
  position: relative;
  align-self: stretch;
  padding: 7px;
  transition: var(--fast);

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  strong {
    color: var(--heading-color-2);
  }

  &.light {
    border: 1px solid color.change($gray-1, $alpha: .2);
  }

  &.light:hover,
  &.light:focus {
    box-shadow: 0 0 5px 0 rgba(0 0 0 / .25);
  }

  &.dark {
    border: 1px solid color.change($gray-3, $alpha: .5);
  }

  &.dark:hover,
  &.dark:focus {
    box-shadow: 0 0 10px 0 rgba(0 0 0 / .5);
  }

  .logo {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 5px;
    height: 19px;
  }

  strong {
    font-family: var(--montserrat-bold);
    font-size: 13px;
  }
}

.logo-button {
  border-radius: 8px;
}

.edit-button {
  border-radius: 10px;
  padding: 16px 0;

  span {
    font-family: var(--findcreek);
    font-size: 14px;
  }

  &.dark span {
    color: var(--light);
  }

  &.light span {
    color: #4d4d4d;
  }
}

.separator {
  height: 1px;
  background-color: color.change($gray-1, $alpha: .2);
  margin-bottom: 12px;
  width: 100%;
}

.bio {
  text-align: center;
  margin: 18px 0;
  font-family: var(--findcreek);
  font-size: 14px;
  line-height: 160%;
  color: var(--heading-color-2);
}
</style>
