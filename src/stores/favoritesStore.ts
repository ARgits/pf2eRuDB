import { writable, derived } from "svelte/store";
import type { generalContent } from "../types";
import { dataStore } from "./dataStore";

function createFavoriteStore() {
    if (localStorage) { console.log('localStorage есть', localStorage) }
    const { subscribe, set, update } = writable(JSON.parse(localStorage.getItem('favorites')) ?? [] as generalContent["id"][]);
    function setFavorite(contentId: generalContent["id"]) {
        update((value) => {
            const index = value.findIndex((item) => item === contentId)
            if (index === -1) {
                localStorage.setItem('favorites', JSON.stringify([...value, contentId]))
                return [...value, contentId]
            }
            value.splice(index, 1)
            localStorage.setItem('favorites', JSON.stringify(value))
            return value
        })
    }
    return {
        subscribe,
        update,
        setFavorite
    };
}
export const favoritesStore = createFavoriteStore()
export const favoriteItems = derived([dataStore, favoritesStore], ([$data, $favorites]) => {
    const objData = {
        spells: $data.spells.filter((v) => $favorites.includes(v.id)),
        backgrounds: $data.backgrounds.filter((v) => $favorites.includes(v.id)),
        feats: $data.feats.filter((v) => $favorites.includes(v.id)),
        actions: $data.actions.filter((v) => $favorites.includes(v.id)),
    } as const
    let favoriteTabNameTemp: keyof typeof objData | ""
    const favoriteTabNameSub = favoriteTabName.subscribe((val: keyof typeof objData) => { favoriteTabNameTemp = val })
    if (favoriteTabNameTemp === "") {
        favoriteTabNameTemp = (Object.keys(objData) as (keyof typeof objData)[]).filter((v) => objData[v].length !== 0)?.[0] ?? ""
    } else {
        favoriteTabNameTemp = objData[favoriteTabNameTemp].length ? favoriteTabNameTemp : (Object.keys(objData) as (keyof typeof objData)[]).filter((v) => objData[v].length !== 0)?.[0] ?? ""
    }
    favoriteTabName.set(favoriteTabNameTemp)
    favoriteTabNameSub()
    return {
        spells: $data.spells.filter((v) => $favorites.includes(v.id)),
        backgrounds: $data.backgrounds.filter((v) => $favorites.includes(v.id)),
        feats: $data.feats.filter((v) => $favorites.includes(v.id)),
        actions: $data.actions.filter((v) => $favorites.includes(v.id)),
    }
});
export const favoriteTabName = writable("")
