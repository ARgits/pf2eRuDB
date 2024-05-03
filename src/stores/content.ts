import { defineStore } from "pinia"
import { computed, reactive, ref, watch, type Ref, } from "vue"
import type { Data, DataRoutes, Entries, generalContent } from "@types"
import { useFilterStore } from "./filter"
import { useRoute } from "vue-router"
import { useFavoritesStore } from "./favorites"

export const useContentStore = defineStore("content", () => {
    const contentData = reactive({}) as Pick<Data, "actions" | "backgrounds" | "creatures" | "feats" | "spells">
    const importedPaths: string[] = []
    const isContentDataFetched = ref(false)
    const route = useRoute()
    const searchItem = ref("")
    const sortBy: Ref<"0" | "1" | "2" | "3" | "4" | "5" | "6"> = ref("1")
    const filteredData = computed(() => {
        const filterStore = useFilterStore()
        if (!filterStore.isDataFetched || !isContentDataFetched.value) return []
        // console.log(route.path)
        const dataType = (route.name! as String).includes('favorite') ? (route.name as String).replace('favorite', '').toLocaleLowerCase() as DataRoutes : route.name as DataRoutes
        const filterSubData = filterStore.filterReadyData[dataType]
        const notEmptyFilters = Object.entries(filterSubData).filter(([_, filt]) => filt.value.length !== 0 || filt.disabled.length !== 0) as Entries<typeof filterSubData>
        const numOfFilters = notEmptyFilters.length
        const data = (route.name! as String).includes('favorite') ? useFavoritesStore().data[dataType] : contentData[dataType]
        if (import.meta.env.DEV) {
            console.log('numOfFilters: ', numOfFilters)
        }
        if (numOfFilters === 0 && searchItem.value === "") return data.sort(sortByNameAndLevel)
        // console.log(numOfFilters)
        const result = data.filter((content) => {
            if (!content.fullName.toLocaleLowerCase().includes(searchItem.value.toLocaleLowerCase())) return 0
            let numOfMatches: number = 0
            for (const [key, val] of notEmptyFilters) {
                switch (val.selection) {
                    case "singleRadio": {
                        const item = content[key].toString()
                        if (val.disabled.includes(item)) return 0
                        numOfMatches += val.value.includes(item) || val.value.length === 0 ? 1 : 0
                        break
                    }
                    case "multipleRadio": {
                        const item = content[key].flat()
                        if (val.disabled.some((str) => item.includes(str))) return 0
                        numOfMatches += val.value.some((str) => item.includes(str)) || val.value.length === 0 ? 1 : 0
                        break
                    }
                    case "minMax": {
                        const item = content[key] as unknown as number
                        numOfMatches += item >= parseInt(val.value[0]) && item <= parseInt(val.value[1]) ? 1 : 0
                        break
                    }
                }
            }
            if (numOfMatches === numOfFilters) return 1
            return 0
        })
        return result.sort(sortByNameAndLevel)
    })
    function sortByNameAndLevel(a: generalContent, b: generalContent) {
        switch (sortBy.value) {
            case "0": {
                return 0
            }
            case "1": {
                if (!("level" in a) || !("level" in b)) return 0
                return a.level - b.level
            }
            case "2": {
                if (!("level" in a) || !("level" in b)) return 0
                return b.level - a.level
            }
            case "3": {
                return a.name.localeCompare(b.name)
            }
            case "4": {
                return b.name.localeCompare(a.name)
            }
            case "5": {
                return a.originalName.localeCompare(b.originalName)
            }
            case "6": {
                return b.originalName.localeCompare(a.originalName)
            }
        }
    }
    async function fetchData() {
        const modules = import.meta.glob(["@data/prod/*.json", "!**/filter*.json"], { import: 'default' })
        for (const path in modules) {

            if (!importedPaths.includes(path)) {
                // console.log(path)
                const module = await modules[path]() as Partial<Pick<Data, "actions" | "backgrounds" | "creatures" | "feats" | "spells">>
                const key = Object.keys(module)[0] as keyof Pick<Data, "actions" | "backgrounds" | "creatures" | "feats" | "spells">
                //@ts-ignore
                contentData[key] = contentData[key] ? [...contentData[key], ...module[key]] : [...module[key]]
                importedPaths.push(path)
            }
        }
        console.log('done')
        isContentDataFetched.value = true
        console.log(contentData)
    }

    watch(route, () => sortBy.value = "0")
    watch(sortBy, () => console.log(sortBy.value))
    return { contentData, fetchData, filteredData, searchItem, isDataFetched: isContentDataFetched, sortBy }
})