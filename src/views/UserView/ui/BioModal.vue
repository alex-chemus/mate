<script lang="tsx" setup>
import { defineProps, defineEmits } from 'vue'
import { useTheme } from '@/shared/utils'
import { ModalLayout } from '@/shared/hocs'
import { SocialMedia } from '@/shared/types'
import Contacts from './Contacts.vue'

const props = defineProps<{
  bio: string,
  emails: {
    id: number,
    emailAddress: string
  }[],
  specialties: string[],
  registrationDate: string,
  phones: {
    id: number,
    phoneNumber: string
  }[],
  city: string,
  skills: string,
  media?: SocialMedia[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { theme } = useTheme()

const dataList = [
  {
    id: 0,
    useIcon: () => <use href='@/assets/imgs/tabler-sprite.svg#tabler-notes' />,
    title: 'О себе',
    render: () => <p>{props.bio}</p>
  },
  {
    id: 1,
    // icon: 'mail',
    useIcon: () => <use href='@/assets/imgs/tabler-sprite.svg#tabler-mail' />,
    title: 'Электронная почта',
    render: () => (<>{
      props.emails.map(({ id, emailAddress }) => (
        <p key={id}>{emailAddress}</p>
      ))
    }</>)
  },
  {
    id: 2,
    // icon: 'hammer',
    useIcon: () => <use href='@/assets/imgs/tabler-sprite.svg#tabler-hammer' />,
    title: 'Специальности',
    render: () => <p>{props.specialties.join(', ')}</p>
  },
  {
    id: 3,
    // icon: 'registered',
    useIcon: () => <use href='@/assets/imgs/tabler-sprite.svg#tabler-registered' />,
    title: 'Был зарегистрирован на платформе',
    render: () => <p>{props.registrationDate}</p>
  },
  {
    id: 4,
    // icon: 'id-badge-2',
    useIcon: () => <use href='@/assets/imgs/tabler-sprite.svg#tabler-id-badge-2' />,
    title: 'Личная информация',
    render: () => (
      <div class="personal-info-wrapper">
        {
          props.phones.length && (<>
            <p class={theme}>Номера телефона:</p>
            <div>
              {
                props.phones.map(({ id, phoneNumber }) => (
                  <p key={id}>{phoneNumber}</p>
                ))
              }
            </div>
          </>)
        }
        {
          props.city && (<>
            <p class={theme}>Город:</p>
            <p class={`colored ${theme}`}>{props.city}</p>
          </>)
        }
      </div>
    )
  }
]

const RenderDataList = () => {
  return (
    <ul class="content-list">{
      dataList.map(item => (
        <li key={item.id} class="content-item">
          <svg class={`icon ${theme}`} width="24" height="24" viewBox="0 0 24 24">
            {/* <use href={`@/assets/imgs/tabler-sprite.svg#tabler-${item.icon}`} /> */}
            <item.useIcon />
          </svg>
          <h6>{item.title}</h6>
          <item.render />
        </li>
      ))
    }</ul>
  )
}
</script>

<template>
  <modal-layout @close="emit('close')">
    <h5 class="title" :class="theme">Подробная информация о пользователе</h5>

    <!-- <render-data-list /> -->

    <ul class="content-list">
      <li v-if="bio.length" class="content-item">
        <svg
          class="icon" :class="theme"
          width="24" height="24" viewBox="0 0 24 24"
        >
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-notes" />
        </svg>
        <div class="content-wrapper">
          <h6 :class="theme">О себе</h6>
          <p :class="theme">{{ bio }}</p>
        </div>
      </li>

      <li v-if="emails.length" class="content-item">
        <svg
          class="icon" :class="theme"
          width="24" height="24" viewBox="0 0 24 24"
        >
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-mail" />
        </svg>
        <div class="content-wrapper">
          <h6 :class="theme">Электронная почта</h6>
          <p
            v-for="email in emails" :key="email.id"
            :class="theme"
          >{{ email.emailAddress }}</p>
        </div>
      </li>

      <li v-if="specialties.length" class="content-item">
        <svg
          class="icon" :class="theme"
          width="24" height="24" viewBox="0 0 24 24"
        >
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-hammer" />
        </svg>
        <div class="content-wrapper">
          <h6 :class="theme">Специальности</h6>
          <p :class="theme">{{ specialties.join(', ') }}</p>
        </div>
      </li>

      <li v-if="registrationDate" class="content-item">
        <svg
          class="icon" :class="theme"
          width="24" height="24" viewBox="0 0 24 24"
        >
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-registered" />
        </svg>
        <div class="content-wrapper">
          <h6 :class="theme">Был зарегистрирован на платформе</h6>
          <p :class="theme">{{ registrationDate }}</p>
        </div>
      </li>

      <li v-if="city.length | phones.length" class="content-item">
        <svg
          class="icon" :class="theme"
          width="24" height="24" viewBox="0 0 24 24"
        >
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-id-badge-2" />
        </svg>
        <div class="content-wrapper">
          <h6 :class="theme">Личная информация</h6>
          <div class="personal-info-wrapper">
            <template v-if="phones.length">
              <p :class="theme">Номера телефона:</p>
              <div>
                <p
                  v-for="phone in phones" :key="phone.id"
                  class="colored" :class="theme"
                >{{ phone.phoneNumber }}</p>
              </div>
            </template>
            <template v-if="city">
              <p :class="theme">Город:</p>
              <p class="colored" :class="theme">{{ city }}</p>
            </template>
          </div>
        </div>
      </li>
    </ul>

    <div v-if="skills.length" class="skills-container">
      <svg
        class="icon" :class="theme"
        width="24" height="24" viewBox="0 0 24 24"
      >
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-barbell" />
      </svg>

      <div class="skills-wrapper">
        <h6 :class="theme">Навыки</h6>
        <ul class="skills-list">
          <li
            v-for="(skill, i) in skills.split(', ')" :key="i"
            class="skill-item" :class="theme"
          >
            {{ skill }}
          </li>
        </ul>
      </div>
    </div>

    <contacts v-if="media" :media="media" />
  </modal-layout>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.title {
  @include findcreek-medium(16px, var(--heading-color-1));
  margin-bottom: 25px;
  padding: 0 12px;
}

.content-list {
  @include flex(flex-start, stretch, column);
  gap: 16px;
  list-style: none;
  margin: 0;
  margin-bottom: 16px;
  padding: 0 12px;
}

.icon {
  color: var(--accent);
}

.content-item {
  @include flex(flex-start, flex-start);
  gap: 10px;

  svg {
    flex-shrink: 0;
  }
}

.content-wrapper {
  @include flex(flex-start, flex-start, column);
  gap: 4px;
  overflow: hidden;
}

.content-wrapper h6,
.skills-wrapper h6 {
  @include findcreek-medium(14px, var(--heading-color-1));
  letter-spacing: .01em;
  text-overflow: ellipsis;
  max-width: 100%;
  overflow: hidden;
}

.content-wrapper p {
  @include findcreek(14px, var(--text-color-2));
  line-height: 1.6em;
  text-overflow: ellipsis;
  max-width: 100%;
  overflow: hidden;

  &.colored {
    color: var(--accent);
  }
}

.personal-info-wrapper {
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-auto-flow: row;
  grid-gap: 4px;
}

.skills-container {
  @include flex(flex-start, flex-start);
  gap: 10px;
  padding: 12px;
  border-radius: 13px;
  border: 1px solid color.change($gray-1, $alpha: .25);
}

.skills-list {
  list-style: none;
  padding: 0;
  margin: 0;
  @include flex(flex-start, center);
  gap: 10px;
  flex-wrap: wrap;
}

.skills-wrapper {
  @include flex(flex-start, flex-start, column);
  gap: 10px;
}

.skill-item {
  height: 30px;
  padding: 0 10px;
  border-radius: 8px;
  // border: 1px solid color.change($gray-1, $alpha: .25);
  border: var(--border-1);
  @include flex(center, center);
  @include noto-sans-medium(12px, var(--heading-color-1));
  background-color: var(--bg-color-2);
}
</style>
