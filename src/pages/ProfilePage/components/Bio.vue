<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { Modal } from 'ant-design-vue'
import { useTheme } from '@/utils'
import ProfileInfo from './ProfileInfo.vue'

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

const { theme } = useTheme()

const isOpen = ref(false)
</script>

<template>
  <section class="bio-section" :class="theme">
    <h5>О себе</h5>
    <p>{{ bio.length === 0 ? 'Расскажите о себе' : bio }}</p>
    <button class="info-button" :class="theme" @click="isOpen = true">
      <svg width="16" height="16" viewBox="0 0 16 16">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-info-circle" />
      </svg>
      <span>Подробнее</span>
    </button>
  </section>

  <modal v-model:visible="isOpen" centered width="600px">
    <profile-info
      :bio="bio"
      :emails="emails"
      :specialties="specialties"
      :registration-date="registrationDate"
      :phones="phones"
      :city="city"
      :skills="skills"
      @close="isOpen = false"
    />
  </modal>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.bio-section {
  border-radius: 13px;
  border: 1px solid rgba(118 118 118 / .25);
  padding: 11px 19px;
  color: var(--heading-color-2);
  background-color: var(--bg-color-1);

  h5 {
    font-family: var(--findcreek-medium);
    font-size: 14px;
    letter-spacing: 1%;
    margin: 0;
    margin-bottom: 12px;
    color: currentColor;
  }

  p {
    font-family: var(--medium);
    font-size: 13px;
    line-height: 160%;
    letter-spacing: -2%;
    margin-bottom: 6px;
  }
}

.info-button {
  @include flex(flex-start, center);
  gap: 2px;
  color: var(--accent);

  span {
    font-family: var(--findcreek);
    font-size: 12px;
  }
}
</style>
