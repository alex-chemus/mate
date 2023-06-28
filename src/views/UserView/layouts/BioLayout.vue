<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue'
import { Modal } from '@/shared/hocs'
import { useTheme } from '@/shared/utils'
import ProfileLayout from './ProfileLayout.vue'

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
  isMe?: boolean
}>()

const { theme } = useTheme()

const isOpen = ref(false)

const getText = computed(() => {
  if (props.bio.length) return props.bio
  if (props.isMe) return 'Расскажите о себе'
  return 'Тут пока ничего нет'
})
</script>

<template>
  <section class="bio-section" :class="theme">
    <h5>О себе</h5>
    <p>{{ getText }}</p>
    <button class="info-button" :class="theme" @click="isOpen = true">
      <svg width="16" height="16" viewBox="0 0 16 16">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-info-circle" />
      </svg>
      <span>Подробнее</span>
    </button>
  </section>

  <modal v-model:visible="isOpen" width="600">
    <profile-layout
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
  padding: 15px 19px;
  color: var(--heading-color-2);
  background-color: var(--bg-color-1);

  h5 {
    @include findcreek-medium(14px, currentColor);
    letter-spacing: 1%;
    margin: 0;
    margin-bottom: 12px;
  }

  p {
    @include findcreek-medium(13px, currentColor);
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
    @include findcreek(13px, currentColor);
  }
}
</style>
