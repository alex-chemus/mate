<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'
import { Select, SelectOptGroup, SelectOption } from 'ant-design-vue'
import { Specialty, SpecialtiesList, useTheme } from '@/utils'
import { Badge } from '@/ui'

const props = defineProps<{
  allSpecialties: SpecialtiesList
  selectedSpecialties: number[]
}>()

const emit = defineEmits<{
  (e: 'select', payload: number): void,
  (e: 'remove', payload: number): void
}>()

const { theme } = useTheme()

const getPopupContainer = () => {
  return document.querySelector('.settings-modal .ant-modal-content') as HTMLElement
  //return document.body
}

const specialtiesArray = computed(() => {
  const result: Specialty[] = []
  /* eslint-disable */
  for (const specialtyGroup of props.allSpecialties) {
    result.push(...specialtyGroup.specialties)
  }
  /* eslint-enable */
  return result
})
</script>

<template>
  <div class="specialties-container" :class="theme">
    <p class="label" :class="theme">Специальности</p>
    <Select
      :value="undefined"
      @update:value="e => emit('select', e as number)" :show-arrow="false"
      :get-popup-container="getPopupContainer"
      :dropdown-class-name="['specialties-modal-dropdown', theme].join(' ')"
      placeholder="Выберите специальность..."
    >
      <SelectOptGroup v-for="specGroup in allSpecialties" :key="specGroup.id">
        <template #label>{{ specGroup.rusName }}</template>
        <SelectOption
          v-for="spec in specGroup.specialties" :key="spec.id"
          :class="['specialties-option', theme].join(' ')"
          :title="spec.rusName"
        >
          {{ spec.rusName }}
        </SelectOption>
      </SelectOptGroup>
    </Select>
    <!-- <div v-for="specId in selectedSpecialties" :key="specId">
      {{ specialtiesArray.find(s => s.id === specId)?.rusName }}
    </div> -->
    <ul class="specialties-list">
      <li v-for="specId in selectedSpecialties" :key="specId">
        <Badge @close="emit('remove', specId)">
          <template #content>
            <p class="spec-text" :class="theme">
              {{ specialtiesArray.find(s => s.id === specId)?.rusName }}
            </p>
          </template>
        </Badge>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/style.scss';

.label {
  font-family: var(--findcreek-medium, $findcreek-medium);
  font-size: 13px;
  margin: 0 0 6px 10px;
  color: var(--text-color-1);
}

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
  font-family: var(--noto-sans-medium);
  font-size: 13px;
  letter-spacing: -0.02em;
  margin-right: 7px;
  color: var(--heading-color-1);
}
</style>

<style lang="scss">
@use 'sass:color';
@import '@/assets/styles/style.scss';

.specialties-modal-dropdown {
  border-radius: 6px !important;
  box-shadow: 0 0 30px -4px rgb(0 0 0 / .25) !important;
  background-color: var(--bg-color-1) !important;

  &.light {
    border: 1px solid #e6e6e6;
  }

  &.dark {
    border: 1px solid #615478;
  }
}

.specialties-container .ant-select {
  width: 100%;
}

.specialties-container .ant-select-selector {
  border-radius: 8px !important;
  height: 40px !important;
  padding: 0 14px !important;
  @include flex(space-between, center);
  transition: var(--fast) !important;
}

.specialties-container .ant-select-focused .ant-select-selector {
  box-shadow: none !important;
  border-color: var(--accent) !important;
}

.specialties-container .ant-select-selector {
  color: var(--heading-color-2) !important;
  background-color: var(--bg-color-2) !important;
  border: var(--border-1) !important;
}

.specialties-container .ant-select-arrow {
  // border: 1px solid red;
  // transform: translateY(-50%);
  // margin-top: 0;
  // display: block;
  // width: 20px;
  // height: 20px;
  // // background-image: url('@/assets/imgs/tabler-sprite.svg#tabler-chevron-down');
  // // background-color: red;
  // // background-position: center;
  // // background-image: url('data:image/svg+xml,\
  // //   <svg width="20" height="20" viewBox="0 0 20 20" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">\
  // //     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>\
  // //     <path d="M6 9l6 6l6 -6"></path>\
  // //   </svg>\
  // // ');
  // // background-color: red;
  // background-color: black;
  // mask-image: url('@/assets/imgs/tabler-sprite.svg#tabler-chevron-down');

  // * {
  //   display: none;
  // }
}

.specialties-modal-dropdown {
  .ant-select-item-group {
    font-family: var(--noto-sans);
    font-size: 13px;
    color: var(--text-color-1);
  }
}

.specialties-option {
  font-family: var(--findcreek);
  font-size: 13px;
  line-height: 1.4em;
  letter-spacing: -0.033em;
  transition: var(--fast);
  color: var(--heading-color-1) !important;

  &.ant-select-item-option-active,
  &.ant-select-item-option-selected {
    color: var(--light) !important;
    background-color: var(--accent);
  }
}
</style>
