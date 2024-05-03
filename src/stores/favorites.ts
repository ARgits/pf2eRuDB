import type { DataRoutes, generalContent } from "@types";
import { defineStore } from "pinia";
import { computed, ref, type Ref } from "vue";
import { useContentStore } from "./content";

export const useFavoritesStore = defineStore("favorites", () => {
    const localStorageRef: Ref<({ id: generalContent["id"], type: generalContent["dataType"] } | generalContent["id"])[]> = ref(localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")!) : [])

    const data = computed(() => {
        const contentStore = useContentStore()
        const result: Record<DataRoutes, generalContent[]> = {
            actions: [],
            backgrounds: [],
            creatures: [],
            feats: [],
            spells: [],
        }

        if (localStorage && contentStore.isDataFetched && localStorageRef.value.length) {
            for (const val of localStorageRef.value) {
                if (typeof val === 'string') {
                    const typeMatch = val.match(/(spell-)|(feat-)|(action-)|(bg-)|(bestiary-)/g)?.[0].replace("-", "") as "spell" | "feat" | "action" | "bg" | "bestiary" | undefined
                    if (typeMatch) {
                        const type = typeMatch === "bestiary" ? "creatures" : typeMatch === 'bg' ? "backgrounds" : `${typeMatch}s` as const
                        const item = contentStore.contentData[type].find((v) => v.id === val)
                        if (item)
                            result[type].push(item)
                    }
                } else {
                    const { id, type } = val
                    console.log(type,)
                    const item = contentStore.contentData[`${type}s`].find((v) => v.id === id)
                    if (item)
                        result[`${type}s`].push(item)
                }
            }

        }
        if (import.meta.env.DEV) {
            console.log('Favorites created')
        }
        return result
    })
    function hasItemById(itemId: generalContent["id"]) {
        return localStorageRef.value.find((v) => {
            if (typeof v === "string") {
                return v === itemId
            } else {
                return v.id === itemId
            }
        })
    }
    function addRemoveItem(itemId: generalContent["id"], type: generalContent["dataType"]) {
        if (localStorage) {
            const index = localStorageRef.value.findIndex((val) => {
                if (typeof val === "string") {
                    return val === itemId
                } else return val.id === itemId
            })
            if (index === -1) {

                localStorageRef.value.push({ id: itemId, type })
                if (import.meta.env.DEV) {
                    console.log('Favorite add item')
                }
            } else {
                localStorageRef.value.splice(index, 1)
                if (import.meta.env.DEV) {
                    console.log('Favorites remove item')
                }
            }
            localStorage.setItem("favorites", JSON.stringify(localStorageRef.value))
        }
    }
    return { data, addRemoveItem, hasItemById }

})