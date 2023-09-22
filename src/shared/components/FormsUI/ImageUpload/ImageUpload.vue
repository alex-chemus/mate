<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, watch, toRefs } from 'vue'
import { useCloudApi } from '@/shared/utils'
import { Droparea } from '@/shared/hocs'

type Value = number | null

const props = defineProps<{
  value: Value,
  className?: string,
  stretch?: boolean
}>()
const { value, className } = toRefs(props)

const emit = defineEmits<{
  (e: 'update:value', value: Value): void
}>()

const cloudApi = useCloudApi()

const image = ref<string | null>(null)

const getImage = async () => {
  if (!value.value) return
  console.log('get files')
  const res = await cloudApi.getFiles([value.value])
  image.value = res[0].additionalData.urlToFile
}
onMounted(getImage)
watch(value, getImage)

const setImage = async (e: FileList) => {
  if (!e[0].type.startsWith('image/')) return
  const res = await cloudApi.setFile(e[0])
  console.log('set image')
  emit('update:value', res[0].fileID)
}
</script>

<template>
  <droparea @set="setImage" :is-images="true" :is-stretch="stretch">
    <div
      :style="{
        backgroundImage: image ? `url(${image})` : ''
      }"
      :class="['image-upload', className]"
    >
      <slot />
    </div>
  </droparea>
</template>

<style scoped lang="scss" src="./ImageUpload.scss" />