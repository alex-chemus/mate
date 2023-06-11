<script lang="ts" setup>
import {
  defineProps, defineEmits, computed, ref
} from 'vue'
import { useTheme } from '@/utils'
import { Tag, GroupedDropdown } from '@/ui'
import { Specialty, SpecialtiesList } from '@/types';

const props = defineProps<{
  allSpecialties: SpecialtiesList
  selectedSpecialties: number[]
}>()

const emit = defineEmits<{
  (e: 'select', payload: number): void,
  (e: 'remove', payload: number): void
}>()

const { theme } = useTheme()

const specialtiesArray = computed(() => {
  const result: Specialty[] = []
  /* eslint-disable */
  for (const specialtyGroup of props.allSpecialties) {
    result.push(...specialtyGroup.specialties)
  }
  /* eslint-enable */
  return result
})

const getSpecialties = computed(() => {
  return props.allSpecialties
    .map((specList) => {
      return {
        groupName: specList.rusName,
        groupItems: specList.specialties.map((spec) => ({ id: spec.id, value: spec.rusName }))
      }
    })
})

const selectOpen = ref(false)
</script>

<template>
  <div class="specialties-container" :class="theme">
    <grouped-dropdown
      label-text="Специальности"
      placeholder="Выберите специальность..."
      :items="getSpecialties"
      v-model:visible="selectOpen"
      @select="p => emit('select', p)"
    />

    <ul class="specialties-list">
      <li v-for="specId in selectedSpecialties" :key="specId">
        <tag @close="emit('remove', specId)">
          <template #content>
            <p class="spec-text" :class="theme">
              {{ specialtiesArray.find(s => s.id === specId)?.rusName }}
            </p>
          </template>
        </tag>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.specialties-list {
  list-style: none;
  margin: 0;
  padding: 0;
  @include flex(flex-start, center);
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 7px;
}

.spec-text {
  @include noto-sans-medium(13px, var(--heading-color-1));
  letter-spacing: -0.02em;
  margin-right: 7px;
}
</style>
