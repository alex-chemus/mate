<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useTheme } from '@/utils'
import { SocialMedia } from '@/types'
import { Input, Tag } from '@/ui'

defineProps<{
  media: SocialMedia[]
}>()

const emit = defineEmits<{
  (e: 'add', link: string): void,
  (e: 'edit', payload: { id: number, link: string }): void,
  (e: 'remove', link: number): void
}>()

const { theme } = useTheme()

const inputValue = ref<string>()
const editMediaID = ref<number | null>(null)

const onSaveClick = () => {
  if (!inputValue.value) return
  if (editMediaID.value === null) {
    emit('add', inputValue.value)
  } else {
    emit('edit', {
      link: inputValue.value,
      id: editMediaID.value
    })
  }
}

const startEditing = (item: SocialMedia) => {
  inputValue.value = item.url
  editMediaID.value = item.id
}
</script>

<template>
  <div class="media-container">
    <div class="input-wrapper">
      <Input
        v-model:value="inputValue"
        label-text="Социальные сети"
        placeholder="Ведите ссылку на свой аккаунт в соцсети..."
      />
      <button class="add-button" :class="theme" @click="onSaveClick">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <use href="@/assets/imgs/tabler-sprite.svg#tabler-plus" />
        </svg>
      </button>
    </div>

    <ul class="tags-wrapper">
      <li v-for="mediaItem in media" :key="mediaItem.id">
        <tag
          :round="true" @close="emit('remove', mediaItem.id)"
          :border-color="mediaItem.id === editMediaID ? '#455DF6' : undefined"
        >
          <template #content>
            <div class="content-wrapper">
              <!-- eslint-disable-next-line -->
              <img
                v-if="mediaItem.logo"
                :src="mediaItem.logo"
                class="media-item-logo"
              />
              <span>{{ mediaItem.service }}</span>
            </div>
          </template>
          <!-- eslint-disable-next-line -->
          <template #button v-if="editMediaID !== mediaItem.id">
            <button class="edit-button" :class="theme" @click="startEditing(mediaItem)">
              <svg height="18" width="18" viewBox="0 0 18 18">
                <use href="@/assets/imgs/tabler-sprite.svg#tabler-pencil" />
              </svg>
            </button>
          </template>
          <template #button v-else>
            <button class="edit-button" :class="theme" @click="editMediaID = null">
              <svg height="18" width="18" viewBox="0 0 18 18">
                <use href="@/assets/imgs/tabler-sprite.svg#tabler-pencil-off" />
              </svg>
            </button>
          </template>
        </tag>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.media-container {
  @include flex(flex-start, stretch, column);
  gap: 20px;
}

.input-wrapper {
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-gap: 15px;
  align-items: end;
}

.add-button {
  height: 40px;
  cursor: pointer;
  color: var(--accent);
}

.tags-wrapper {
  list-style: none;
  margin: 0;
  padding: 0;
  @include flex(flex-start, center);
  gap: 10px;
  flex-wrap: wrap;
}

.edit-button {
  margin-left: 20px;
  color: var(--text-color-1);
}

.content-wrapper {
  @include flex(flex-start, center);
  gap: 8px;

  span {
    @include findcreek-medium(13px, var(--heading-color-1));
  }
}

.media-item-logo {
  width: 20px;
  aspect-ratio: 1;
  object-fit: cover;
}
</style>
