// import { dataStore } from "../store";
// import { get } from "svelte/store";
// const data = get(dataStore)
// export async function getData(key: string) {
//   if (data[key].length) return;
//   let modules;
//   switch (key) {
//     case "backgrounds":
//       modules = import.meta.glob("../data/prod/backgrounds-*.json", { import: "default" });
//       break;
//     case "spells":
//       modules = import.meta.glob("../data/prod/spells-*.json", { import: "default" });
//       break;
//     case "feats":
//       modules = import.meta.glob("../data/prod/feats-*.json", { import: "default" });
//       break;
//     case "actions":
//       modules = import.meta.glob("../data/prod/actions-*.json", { import: "default" });
//       break;
//   }
//   for (const path in modules) {
//     const module = (await modules[path]()) as {};
//     const key = Object.keys(module)[0];
//     console.log("prepping data", module, key);
//     dataStore.update((value) => {
//       value[key].push(...module[key]);
//       return value;
//     });
//     // console.log(get(dataStore))
//   }
// }
