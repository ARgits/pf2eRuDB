import { writable, derived, } from "svelte/store";
import { favoriteItems } from "@stores/favoritesStore";
import { favoriteTabName } from "@stores/favoritesStore";
export function getWindowWidth() {
    const appWidth = document.querySelector('#app').clientWidth
    const paddingWidth = getComputedStyle(document.querySelector("#app")).padding
    // biome-ignore lint/style/useNumberNamespace: <explanation>
    return appWidth - parseInt(paddingWidth) * 2
}
export const windowWidthStore = writable(getWindowWidth())
export const masonryLayoutForFavorites = derived([favoriteItems, favoriteTabName, windowWidthStore], ([items, tabName, winWidth]) => {
    if (!items[tabName]?.length) return [];
    const maxChildWidth = 300
    console.log(items[tabName]);
    const favoritesContainer = document.querySelectorAll(".favorite_item");
    console.log("больше 1 элемента и элементы не влезают");
    const childrenWidthSum =
        [...favoritesContainer].reduce(
            (prev, next) => prev + next.clientWidth + 10,
            favoritesContainer[0]?.clientWidth || 0,
        ) || items[tabName].length * maxChildWidth
    console.log(childrenWidthSum, winWidth);
    if (childrenWidthSum <= winWidth) {
        return [[...items[tabName]]];
    }
    console.log("потомки длинее родителя", childrenWidthSum, winWidth);
    // const maxChildWidth = parseInt(getComputedStyle(favoritesContainer[0]).maxWidth);
    const numOfColumns = Math.floor((childrenWidthSum * 1.1 / winWidth));
    console.log("число колонок", numOfColumns);
    const columns = Array.from({ length: numOfColumns }, (e) => []);
    console.log(items[tabName].slice().sort((a, b) => a.desc.length - b.desc.length).map((val) => val.desc.length))
    for (const [index, content] of items[tabName].entries()) {
        const columnsByContentLength: number[] = columns.map((val) => val.reduce((prev, next) => prev + next.desc.length, 0))
        const minColumn = columnsByContentLength.findIndex((v) => v === Math.min(...columnsByContentLength))
        columns[minColumn].push(content)
    }
    return [...columns];
})