<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { Logo } from '@/shared/ui'
import { useTheme, useSettings } from '@/shared/utils'

defineProps<{
  name: string,
  img?: string,
  banner?: string,
  followers: string,
  following: string,
  nickname: string,
  ownsProject?: boolean,
  isSubscribed?: boolean
}>()

const emit = defineEmits<{
  (e: 'subscribe'): void,
  (e: 'unsubscribe'): void
}>()

const { theme } = useTheme()
const { openSettings } = useSettings()
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

      <button
        v-if="!ownsProject" class="button logo-button" :class="theme"
        @click="isSubscribed ? emit('unsubscribe') : emit('subscribe')"
      >
        <div class="logo">
          <logo height="19" width="15" />
        </div>
        <strong>{{ isSubscribed ? 'Отписаться' : 'Подписаться' }}</strong>
      </button>

      <button v-if="ownsProject" @click="openSettings('projects')" class="button edit-button" :class="theme">
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
  // border: 1px solid color.change($gray-1, $alpha: .25);
  border: var(--border-2);
  position: relative;
  background-color: var(--bg-color-2);
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
  margin-bottom: 14px;
  @include flex(center, center);
}

.content-wrapper {
  @include flex(flex-start, center, column);

  h5 {
    margin: 0;
    margin-bottom: 10px;
    @include noto-sans-bold(16px, var(--heading-color-2));
  }

  p {
    @include findcreek-medium(12px, var(--text-color-2));
    margin: 0;
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
  @include findcreek-medium(16px, var(--heading-color-1));
  margin: 0;
  margin-bottom: 4px;
}

.nickname {
  @include findcreek(13px, var(--text-color-2));
  margin: 0;
  margin-bottom: 32px;
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
    @include montserrat-bold(13px);
  }
}

.logo-button {
  border-radius: 8px;

  &.dark :is(span, strong) {
    color: var(--light);
  }

  &.light :is(span, strong) {
    color: #4d4d4d;
  }
}

.edit-button {
  border-radius: 10px;
  height: 40px;
  @include findcreek-medium(14px, var(--text-color-1));
  background-color: var(--bg-color-3);
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
  @include findcreek(14px, var(--heading-color-2));
  line-height: 160%;
}
</style>
