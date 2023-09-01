<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { KeyedSearchItems } from '@/features/Header/types'
import { useTypeChecks } from '@/features/Header/hooks';

defineProps<{
  searchItems?: KeyedSearchItems[],
  isLoading?: boolean
}>()

const router = useRouter()

const { isProject } = useTypeChecks()

const handleItemClick = (item: KeyedSearchItems) => {
  if (isProject(item)) router.push({ path: `/project/${item.id}` })
  else router.push({ path: `/user/${item.findcreekID}` })
}
</script>

<template>
  <p v-if="isLoading" class="font-findcreek text-[16px] text-center text-text-color-1">Секунду...</p>

  <ul v-if="searchItems && searchItems.length" class="flex flex-col gap-[15px] ">
    <li v-for="item in searchItems" :key="item.seearchID">
      <button class="flex items-center gap-[10px]" @click="handleItemClick(item)">
        <img
          :src="item.avatar.avatarCompressed || item.avatar.avatar"
          class="aspect-square w-[40px] rounded-full object-cover"
        />
        <div class="flex flex-col items-start">
          <p class="font-findcreek text-[16px] text-text-color-1 mb-[4px]">{{ isProject(item) ? item.name : `${item.firstName} ${item.lastName}` }}</p>
          <p class="font-findcreek text-[13px] text-text-color-2">@{{ item.textID }}</p>
        </div>
      </button>
    </li>
  </ul>

  <div v-else>Ничего не найдено</div>
</template>