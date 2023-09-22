<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Form, FormItem, Input, Space, Textarea } from 'ant-design-vue'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import { IconCamera } from '@tabler/icons-vue'
import { ImageUpload } from '@/shared/components'
import { useFetchApi } from '@/shared/utils'
import useAppStore from '@/store/useAppStore'
import { alertActions } from '@/store/constants'

const router = useRouter()

const { dispatch } = useAppStore()

const fetchApi = useFetchApi()

type FormState = {
  name: string,
  nametag: string,
  description: string,
  avatar: number | null,
  cover: number | null
}

const formState = reactive<FormState>({
  name: '',
  nametag: '',
  description: '',
  avatar: null,
  cover: null
})

const carouselRef = ref<typeof Carousel | null>(null)

const handleSubmit = async () => {
  const projectId = await fetchApi('projects.create', {
    name: formState.name
  })
  if (formState.nametag || formState.description || formState.cover || formState.avatar) {
    await fetchApi('projects.setInfo', {
      projectID: projectId.toString(),
      ...(formState.avatar && { avatar: formState.avatar.toString() }),
      ...(formState.cover && { profileCover: formState.cover.toString() }),
      ...(formState.description !== '' && { description: formState.description }),
      ...(formState.nametag !== '' && { textID: formState.nametag })
    })
  }
  dispatch(alertActions.SET_SUCCESS_MESSAGE, 'Проект добавлен')
  router.push('/projects-list')
}

const handleSubmitFail = () => {
  if (carouselRef.value) carouselRef.value.slideTo(0)
}

const isFirstSlide = computed(() => {
  if (!carouselRef.value) return false
  // @ts-ignore
  return carouselRef.value?.data.currentSlide.value === carouselRef.value?.data.minSlide.value
})

const isLastSlide = computed(() => {
  if (!carouselRef.value) return false
  // @ts-ignore
  return carouselRef.value?.data.currentSlide.value === carouselRef.value?.data.maxSlide.value
})
</script>

<template>
  <Form
    class="new-project-view" :model="formState" layout="vertical"
    @finish="handleSubmit" @finish-failed="handleSubmitFail"
  >
    <Carousel class="form-steps-carousel" ref="carouselRef" :mouse-drag="false">
      <Slide class="form-step">
        <h2 class="form-step-heading">Укажите название для профиля проекта</h2>

        <p class="form-step-description">Введите название для профиля вашего проекта, оно будет на виду у всего мира. Позже его можно будет изменить</p>

        <Space direction="vertical" :size="13" style="width: 100%;">
          <FormItem
            class="form-item" label="Название" name="name"
            :rules="[{ required: true, message: 'Название не должно быть пустым' }]"
          >
            <Input v-model:value="formState.name" />
          </FormItem>

          <FormItem class="form-item" label="Неймтег проекта" name="nametag">
            <Input v-model:value="formState.nametag" />
          </FormItem>
        </Space>
      </Slide>

      <Slide class="form-step">
        <h2 class="form-step-heading">Укажите описание, выберите аватарку и шапку для профиля проекта</h2>
      
        <p class="form-step-description">Позже всю информацию можно будет изменить</p>
        
        <image-upload v-model:value="formState.cover" class-name="cover" stretch>
          <icon-camera width="30px" height="40px" />
          Загрузить обложку
        </image-upload>

        <div class="avatar-wrapper">
          <image-upload v-model:value="formState.avatar" class-name="avatar">
            <icon-camera width="40px" height="40px" />
          </image-upload>
        </div>

        <FormItem class="form-item" label="О проекте" name="description">
          <Textarea v-model:value="formState.description" :rows="3" />
        </FormItem>
      </Slide>

      <Slide class="form-step center">
        <img src="../../assets/imgs/emoji-done.png" />
        <h2 class="form-step-heading">Данные заполнены. Всю введённую информацию Вы сможете изменить позже</h2>
      </Slide>

      <template #addons>
        <Pagination />
      </template>
    </Carousel>

    <div :class="['controls-wrapper', { grid: !isFirstSlide  }]">
      <button class="button-default" v-if="!isFirstSlide" @click="carouselRef?.prev()" type="button">
        Назад
      </button>
      <button class="button-primary" v-if="!isLastSlide" @click="carouselRef?.next()" type="button">
        Далее
      </button>
      <button class="button-primary" v-if="isLastSlide">
        Создать профиль проекта
      </button>
    </div>
  </Form>
</template>

<style lang="scss" scoped src="./NewProjectView.scss" />