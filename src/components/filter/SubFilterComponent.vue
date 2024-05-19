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
const data = computed(() => filterStore.filterReadyData[dataType.value][subfiltKey] as filterProps & { isDeep: false })
const dataOptions = computed(() => data.value.selection === "minMax" ? [] : data.value.options?.filter((opt) => opt.toLocaleLowerCase().includes(searchOption.value.toLocaleLowerCase())))
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
  if (data.value.isDeep) return false
  if (data.value.value.length && !data.value.defaultValue.length) {
    return true
  }
  if (data.value.disabled.length) {
    return true
  }
  if (data.value.defaultValue.length) {
    return !data.value.value.every((item) => data.value.defaultValue.includes(item.toString()))
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
        <div v-if="data.selection === 'minMax'">
          <label> От
            <input type="number" :min="data.min" :max="data.value[1]" v-model="data.value[0]" />
          </label>
          <label> До
            <input type="number" :min="data.value[0]" :max="data.max" v-model="data.value[1]" />
          </label>
        </div>

        <div v-else class="options">
          <div v-if="data.hasSearch" style="flex-basis: 100%;">
            <input v-model="searchOption" />
          </div>
          <div v-for="opt of dataOptions" :key="opt" class="options_item"
            :class="{ include: data.value.includes(opt), exclude: data.disabled.includes(opt) }"
            @click="changeState(opt)">
            <div>
              {{ data.optionsName?.[opt] ?? opt }}
            </div>
          </div>
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
    width: fit-content;

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
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-start;
  align-content: flex-start;
  overflow-y: auto;
  scrollbar-gutter: stable;
  //border: 1px dotted black;
  padding: 0 .5rem;
  // height: 500px;
  min-height: 1.5rem;
  // max-height: 500px;



  &_item {
    display: flex;
    border: 1px solid black;
    border-radius: var(--border-radius);
    user-select: none;
    padding: 0 .25rem;
    // min-height: min-content;

    &.include {
      background-color: hsl(113, 50%, 50%)
    }

    &.exclude {
      background-color: hsl(0, 100%, 60%)
    }
  }
}
</style>