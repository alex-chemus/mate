<script lang="tsx" setup>
import { defineProps, defineEmits } from 'vue'
import { useTheme, useWindowWidth } from '@/shared/utils'
import useSettings from '@/features/Settings/useSettings'
import { IconPencil } from '@tabler/icons-vue'

const props = defineProps<{
  fullName: string,
  img?: string,
  banner?: string,
  nickname: string,
  canEdit?: boolean,
  isSubscribed?: boolean,
  subscribers?: number,
  subscriptions?: number,
  bio?: string,
  projectsCount?: number
}>()

const emit = defineEmits<{
  (e: 'subscribe'): void,
  (e: 'unsubscribe'): void,
  (e: 'name-click'): void
}>()

const { theme } = useTheme()
const { openSettings } = useSettings()
const { windowWidth, breakpoints } = useWindowWidth()

const EditOrSubButton = () => {
  const handleSubscriptionClick = () => {
    if (props.isSubscribed) emit('unsubscribe')
    else emit('subscribe')
  }

  if (props.canEdit) {
    return (
      <button onClick={() => openSettings('profile')} class={`button edit-button ${theme.value} | xl:w-full xl:mt-[30px]`}>
        <span>{windowWidth.value < breakpoints.sm ? <IconPencil /> : 'Редактировать профиль'}</span>
      </button>
    )
  }

  return (
    <button class={`button logo-button ${theme.value} | xl:w-full xl:mt-[15px]`} onClick={handleSubscriptionClick}>
      {/* <div class="logo">
        <Logo height="19" width="15" />
      </div> */}
      <strong>{ props.isSubscribed ? 'Отписаться' : 'Подписаться' }</strong>
    </button>
  )
}

const UserStatisticsList = () => {
  const dataList = [
    { title: 'Проектов', value: props.projectsCount ?? 0, id: 0 },
    { title: 'Подписчиков', value: props.subscribers ?? 0, id: 1 },
    { title: 'Подписок', value: props.subscriptions ?? 0, id: 2 }
  ] as const

  return (
    <div class="w-1/2 flex items-baseline justify-between gap-[13px]">
      {dataList.map(({ title, value, id }) => (
        <p key={id} class="font-findcreek text-[14px] flex gap-[4px]">
          <span class="text-light-text-color-1 dark:text-dark-text-color-1">{value}</span>
          <span class="text-light-text-color-2 dark:text-dark-text-color-2">{title}</span>
        </p>
      ))}
    </div>
  )
}
</script>

<template>
  <section class="card-section" :class="theme">
    <img :src="banner ?? img" :alt="fullName" class="banner-img" />

    <div v-if="windowWidth > breakpoints.xl" class="profile-container">
      <div class="content-container">
        <p class="subs-info-wrapper">
          <strong>{{ subscribers ?? 0 }}</strong>
          <span>Подписчиков</span>
        </p>

        <img v-if="img" :src="img" :alt="fullName" class="avatar" />
        <div v-else class="placeholder" />

        <p class="subs-info-wrapper">
          <strong>{{ subscriptions ?? 0 }}</strong>
          <span>Подписок</span>
        </p>
      </div>

      <h3 class="fullname" :class="theme">{{ fullName }}</h3>
      <p class="nickname | mb-[32px]" :class="theme">@{{ nickname }}</p>

      <edit-or-sub-button />
    </div>

    <div v-else-if="windowWidth <= breakpoints.xl" class="profile-container">
      <div class="w-full flex justify-between items-end mt-[-63.5px]">
        <!-- eslint-disable -->
        <div @click="emit('name-click')" class="cursor-pointer">
          <img v-if="img" :src="img" :alt="fullName" class="avatar" />
          <div v-else class="placeholder" />

          <h3 class="fullname" :class="theme">{{ fullName }}</h3>
          <p class="nickname" :class="theme">@{{ nickname }}</p>
        </div>
        <!-- eslint-enable -->

        <edit-or-sub-button />
      </div>

      <p class="font-findcreek text-[15px] text-light-text-color-1 dark:text-dark-text-color-1">{{ bio }}</p>

      <user-statistics-list />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.card-section {
  border-radius: 13px;
  overflow: hidden;
  border: var(--border-2);
  position: relative;
  background-color: var(--bg-color-2);
}

.banner-img {
  max-height: 140px;
  width: 100%;
  object-fit: cover;
  border-bottom: 1px solid color.change($gray-1, $alpha: .25);
}

.profile-container {
  @include flex(flex-start, center, column);
  padding: 30px 15px 15px 15px;

  @include xl {
    padding-top: 16px;
    gap: 12px;
    align-items: flex-start;
  }
}

.content-container {
  margin-bottom: 10px;
  width: 100%;
  @include flex(space-between, center);

  @include xl {
    width: auto;
  }
}

.content-wrapper {
  @include flex(flex-start, center, column);

  h5 {
    margin: 0;
    margin-bottom: 10px;
    @include noto-sans-bold(16px, var(--heading-color-1));
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

  @include xl {
    @include findcreek-bold(20px, var(--heading-color-1))
  }
}

.nickname {
  @include noto-sans(13px, var(--text-color-2));
  // margin: 0;
  // margin-bottom: 32px;
}

:deep(.button) {
  background-color: var(--bg-color-3);
  @include flex(center, center);
  position: relative;
  padding: 8px;
  transition: var(--fast);

  &:is(:hover, :focus) {
    box-shadow: var(--hover-element-shadow);
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  strong {
    color: var(--heading-color-1);
  }

  .logo {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 5px;
    height: 19px;
  }

  strong {
    @include findcreek-bold(13px);
  }
}

:deep(.logo-button) {
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
  // padding: 16px 0;
  height: 40px;
  @include findcreek-medium(14px, var(--text-color-1));
  background-color: var(--bg-color-3);

  @include xl {
    width: max-content;
    margin-left: auto;
  }
}

.separator {
  height: 1px;
  background-color: color.change($gray-1, $alpha: .2);
  margin-bottom: 12px;
}

.bio {
  text-align: center;
  margin: 18px 0;
  line-height: 160%;
  @include findcreek(14px, var(--heading-color-1));
}

.subs-info-wrapper {
  @include flex(flex-start, center, column);
  gap: 4px;

  span {
    @include findcreek(13px, var(--text-color-2));
  }

  strong {
    @include noto-sans-bold(16px, var(--heading-color-1));
  }
}
</style>
