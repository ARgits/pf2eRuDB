import type { Data } from "../types";

let importData: { readyData: Data } = {
  readyData: {
    backgrounds: [],
    spells: [],
    actions: [],
    feats: [],
    creatures: [],
    traits: undefined,
    paragraphs: undefined,
    allData: [],
    tables: undefined,
  },
};
const { conditions } = await import("../lib/constants");
if (import.meta.env.PROD) {
  console.log("prod");
  const modules = import.meta.glob("../data/prod/*.json", { import: "default" });
  for (const path in modules) {
    const module = (await modules[path]()) as {};
    const key = Object.keys(module)[0];
    console.log("preping data", module, key);

    importData.readyData[key] = importData.readyData?.[key]
      ? [...importData.readyData?.[key], ...module[key]]
      : module[key];
    if (module[key] instanceof Array) {
      importData.readyData.allData.push(...module[key]);
    }
  }
} else {
  importData = await import("../data/dev/prepareData");
}

console.log(importData);

export const data: Data = importData.readyData;
export const allDataArr: any[] = [
  ...data.allData.map((content) => {
    return { fullName: content.fullName, id: content.id, desc: content.desc };
  }),
  ...conditions,
];
