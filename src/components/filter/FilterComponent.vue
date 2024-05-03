<script setup lang="ts">
import { useFilterStore } from "@stores/filter"
import { computed, provide, ref, watch } from "vue";
import { useRoute } from "vue-router";
import SubFilterComponent from "@components/filter/SubFilterComponent.vue"
import type { DataRoutes, FilterKeys, filterProps } from "@types";
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
            console.log()
        }
        return Object.entries(filterStore.filterReadyData[dataType.value]) as [keyof FilterKeys[DataRoutes], filterProps][]
    }
    else {
        return []
    }
})
if (!filterStore.isDataFetched) {
    filterStore.fetchData().then(() => {
        if (import.meta.env.DEV)
            console.log()
    })
}
</script>
<template>
    <div class="filter_main">
        <div class="container">
            <SubFilterComponent v-for="[key, subfilt] in filterDataComp" :key="dataType + subfilt.name"
                :subfiltKey="key" />
        </div>
    </div>
</template>
<style scoped lang="scss">
div.filter_main {
    flex-basis: 30%;
    display: flex;
    flex-direction: column;
    padding: 5px;
    flex-shrink: 0;
    border: 1px solid black;
    border-radius: var(--border-radius)
}

.container {
    flex: 1 1 auto;
    height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

@media (max-aspect-ratio:1/1) {
    div.filter_main {
        position: absolute;
        flex-basis: 100%;
        width: calc(100% - 4rem);
        height: 100%;
        transition: opacity .5s ease;

        &.hidden {
            flex-basis: 0;
            z-index: -1;
            opacity: 0 // display: none;
        }
    }
}
</style>