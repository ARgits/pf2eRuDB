import { encode } from "js-base64";
import type { Entries, TableData, filterProps, filterUnion } from "../../types";
import { writable } from "svelte/store";
import { data } from "../getData";
const {
  actionOptions,
  attributeValueOptions,
  castingTypeOptions,
  levelOneToTen,
  levelOneToTventy,
  rarityOptions,
  spellTraditionOptions,
  spellTypeOptions,
} = await import("../constants");
//import * as data from "../assets/data.json";
//export const readyData = prepareData(data);
//console.log(readyData);
//
//individual filters
//
const rarity: filterProps = {
  name: "Редкость",
  value: [],
  selection: "singleRadio",
  options: rarityOptions,
  disabled: [],
  excluded: [],
  hasSearch: false,
  search: "",
  defaultValue: [],
};
const action: filterProps = {
  name: "Действие",
  selection: "singleRadio",
  value: [],
  options: actionOptions,
  disabled: [],
  excluded: [],
  hasSearch: false,
  search: "",
  defaultValue: [],
};
const attributeValue: filterProps = {
  name: "Повышение характеристики",
  selection: "multipleRadio",
  value: [],
  options: attributeValueOptions,
  disabled: [],
  excluded: [],
  hasSearch: false,
  search: "",
  defaultValue: [],
  multiply: false,
};
const featTraits: filterProps = {
  name: "Признаки",
  selection: "multipleRadio",
  value: [],
  disabled: [],
  excluded: [],
  multiply: false,
  options: [
    ...new Set(
      data.feats
        .map((content) => content.traits)
        .flat()
        .filter((content) => content !== "")
    ),
  ],
  search: "",
  hasSearch: true,
  defaultValue: [],
};
const featLevel: filterProps = {
  name: "Уровень",
  selection: "minMax",
  value: ["1", "20"],
  disabled: [],
  excluded: [],
  options: levelOneToTventy,
  hasSearch: false,
  search: "",
  defaultValue: ["1", "20"],
};
const archetype: filterProps = {
  name: "Архетип",
  selection: "singleRadio",
  value: [],
  defaultValue: [],
  disabled: [],
  excluded: [],
  options: [
    ...new Set(
      data.feats
        .map((content) => content.archetype)
        .flat()
        .filter((content) => content !== "")
    ),
  ],
  hasSearch: true,
  search: "",
};
const spellType: filterProps = {
  name: "Тип",
  selection: "singleRadio",
  value: [],
  excluded: [],
  disabled: [],
  options: spellTypeOptions,
  hasSearch: false,
  search: "",
  defaultValue: [],
};
const spellLevel: filterProps = {
  name: "Уровень",
  selection: "singleRadio",
  value: [],
  options: levelOneToTen,
  disabled: [],
  excluded: [],
  hasSearch: false,
  search: "",
  defaultValue: [],
};
const tradition: filterProps = {
  name: "Традиция",
  selection: "multipleRadio",
  value: [],
  disabled: [],
  excluded: [],
  options: spellTraditionOptions,
  hasSearch: false,
  search: "",
  defaultValue: [],
};
const spellTraits: filterProps = {
  name: "Признаки",
  selection: "multipleRadio",
  value: [],
  disabled: [],
  excluded: [],
  options: [
    ...new Set(
      data.spells
        .map((content) => content.traits)
        .flat()
        .filter((content) => content !== "")
    ),
  ],
  multiply: false,
  hasSearch: true,
  search: "",
  defaultValue: [],
};
const castingType: filterProps = {
  name: "Тип сотворения",
  selection: "multipleRadio",
  value: [],
  disabled: [],
  excluded: [],
  options: castingTypeOptions,
  hasSearch: false,
  search: "",
  defaultValue: [],
};
//
//full filters Store
//
export const filters = writable({
  backgrounds: {
    rarity,
    attributeValue,
  },
  feats: {
    traits: featTraits,
    rarity,
    level: featLevel,
    action,
    archetype,
  },
  spells: {
    type: spellType,
    level: spellLevel,
    tradition,
    traits: spellTraits,
    rarity,
    action: action,
    castingType,
  },
  actions: {
    traits: {
      name: "Признаки",
      selection: "multipleRadio",
      value: [],
      options: [],
      multiply: false,
      disabled: [],
      excluded: [],
      search: "",
      hasSearch: false,
      defaultValue: [],
    },
    rarity,
  },
});
export function changeUrlOnFilter(filterValue: filterUnion, dataKey: keyof TableData) {
  let filterValueAndDisabled = {};
  const tab = dataKey;
  for (const [key, val] of Object.entries(filterValue) as Entries<filterUnion>) {
    const tempObject = {};
    if (val.value.join() !== val.defaultValue.join()) {
      tempObject["val"] = val.value;
    }
    if (val.disabled.length) tempObject["disabled"] = val.disabled;
    if (Object.keys(tempObject).length) {
      filterValueAndDisabled[key] = tempObject;
    }
  }
  if (Object.keys(filterValueAndDisabled).length) {
    const filterParams = strToBase64(JSON.stringify(filterValueAndDisabled));

    window.history.replaceState({ tab, filter: filterParams }, "", `?tab=${tab}&&filter=${filterParams}`);
  } else {
    window.history.replaceState({ tab }, "", `?tab=${tab}`);
  }
}
function strToBase64(str: string) {
  const bytes = new TextEncoder().encode(str);
  const binString = String.fromCodePoint(...bytes);
  return encode(binString, true);
}
