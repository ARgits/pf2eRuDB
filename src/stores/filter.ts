import { defineStore, storeToRefs } from "pinia";
import { reactive, ref, watch, type Ref } from "vue";
import { type DataRoutes, type Entries, type FilterKeys, type globalFilter, } from "@/types"
import { useRoute } from "vue-router";
import { useFavoritesStore } from "./favorites";

export const useFilterStore = defineStore('filter', () => {
    const filterStaticData: Partial<globalFilter> = reactive({})
    const filterReadyData = ref({}) as Ref<globalFilter>
    const importedPaths: string[] = []
    const isDataFetched = ref(false)
    const route = useRoute()
    const { data } = storeToRefs(useFavoritesStore())
    setFilterData()
    function setFilterData() {
        if (import.meta.env.DEV) {
            console.log('Set filterData:begin')
        }
        if (!isDataFetched.value) return {
            backgrounds: {},
            actions: {},
            spells: {},
            feats: {},
            creatures: {},
        } as Record<DataRoutes, Partial<globalFilter[DataRoutes]>>
        if (import.meta.env.DEV) {
            console.log('Set filterData:data fetched')
        }
        if (!route.fullPath.includes('favorite')) {
            if (import.meta.env.DEV) {
                console.log('Set filterData: use static data')
            }
            filterReadyData.value = { ...filterStaticData } as globalFilter
        }
        else {
            const favFiltData: Record<DataRoutes, Partial<globalFilter[DataRoutes]>> = {
                backgrounds: {},
                actions: {},
                spells: {},
                feats: {},
                creatures: {},
            }
            if (import.meta.env.DEV) {
                console.log('Set filterData: favorites data', data)
            }
            for (const [dataKey, dataVal] of Object.entries(filterStaticData as globalFilter) as Entries<globalFilter>) {
                if (data.value[dataKey].length > 1) {
                    for (const [filtKey, filtData] of Object.entries(dataVal) as Entries<typeof dataVal>) {
                        console.log(filtKey, filtData)
                        if (filtData.selection === "minMax") {
                            const min = Math.min(...data.value[dataKey].map((v) => v[filtKey] as unknown as number))
                            const max = Math.max(...data.value[dataKey].map((v) => v[filtKey] as unknown as number))
                            favFiltData[dataKey][filtKey] = { ...filtData, min, max }
                        } else if (filtData.selection === "multipleRadio") {
                            const options = filtData.options?.filter((opt) => data.value[dataKey].some((v) => v[filtKey].includes(opt)))
                            if (options.length > 1) {
                                favFiltData[dataKey][filtKey] = { ...filtData, options }
                            }
                        } else if (filtData.selection === "singleRadio") {
                            const options = filtData.options?.filter((opt) => data.value[dataKey].some((v) => v[filtKey].toString() === opt))
                            if (options.length > 1) {
                                favFiltData[dataKey][filtKey] = { ...filtData, options }
                            }
                        }
                    }
                }
            }
            filterReadyData.value = { ...favFiltData } as globalFilter
            if (import.meta.env.DEV) {
                console.log('Set filterData: use favorites data', filterReadyData.value)
            }
        }

        return filterReadyData.value
    }
    watch([route, isDataFetched, data], () => {
        setFilterData()
    })
    async function fetchData() {
        const modules = import.meta.glob("@data/prod/filter-*.json", { import: 'default' })
        for (const path in modules) {
            if (!importedPaths.includes(path)) {
                const module = await modules[path]() as Partial<globalFilter>
                const key = Object.keys(module)[0] as keyof globalFilter
                console.log(module, key, filterStaticData)
                //@ts-ignore
                filterStaticData[key] = filterStaticData[key] ? { ...filterStaticData[key], ...module[key] } : module[key]!
                importedPaths.push(path)
            }
        }
        console.log('Fetch data filters: done')
        isDataFetched.value = true
    }

    function changeState(dataType: keyof globalFilter, subFiltKey: keyof FilterKeys[keyof globalFilter], opt: string) {
        const data = filterReadyData.value[dataType]

        if (filterReadyData.value[dataType][subFiltKey].value.includes(opt)) {
            const index = filterReadyData.value[dataType][subFiltKey].value.findIndex(val => val === opt)
            filterReadyData.value[dataType][subFiltKey].value.splice(index, 1)
            data[subFiltKey].disabled.push(opt)
        }
        else if (filterReadyData.value[dataType][subFiltKey].disabled.includes(opt)) {
            const index = filterReadyData.value[dataType][subFiltKey].disabled.findIndex(val => val === opt)
            filterReadyData.value[dataType][subFiltKey].disabled.splice(index, 1)
        }
        else {
            filterReadyData.value[dataType][subFiltKey].value.push(opt)
        }
    }
    function resetFilter(dataType: keyof globalFilter, filterKey: keyof FilterKeys[keyof globalFilter]) {
        filterReadyData.value[dataType][filterKey].value = [...filterReadyData.value[dataType][filterKey].defaultValue]
        filterReadyData.value[dataType][filterKey].disabled = []
    }
    // watch(filterData, () => console.log(filterData), { deep: true })
    return { filterStaticData, filterReadyData, fetchData, changeState, isDataFetched, resetFilter }
})