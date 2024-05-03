import { defineStore, storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useContentStore } from "./content";
import { useRoute } from "vue-router";
import { useFavoritesStore } from "./favorites";
import type { DataRoutes } from "@types";

export const usePaginationStore = defineStore("pagination", () => {
    const currentPage = ref(0)
    const itemsPerPage = ref(50)
    const route = useRoute()
    const { filteredData } = storeToRefs(useContentStore())
    function changePage(numOfPage: number) {
        if (numOfPage < 0) {
            currentPage.value = 0
            return
        }
        if (numOfPage >= numOfPages.value) {
            currentPage.value = numOfPages.value - 1
            return
        }
        currentPage.value = numOfPage
    }
    const numOfPages = computed(() => {
        if (route.fullPath.includes('favorites')) {
            const favoriteStore = useFavoritesStore()
            const dataType = route.fullPath.split('/')[2] as DataRoutes
            return Math.ceil(favoriteStore.data[dataType].length / itemsPerPage.value)
        }
        const contentStore = useContentStore()
        if (contentStore.isDataFetched) {
            return Math.ceil(contentStore.filteredData.length / itemsPerPage.value)
        }
        return 1
    })
    //creates array of "page buttons", that looks like this (example) "1 2 ... 4 5 6 ... 11 12"
    const pages = computed(() => {
        if (numOfPages.value > 1) {
            const result: (number | "...")[] = []
            const lowNumberFromCurrent = currentPage.value - 2
            const highNumberFromCurrent = currentPage.value + 2
            for (let i = 0; i < numOfPages.value; i++) {
                if (i === 0 || i === 1 || i === numOfPages.value - 1 || i === numOfPages.value - 2) {
                    result.push(i)
                } else if (i >= lowNumberFromCurrent && i <= highNumberFromCurrent && !result.includes(i)) {
                    result.push(i)
                } else {
                    const tempInd = [...result].reverse().findIndex((v) => v === "...")
                    const ind = result.length - 1 - tempInd
                    if (tempInd === -1 || ind !== result.length - 1) {
                        result.push("...")
                    }

                }

            }
            return result
        }
        return []
    })
    watch([route, filteredData], () => { console.log(route); currentPage.value = 0 })
    return { currentPage, itemsPerPage, numOfPages, changePage, pages }
})