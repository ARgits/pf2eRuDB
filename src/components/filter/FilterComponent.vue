<script setup lang="ts">
import { useFilterStore } from "@stores/filter"
import { computed, provide, ref, watch } from "vue";
import { useRoute } from "vue-router";
import SubFilterComponent from "@components/filter/SubFilterComponent.vue"
import type { DataRoutes, FilterKeys, filterProps } from "@types";
import DeepSubFilterComponent from "@components/filter/DeepSubFilterComponent.vue";

const filterStore = useFilterStore()
const route = useRoute()
const openedFilter = ref("")
provide("openedFilter" as keyof FilterKeys[DataRoutes], openedFilter)
watch(route, () => openedFilter.value = "")
const dataType = computed(() => {
  return route.fullPath.includes('favorites') ? route.fullPath.split('/')[2] as DataRoutes : route.path.replace('/', '') as DataRoutes
})
const filterDataComp = computed(() => {
  if (filterStore.isDataFetched) {
    if (import.meta.env.DEV) {
      console.log(filterStore.filterReadyData)
    }
    return Object.entries(filterStore.filterReadyData[dataType.value]) as [keyof FilterKeys[DataRoutes], filterProps][]
  } else {
    return []
  }
})
</script>
<template>
  <div class="filter_main" v-if="filterDataComp.length">
    <div class="container">
      <template v-for="[key, subfilt] in filterDataComp" :key="dataType + subfilt.name">
        <SubFilterComponent v-if="!subfilt.isDeep" :subfiltKey="key"></SubFilterComponent>
        <DeepSubFilterComponent v-else :subfiltKey="key"></DeepSubFilterComponent>
      </template>

    </div>
  </div>
</template>
<style scoped lang="scss">
div.filter_main {
  flex-basis: 30%;
  display: flex;
  gap: 10px;
  flex-direction: column;
  padding: 5px;
  flex-shrink: 0;
  border: 1px solid black;
  border-radius: var(--border-radius);

}

.container {
  flex: 1 1 auto;
  height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (max-aspect-ratio: 1/1) {
  div.filter_main {
    flex: 1 1 auto;
    height: 0px;
    transition: opacity .5s ease;
    overflow-y: auto
  }
}
</style>