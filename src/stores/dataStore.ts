import { writable, derived } from "svelte/store";

function createDataStore() {
    const obj = {
        feats: [],
        spells: [],
        backgrounds: [],
        actions: [],
        creatures: []
    };
    const paths = [];
    const { subscribe, set, update } = writable(obj);
    const getData = async () => {
        console.log("getData");
        const modules = import.meta.glob(["@data/prod/*.json", "!**/filter*.json"], { import: "default" });
        // let tempKey;
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
                        value[key].push(...module[key])
                        return value;
                    });
            }
        }
    }
    return {
        subscribe,
        getData,
        update,
    };
}
export const dataStore = createDataStore();
export const allData = derived(dataStore, ($dataStore) => {
    const arr = [];
    for (const val of Object.values($dataStore)) {
        arr.push(...val);
    }
    return arr;
});