<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useFetchApi } from '@/shared/utils'

const fetchApi = useFetchApi()

const pagination = reactive({
  amount: 20,
  from: 0
})

const fetchFeed = async () => {
  fetchApi('feed.getPosts', {
    page: `${pagination.from},${pagination.amount}`
  })
}
onMounted(fetchFeed)
</script>

<template>
  posts feed view
</template>

<style scoped lang="scss" src="./PostsFeedView.scss" />