<script setup lang="ts">
import { reactive, ref, watch, onMounted } from 'vue'
import {
  Form, Row, Col, FormItem, Input, Space, DatePicker, Radio, RadioGroup
} from 'ant-design-vue'
import dayjs, { Dayjs } from 'dayjs'
import { IconCamera, IconCalendarEvent } from '@tabler/icons-vue'
import { ImageUpload } from '@/shared/components'
import { useFetchId, useAlert, useGlobalRefresher } from '@/shared/utils'
import useAppStore from '@/store/useAppStore'

type FormState = {
  avatar: number | null,
  firstName: string,
  lastName: string,
  patronymic: string,
  nametag: string,
  sex: 1 | 2,
  birthday: Dayjs | null
}

const { userState } = useAppStore()

const { setSuccessMessage } = useAlert()

const { refreshAccountGlobal } = useGlobalRefresher()

const fetchId = useFetchId()

const isTouched = ref(false)

const formState = reactive<FormState>({
  avatar: null,
  firstName: '',
  lastName: '',
  patronymic: '',
  nametag: '',
  sex: 1,
  birthday: null
})

const getUserInfo = () => {
  if (userState.value === null) return
  formState.firstName = userState.value.firstName
  formState.lastName = userState.value.lastName
  formState.patronymic = userState.value.patronymic
  formState.nametag = userState.value.textID
  formState.sex = userState.value.sex
  formState.birthday = userState.value.birthday ? dayjs(userState.value.birthday, 'DD.MM.YYYY') : null
}
watch(userState, getUserInfo)
onMounted(getUserInfo)

const handleSubmit = async () => {
  if (!isTouched.value) return
  await fetchId('account.setInfo', {
    firstName: formState.firstName,
    lastName: formState.lastName,
    patronymic: formState.patronymic,
    textID: formState.nametag,
    ...(formState.birthday && { birthday: formState.birthday.toString() }),
    ...(formState.avatar && { avatar: formState.avatar.toString() }),
  })
  isTouched.value = false
  setSuccessMessage('Сохранено')
  refreshAccountGlobal()
}
</script>

<template>
  <Form class="general-settings" :model="formState" layout="vertical" @finish="handleSubmit">
    <Space :size="12" aling="center">
      <image-upload
        class-name="avatar" v-model:value="formState.avatar"
        @touch="isTouched = true"
        :initial-image="userState?.avatar.avatarCompressed || userState?.avatar.avatar"
      >
        <icon-camera width="40px" height="40px" />
      </image-upload>
      <Space :size="5" direction="vertical">
        <h6 class="general-settings-name">{{ userState!.firstName }} {{ userState!.lastName }}</h6>
        <p class="general-settings-nametag">@{{ userState!.textID }}</p>
      </Space>
    </Space>

    <Space direction="vertical" :size="13">
      <Row :gutter="16">
        <Col :span="12">
          <FormItem label="Имя" name="firstName" :rules="[{ required: true, message: 'Имя не должно быть пустым' }]">
            <Input v-model:value="formState.firstName" placeholder="Имя" @change="isTouched = true" />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="Фамилия" name="lastName" :rules="[{ required: true, message: 'Фамилия не должна быть пустой' }]">
            <Input v-model:value="formState.lastName" placeholder="Фамилия" @change="isTouched = true" />
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="16">
        <Col :span="12">
          <FormItem name="patronymic" label="Отчество/матчество">
            <Input v-model:value="formState.patronymic" placeholder="Отчество/матчество" @change="isTouched = true" />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem name="nametag" label="Имя страницы">
            <Input v-model:value="formState.nametag" placeholder="Имя страницы" @change="isTouched = true">
              <template #prefix>
                <span class="general-settings-nametag-prefix">@</span>
              </template>
            </Input>
          </FormItem>
        </Col>
      </Row>

      <FormItem name="sex" label="Пол">
        <RadioGroup v-model:value="formState.sex" @change="isTouched = true" style="width: 100%;">
          <Row :gutter="16">
            <Col :span="12">
              <Radio :value="1">Мужской</Radio>
            </Col>
            <Col :span="12">
              <Radio :value="2">Женский</Radio>
            </Col>
          </Row>
        </RadioGroup>
      </FormItem>

      <FormItem name="birthday" label="Дата рождения">
        <DatePicker
          v-model:value="formState.birthday" @change="isTouched = true"
          placeholder="Выберите дату" :show-today="false"
        >
          <template #suffixIcon>
            <icon-calendar-event />
          </template>
        </DatePicker>
      </FormItem>
    </Space>

    <button class="general-settings-submit-button" type="submit">
      Сохранить
    </button>
  </Form>
</template>

<style scoped lang="scss" src="./GeneralSettings.scss" />