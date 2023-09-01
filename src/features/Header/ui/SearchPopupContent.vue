<script lang="ts" setup>
import { defineProps, computed, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { KeyedSearchItem } from '../types'
import { useTypeChecks } from '../hooks'

const props = defineProps<{
  content: KeyedSearchItem,
  userId: number | null
}>()

const emit = defineEmits<{
  (e: 'subscribe', item: KeyedSearchItem): void,
  (e: 'unsubscribe', item: KeyedSearchItem): void,
  (e: 'close'): void
}>()

const router = useRouter()

const { isProject, isUser } = useTypeChecks()

const getUrl = computed(() => {
  if (isUser(props.content))
    return `/user/${props.content.findcreekID}`
  return `/project/${props.content.id}`
})

const navigate = () => {
  router.push(getUrl.value)
  emit('close')
}
</script>

<template>
  <div class="content-container">
    <img
      v-if="isUser(content) && (content.profileCover || content.avatar.avatar)"
      :src="content.profileCover || content.avatar.avatar"
      alt="" class="banner"
    />
    <img
      v-else-if="isProject(content)"
      :src="content.profileCover.profileCover
        || content.profileCover.profileCoverCompressed
        || content.avatar.avatar"
      alt="" class="banner"
    />
    <div v-else class="banner" />

    <div class="content-wrapper">
      <div class="avatar-wrapper">
        <img
          v-if="content.avatar.avatarCompressed || content.avatar.avatarCompressed"
          :src="content.avatar.avatarCompressed || content.avatar.avatarCompressed"
          alt="" class="avatar"
        />
        <div v-else class="avatar" />
        <h6 class="full-name">{{ isProject(content) ? content.name : `${content.firstName} ${content.lastName}` }}</h6>
        <p class="tag">@{{ content.textID }}</p>
      </div>

      <p class="description">{{ isProject(content) ? content.description : content.bio }}</p>

      <div class="bottom-wrapper">
        <ul v-if="isUser(content)" class="specialties-list">
          <li v-for="spec in content.specialties" :key="spec.id">
            {{ spec.rusName }}
          </li>
        </ul>
        <div class="buttons-wrapper">
          <!-- <router-link :to="getUrl" class="profile-button">Перейти в профиль</router-link> -->
          <button class="profile-button" @click="navigate">
            Перейти в профиль
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.content-container {
  @include flex(flex-start, center, column);
  // max-width: 100%;
  width: 100%;
}

.banner {
  width: 100%;
  height: 64px;
  object-fit: cover;
  background-color: var(--gray-1);
}

.content-wrapper {
  @include flex(flex-start, center, column);
  padding: 0 15px 15px 15px;
  flex-grow: 1;
  width: 100%;
}

.avatar-wrapper {
  @include flex(flex-start, center, column);
  gap: 5px;
  margin-top: -26px;
  margin-bottom: 14px;
}

.avatar {
  width: 52px;
  aspect-ratio: 1;
  border: 2px solid var(--bg-color-2);
  border-radius: 100vmax;
  box-shadow: 0 0 4px 0 rgb(0 0 0 / .1);
  object-fit: cover;
  background-color: var(--gray-1);
}

.full-name {
  @include findcreek-medium(16px, var(--heading-color-1));
  margin: 0;
}

.tag {
  @include findcreek(13px, var(--text-color-1));
  margin-top: -2px;
}

.description {
  @include findcreek(13px, var(--text-color-1));
  margin: 0 auto;
  text-align: center;
  line-height: 0.95em;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
}

.bottom-wrapper {
  margin-top: auto;
  width: 100%;
}

.buttons-wrapper {
  @include flex(flex-start, center);
  gap: 15px;
}

.profile-button {
  flex-grow: 1;
  height: 30px;
  border-radius: 5px;
  @include findcreek(12px, var(--accent));
  border: 1px solid currentColor;
  transition: var(--fast);
  @include flex(center, center);
  text-decoration: none;

  &:hover {
    border-color: transparent;
    background-color: var(--accent);
    color: var(--light);
  }
}

.sub-button {
  height: 30px;
  width: 30px;
  background-color: var(--accent);
  transition: var(--fast);
  color: var(--light);
  border-radius: 100vmax;

  &:hover {
    box-shadow: 0 0 4px 0 var(--accent);
  }
}

.specialties-list {
  margin: 0;
  padding: 0;
  margin-bottom: 5px;
  list-style: none;
  @include flex(baseline, flex-start);
  flex-wrap: wrap;
  gap: 14px;

  li {
    @include findcreek(11px, var(--text-color-1));
  }
}
</style>
