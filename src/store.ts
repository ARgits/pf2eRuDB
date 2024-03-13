import { derived, writable, type Writable } from "svelte/store";
import { changeUrlOnFilter, obj } from "./lib/filter/filterData";
import type { backgroundFilter, featFilter, spellsFilter, actionFilter, Data, TableData, generalContent } from "./types";
import { onDestroy } from "svelte";
function createDataStore() {
  const obj = {
    feats: [],
    spells: [],
    backgrounds: [],
    actions: [],
  };
  const isExported = {
    spells: false,
    backgrounds: false,
    feats: false,
    actions: false,
  };
  const paths = [];
  const { subscribe, set, update } = writable(obj);
  const getData = async () => {
    console.log("getData");
    const modules = import.meta.glob(["./data/prod/*.json", "!**/filter*.json"], { import: "default" });
    // let tempKey;
    await importModules(modules);
  };

  const getKeyData = async (key: string) => {
    if (isExported[key]) return true;
    let modules;
    switch (key) {
      case "spells":
        modules = import.meta.glob("./data/prod/spells-*.json", { import: "default" });
        break;
      case "feats":
        modules = import.meta.glob("./data/prod/feats-*.json", { import: "default" });
        break;
      case "backgrounds":
        modules = import.meta.glob("./data/prod/backgrounds-*.json", { import: "default" });
        break;
      case "actions":
        modules = import.meta.glob("./data/prod/actions-*.json", { import: "default" });
        break;
    }
    await importModules(modules);
  };
  async function importModules(modules) {
    for (const path in modules) {
      if (!paths.includes(path)) {
        paths.push(path);
        const module = await modules[path]();
        const key = Object.keys(module)[0];
        if (obj[key])
          update((value) => {
            value[key].push(...module[key]);
            return value;
          });
      }
    }
  }
  return {
    subscribe,
    getData,
    update,
    getKeyData,
  };
}
export const filters = writable({
  backgrounds: obj["backgrounds"] as backgroundFilter,
  feats: obj["feats"] as featFilter,
  spells: obj["spells"] as spellsFilter,
  actions: obj["actions"] as actionFilter,
});
export const currentTab = writable("backgrounds") as Writable<keyof TableData>;
export function watch(deps, fn) {
  const unsubscribe = derived(deps, (values) => values).subscribe(fn);
  onDestroy(unsubscribe);
}

export const dataStore = createDataStore();
export const allData = derived(dataStore, ($dataStore) => {
  const arr = [];
  for (const val of Object.values($dataStore)) {
    arr.push(...val);
  }
  return arr;
});
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
/**
 * У нас должен быть 1 store "исходный"
 * derived stores в svelte позволяют зависеть от нескольких store одновременно
 * соответственно мы можем сделать derived store, зависящий от "исходного" store и от store с фильтрами
 */
