<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import type { Ref } from 'vue';
import type { DataRoutes, FilterKeys, filterProps } from "@types"
import { useFilterStore } from "@stores/filter"
import { useRoute } from "vue-router";
import ContainerSlideTransition from "@components/transitions/ContainerSlideTransition.vue"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBan, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import RotateTransition from '@components/transitions/RotateTransition.vue';
import CustomInputComponent from '../utility/CustomInputComponent.vue';

const filterStore = useFilterStore()
const route = useRoute()
const { subfiltKey } = defineProps<{ subfiltKey: keyof FilterKeys[DataRoutes] }>()
const data_type = computed(() => {
  return (route.name as string).includes('favorite') ? (route.name as string).replace('favorite', '').toLowerCase() as DataRoutes : route.name as DataRoutes
})
const data = computed(() => filterStore.filterReadyData[data_type.value][subfiltKey] as filterProps & { isDeep: true })
const dataOptions = computed(() => data.value.options)
const openedFilter = inject<Ref<keyof FilterKeys[DataRoutes] | "">>("openedFilter")
const isOpened = ref(false)
const isShown = computed(() => isOpened.value)
function openFilter() {
  openedFilter!.value = openedFilter!.value === subfiltKey ? "" : subfiltKey
  isOpened.value = !isOpened.value
}
function resetFilter() {
  filterStore.resetFilter(data_type.value, subfiltKey)
}
const isFilterNotEmpty = computed(() => {
  const value = Object.values(data.value.value)
  const defaultValue = Object.values(data.value.defaultValue)
  const disabled = Object.values(data.value.disabled)
  if (value.reduce((prev, next) => prev + next.length, 0) && !defaultValue.reduce((prev, next) => prev + next.length, 0)) {
    return true
  }
  if (disabled.reduce((prev, next) => prev + next.length, 0)) {
    return true
  }
  if (defaultValue.reduce((prev, next) => prev + next.length, 0)) {
    return !value.every((item, ind) => defaultValue[ind].every((v) => item.includes(v)))
  }
  return false
})
function changeNumericValue(e: Event, key: string, ind: number) {
  const eventTarget = e.target as EventTarget & { value?: string }
  if (eventTarget.value === undefined) return
  (filterStore.filterReadyData[data_type.value][subfiltKey] as filterProps & { isDeep: true, selection: "minMax" }).value[key][ind] = eventTarget.value
}
</script>
<template>
  <div class="subfilter">
    <div class="name" @click="openFilter">
      <span>{{ data.name }}</span>
      <FontAwesomeIcon v-if="isFilterNotEmpty" :icon="faBan" beat-fade @click.stop="resetFilter" />
      <RotateTransition :trigger="isShown" angle="-90deg">
        <FontAwesomeIcon :icon="faCaretLeft" />
      </RotateTransition>
    </div>
    <ContainerSlideTransition>
      <template v-if="isShown">
        <div class="options">
          <template v-for="(opt, key) of dataOptions" :key="key">
            <template v-if="data.selection === 'minMax' && ('min' in opt)">
              <span>{{ data.optionsName[key] }} </span>
              <CustomInputComponent :data-value="data.value[key][0]" :min="opt.min" :max="parseInt(data.value[key][1])"
                label-text="От" type="number" :on-change-func="(e) => changeNumericValue(e, key, 0)" />
              <CustomInputComponent :data-value="data.value[key][1]" :min="parseInt(data.value[key][0])" :max="opt.max"
                type="number" :on-change-func="(e) => changeNumericValue(e, key, 1)" label-text="До" />
            </template>
          </template>
        </div>
      </template>
    </ContainerSlideTransition>
  </div>
</template>
<style scoped lang="scss">
.subfilter {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.name {
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, .1);
  border-radius: var(--border-radius);
  align-items: center;
  padding: 0 .5rem;

  & .fa-ban {
    margin: 0 .5rem 0 auto
  }
}

.subFilter {

  &_item {
    border: 1px solid black;
    border-radius: var(--border-radius);
    height: fit-content;
  }
}

.options {
  display: grid;
  grid-template-columns: 1fr repeat(2, auto);
  gap: 10px;
}
</style>