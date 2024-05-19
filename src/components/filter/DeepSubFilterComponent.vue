<script setup lang="ts">
import { computed, inject, type Ref, ref } from 'vue';
import type { DataRoutes, FilterKeys, filterProps } from "@types"
import { useFilterStore } from "@stores/filter"
import { useRoute } from "vue-router";
import ContainerSlideTransition from "@components/transitions/ContainerSlideTransition.vue"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBan, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import RotateTransition from '@components/transitions/RotateTransition.vue';

const filterStore = useFilterStore()
const route = useRoute()
const { subfiltKey } = defineProps<{ subfiltKey: keyof FilterKeys[DataRoutes] }>()
const dataType = computed(() => {
  return route.fullPath.includes('favorites') ? route.fullPath.split('/')[2] as DataRoutes : route.path.replace('/', '') as DataRoutes
})
const searchOption = ref("")
const data = computed(() => filterStore.filterReadyData[dataType.value][subfiltKey] as filterProps & { isDeep: true })
const dataOptions = computed(() => data.value.options)
const openedFilter = inject<Ref<keyof FilterKeys[DataRoutes] | "">>("openedFilter")
// const isShown = computed(() => openedFilter!.value === subfiltKey)
const isOpened = ref(false)
const isShown = computed(() => isOpened.value)

function changeState(opt: string) {
  filterStore.changeState(dataType.value, subfiltKey, opt)
}

function openFilter() {
  openedFilter!.value = openedFilter!.value === subfiltKey ? "" : subfiltKey
  isOpened.value = !isOpened.value
}

function resetFilter() {
  filterStore.resetFilter(dataType.value, subfiltKey)
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
</script>
<template>
  <div class="subfilter">
    <div class="name" @click="openFilter">
      <span>{{ data.name }}</span>
      <FontAwesomeIcon :icon="faBan" v-if="isFilterNotEmpty" @click.stop="resetFilter" beat-fade></FontAwesomeIcon>
      <RotateTransition :trigger="isShown" angle="-90deg">
        <FontAwesomeIcon :icon="faCaretLeft"></FontAwesomeIcon>
      </RotateTransition>
    </div>
    <ContainerSlideTransition>
      <template v-if="isShown">
        <div class="options">
          <template v-for="(opt, key) of dataOptions" :key="key">
            <template v-if="data.selection === 'minMax' && ('min' in opt)">
              <span>{{ data.optionsName[key] }} </span>
              <label> От
                <input type="number" :min="opt.min" :max="data.value[key][1]" v-model="data.value[key][0]"
                  @change="console.log(data, data.value[key])" />
              </label>
              <label> До
                <input type="number" :min="data.value[key][0]" :max="opt.max" v-model="data.value[key][1]"
                  @change="console.log(data, data.value[key])" />
              </label>
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

label {
  padding: 0 .25rem;
  border: 1px solid black;
  border-radius: var(--border-radius);
  font-family: "Times New Roman", serif;

  &:not(:first-child) {
    margin-left: 10px;
  }

  &:focus-within {
    border-color: darkorange;
  }

  & input {
    background-color: unset;
    border: none;
    width: 2.5em;

    &:focus,
    &:focus-visible {
      border: none;
      outline: none;
    }
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