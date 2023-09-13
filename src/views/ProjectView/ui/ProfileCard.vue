<script lang="tsx" setup>
import { defineProps, defineEmits } from 'vue'
import { IconPencil } from '@tabler/icons-vue'
import { Logo } from '@/shared/ui';
import useSettings from '@/features/Settings/useSettings'
import { useTheme, useWindowWidth } from '@/shared/utils'

const props = defineProps<{
  name: string,
  img?: string,
  banner?: string,
  followers: string,
  following: string,
  nickname: string,
  ownsProject?: boolean,
  isSubscribed?: boolean,
  about?: string
}>()

const emit = defineEmits<{
  (e: 'subscribe'): void,
  (e: 'unsubscribe'): void
}>()

const { theme } = useTheme()
const { openSettings } = useSettings()
const { windowWidth, breakpoints } = useWindowWidth()

const EditOrSubButton = () => {
  return props.ownsProject ? (
    <button onClick={() => openSettings('projects')} class={`button edit-button ${theme.value} | xl:w-full`}>
      <span>{windowWidth.value > breakpoints.sm ? 'Редактировать профиль' : <IconPencil />}</span>
    </button>
  ) : (
    <button class={`button logo-button ${theme.value} | xl:w-full`} onClick={() => props.isSubscribed ? emit('unsubscribe') : emit('subscribe')}>
      <div class="logo">
        <Logo height="19" width="15" />
      </div>
      <strong>{ props.isSubscribed ? 'Отписаться' : 'Подписаться' }</strong>
    </button>
  )
}
</script>

<template>
  <section class="card-section" :class="theme">
    <div v-if="banner" class="cover-container">
      <img :src="banner" :alt="name" class="banner-img" />

      <button class="cover-button">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-camera" />
        </svg>
      </button>
    </div>

    <div class="profile-container">
      <div class="content-container | xl:mb-[14px] xl:mr-0 mr-[14px]">
        <img v-if="img" :src="img" :alt="name" class="avatar" />
        <div v-else class="placeholder" />
      </div>

      <div class="flex flex-col xl:items-center items-start gap-[4px] mr-auto xl:mr-0 xl:mb-[32px]">
        <h3 class="fullname" :class="theme">{{ name }}</h3>
        <p class="nickname" :class="theme">@{{ nickname }}</p>
      </div>

      <edit-or-sub-button />
    </div>

    <div v-if="windowWidth < breakpoints.xl" class="p-[17px] pt-0 font-findcreek text-[14px] text-text-color-1">
      {{ about ?? 'Тут пока ничего нет' }}
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.card-section {
  border-radius: 14px;
  overflow: hidden;
  border: var(--border-2);
  position: relative;
  background-color: var(--bg-color-2);
}

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

  @include xl {
    @include flex(space-between, center, row);
  }
}

.content-container {
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
}

.button {
  background-color: transparent;
  @include flex(center, center);
  position: relative;
  /* align-self: stretch; */
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
