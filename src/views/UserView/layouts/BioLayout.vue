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
  <button class="bio-section" :class="theme" @click="isOpen = true">
    <div class="title-wrapper">
      <h5>О себе</h5>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-info-circle" />
      </svg>
    </div>
    <p>{{ getText }}</p>
    <!-- <button class="info-button" :class="theme" @click="isOpen = true">
      <svg width="16" height="16" viewBox="0 0 16 16">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-info-circle" />
      </svg>
      <span>Подробнее</span>
    </button> -->
  </button>

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
  width: 100%;
  border-radius: 13px;
  border: var(--border-2);
  padding: 23px;
  color: var(--heading-color-2);
  background-color: var(--bg-color-2);
  @include flex(flex-start, stretch, column);
  gap: 21px;
  text-align: left;
  transition: var(--fast);

  &:is(:hover, :focus) {
    box-shadow: var(--hover-block-shadow);
  }

  h5 {
    @include findcreek-medium(16px, currentColor);
    margin: 0;
  }

  p {
    @include findcreek(14px, currentColor);
    line-height: 160%;
  }
}

.title-wrapper {
  @include flex(space-between, center);
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
