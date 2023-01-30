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

  &.light {
    color: #5c5c5c;
  }

  &.dark {
    color: #bbb;
  }
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
  font-family: var(--noto-sans);
  font-weight: var(--medium);
  font-size: 13px;
  letter-spacing: -0.02em;
  margin-right: 7px;

  &.light {
    color: var(--dark-1);
  }

  &.dark {
    color: var(--light);
  }
}
</style>

<style lang="scss">
@use 'sass:color';
@import '@/assets/styles/style.scss';

.specialties-modal-dropdown {
  border-radius: 6px !important;
  box-shadow: 0 0 30px -4px rgb(0 0 0 / .25) !important;

  &.light {
    background-color: var(--light) !important;
    border: 1px solid #e6e6e6;
  }

  &.dark {
    background-color: var(--dark-theme-color-2) !important;
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
}

.specialties-container.light .ant-select-focused .ant-select-selector,
.specialties-container.light .ant-select:hover .ant-select-selector {
  border-color: var(--accent-1) !important;
}

.specialties-container.dark .ant-select-focused .ant-select-selector,
.specialties-container.dark .ant-select:hover .ant-select-selector {
  border-color: var(--accent-2) !important;
}

.specialties-container.light .ant-select-selector {
  border: 1px solid color.change($gray-1, $alpha: .4);
  background-color: var(--light);
  color: var(--dark-2);
}

.specialties-container.dark .ant-select-selector {
  border: 1px solid color.change($gray-1, $alpha: .5);
  background-color: #1E1F29;
  color: var(--light);
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
  }

  &.light .ant-select-item-group {
    color: #5c5c5c;
  }

  &.dark .ant-select-item-group {
    color: #bbb;
  }
}

.specialties-option {
  font-family: var(--findcreek);
  font-size: 13px;
  line-height: 1.4em;
  letter-spacing: -0.033em;
  transition: var(--fast);

  &.light {
    color: var(--dark-1);
  }

  &.dark {
    color: var(--light);
  }

  &.ant-select-item-option-active,
  &.ant-select-item-option-selected {
    color: var(--light) !important;

    &.light {
      background-color: var(--accent-1);
    }

    &.dark {
      background-color: var(--accent-2);
    }
  }
}
</style>
