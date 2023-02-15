<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { useTheme } from '@/utils'
import { ModalLayout } from '@/hocs'

defineProps<{
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
  skills: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { theme } = useTheme()
</script>

<template>
  <modal-layout @close="emit('close')">
    <h5 class="title" :class="theme">Подробная информация о пользователе</h5>

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

      <li class="content-item">
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
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-id-badge-2" />
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
  </modal-layout>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.title {
  font-family: var(--findcreek-medium);
  font-weight: var(--medium);
  font-size: 14px;
  margin-bottom: 25px;

  &.light {
    color: var(--dark-1);
  }

  &.dark {
    color: var(--light);
  }
}

.content-list {
  @include flex(flex-start, stretch, column);
  gap: 15px;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 15px;
}

.icon {
  &.light {
    color: var(--accent-1);
  }

  &.dark {
    color: var(--accent-2);
  }
}

.content-item {
  @include flex(flex-start, flex-start);
  gap: 12px;
}

.content-wrapper {
  @include flex(flex-start, flex-start, column);
  gap: 5px;
}

.content-wrapper h6,
.skills-wrapper h6 {
  font-family: var(--findcreek-bold);
  font-weight: var(--medium);
  font-size: 14px;
  letter-spacing: .01em;
  margin: 0;

  &.light {
    color: var(--dark-2);
  }

  &.dark {
    color: var(--light);
  }
}

.content-wrapper p {
  &.light {
    color: #5C5C5C;
  }

  &.dark {
    color: var(--light);
  }

  &.colored.light {
    color: var(--accent-1);
  }

  &.colored.dark {
    color: var(--accent-2);
  }
}

.personal-info-wrapper {
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-auto-flow: row;
  grid-gap: 5px;
}

.skills-container {
  @include flex(flex-start, flex-start);
  gap: 12px;
  padding: 18px;
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
  border: 1px solid color.change($gray-1, $alpha: .25);
  @include flex(center, center);

  &.light {
    color: var(--dark-1);
  }

  &.dark {
    color: var(--light);
  }
}
</style>
