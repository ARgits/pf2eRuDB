import { defineStore } from "pinia"
import { computed, reactive, ref, watch, type Ref, } from "vue"
import type { Data, DataRoutes, Entries, actionType, ancestryType, backgroundType, creatureType, featType, generalContent, spellType } from "@types"
import { useFilterStore } from "./filter"
import { useRoute } from "vue-router"
import { useFavoritesStore } from "./favorites"

export const useContentStore = defineStore("content", () => {
    const contentData = reactive({
        actions: [] as actionType[],
        ancestries: [] as ancestryType[],
        backgrounds: [] as backgroundType[],
        creatures: [] as creatureType[],
        feats: [] as featType[],
        spells: [] as spellType[]
    }) as Record<DataRoutes, generalContent[]>
    const globalIndex = reactive({}) as Record<generalContent["id"], generalContent>
    const importedPaths: string[] = []
    const isContentDataFetched = ref(false)
    const route = useRoute()
    const searchItem = ref("")
    const sortBy: Ref<"1" | "2" | "3" | "4" | "5" | "6"> = ref("3")
    const filteredData = computed(() => {
        const filterStore = useFilterStore()
        console.log(route.name)
        const dataType = (route.name! as String).includes('favorite') ? (route.name as String).replace('favorite', '').toLocaleLowerCase() as DataRoutes : route.name as DataRoutes
        if (!filterStore.isDataFetched || !isFetchedByKey.value[dataType]) return []
        // console.log(route.path)

        const data = (route.name! as String).includes('favorite') ? useFavoritesStore().data[dataType] : contentData[dataType]
        const filterSubData = filterStore.filterReadyData[dataType]
        if (!filterSubData) return data.sort(sortByNameAndLevel)
        const notEmptyFilters = Object.entries(filterSubData).filter(([_, filt]) => {
            if (filt.isDeep) {
                return true
            }
            return filt.value.length !== 0 || filt.disabled.length !== 0
        }) as Entries<typeof filterSubData>
        const numOfFilters = notEmptyFilters.length
        if (import.meta.env.DEV) {
            console.log('numOfFilters: ', numOfFilters, notEmptyFilters)
        }
        if (numOfFilters === 0 && searchItem.value === "") return data.sort(sortByNameAndLevel)
        // console.log(numOfFilters)
        const result = data.filter((content) => {
            if (!content.fullName.toLocaleLowerCase().includes(searchItem.value.toLocaleLowerCase())) return 0
            let numOfMatches: number = 0
            for (const [key, val] of notEmptyFilters) {
                switch (val.selection) {
                    case "singleRadio": {
                        if (val.isDeep) {
                            for (const [optKey, optVal] of Object.entries(val.value)) {
                                const item = (content[key] as unknown as Record<string, string>)[optKey]
                                numOfMatches += optVal.includes(item) || val.value[optKey].length === 0 ? 1 : 0
                            }
                        }
                        else {
                            const item = content[key].toString()
                            if (val.disabled.includes(item)) return 0
                            numOfMatches += val.value.includes(item) || val.value.length === 0 ? 1 : 0
                        }
                        break
                    }
                    case "multipleRadio": {
                        if (val.isDeep) {
                            //
                        }
                        else {
                            if (content[key] === undefined) {
                                console.log(key, content)
                            }

                            const item = content[key].flat()
                            if (val.disabled.some((str) => item.includes(str))) return 0
                            numOfMatches += val.value.some((str) => item.includes(str)) || val.value.length === 0 ? 1 : 0
                        }
                        break
                    }
                    case "minMax": {
                        if (val.isDeep) {
                            const items = content[key] as unknown as Record<string, number>
                            numOfMatches += Object.entries(val.value).every(([key, subValue]) =>
                                items[key] >= parseInt(subValue[0]) && items[key] <= parseInt(subValue[1])
                            ) ? 1 : 0
                        }
                        else {
                            const item = content[key] as unknown as number
                            numOfMatches += item >= parseInt(val.value[0]) && item <= parseInt(val.value[1]) ? 1 : 0
                        }
                        break
                    }
                }
            }
            if (numOfMatches === numOfFilters) return 1
            return 0
        })
        return result.sort(sortByNameAndLevel)
    })
    const numOfItems = computed(() => filteredData.value.length)
    function sortByNameAndLevel(a: generalContent, b: generalContent) {
        switch (sortBy.value) {
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
        console.log(route.name)
        const modules = import.meta.glob(["@data/prod/*.json", "!**/filter*.json"], { import: 'default' })
        for (const path in modules) {
            if (!importedPaths.includes(path)) {
                // console.log(path)
                const module = await modules[path]() as typeof contentData
                const key = Object.keys(module)[0] as keyof Pick<Data, "actions" | "backgrounds" | "creatures" | "feats" | "spells">
                addItems(key, module[key])
                importedPaths.push(path)
            }
        }
        console.log('done')
        isContentDataFetched.value = true
        console.log(contentData)
    }
    const maxLengthContent = {
        actions: 192,
        backgrounds: 220,
        ancestries: 35,
        creatures: 680,
        feats: 3784,
        spells: 1091,
    }
    const isFetchedByKey = computed(() => {
        return {
            actions: contentData['actions'].length === maxLengthContent["actions"],
            backgrounds: contentData["backgrounds"].length === maxLengthContent["backgrounds"],
            ancestries: contentData["ancestries"].length === maxLengthContent["ancestries"],
            creatures: contentData['creatures'].length === maxLengthContent["creatures"],
            feats: contentData['feats'].length === maxLengthContent["feats"],
            spells: contentData['spells'].length === maxLengthContent["spells"],
        }
    })
    function addItems(dataType: DataRoutes, items: generalContent[]) {
        if (!contentData[dataType]) {
            contentData[dataType] = []
        }
        contentData[dataType].push(...items)
        for (const item of items) {
            globalIndex[item.id] = item
        }
    }

    watch(route, () => sortBy.value = "3")
    return { contentData, fetchData, filteredData, searchItem, isDataFetched: isContentDataFetched, sortBy, isFetchedByKey, numOfItems, globalIndex, maxLengthContent }
})