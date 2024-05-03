<script setup lang="ts">
import { inject, ref, type Ref } from 'vue';
import type { FilterKeys, filterProps, DataRoutes } from "@types"
import { useFilterStore } from "@stores/filter"
import { computed } from "vue";
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
const optionsRefElem = ref()
const searchOption = ref("")
const data = computed(() => filterStore.filterReadyData[dataType.value][subfiltKey] as filterProps)
const dataOptions = computed(() => data.value.options?.filter((opt) => opt.toLocaleLowerCase().includes(searchOption.value.toLocaleLowerCase())))
const openedFilter = inject<Ref<keyof FilterKeys[DataRoutes] | "">>("openedFilter")
const isShown = computed(() => openedFilter!.value === subfiltKey)
function changeState(opt: string) {
    filterStore.changeState(dataType.value, subfiltKey, opt)
}
function openFilter() {
    openedFilter!.value = openedFilter!.value === subfiltKey ? "" : subfiltKey
}
function resetFilter() {
    filterStore.resetFilter(dataType.value, subfiltKey)
}
const isFilterNotEmpty = computed(() => {
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
                <input type="number" :min="data.min" :max="data.value[1]" v-model="data.value[0]" />
                <input type="number" :min="data.value[0]" :max="data.max" v-model="data.value[1]" />
            </div>

            <div v-else class="options" ref="optionsRefElem">
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
</template>
<style scoped lang="scss">
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
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: flex-start;
    align-content: flex-start;
    overflow-y: auto;
    scrollbar-gutter: stable;
    // min-height: 2rem;
    border: 1px dotted black;
    padding: 0 .5rem;
    // min-height: 2rem;
    // height: 0;
    // flex: 1 1 auto;


    &_item {
        display: flex;
        border: 1px solid black;
        user-select: none;
        // min-height: min-content;

        &.include {
            background-color: green;
        }

        &.exclude {
            background-color: red;
        }
    }
}
</style>