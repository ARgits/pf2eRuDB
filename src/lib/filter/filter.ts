import { encode } from "js-base64";
import type { Entries, TableData, filterProps, filterUnion } from "../../types";
import { writable } from "svelte/store";
const { actionOptions, attributeValueOptions, castingTypeOptions, featTraitsOptions, levelOneToTen, levelOneToTventy, rarityOptions, spellTraditionOptions, spellTraitsOptions, spellTypeOptions } =
  await import("../constants");
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
  options: featTraitsOptions,
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
  selection: "minMax",
  value: ["1", "10"],
  options: levelOneToTen,
  disabled: [],
  excluded: [],
  hasSearch: false,
  search: "",
  defaultValue: ["1", "10"],
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
  options: spellTraitsOptions,
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
    },
    rarity: {
      name: "Редкость",
      selection: "singleRadio",
      value: [],
      options: [],
      multiply: false,
      disabled: [],
      excluded: [],
      search: "",
      hasSearch: false,
    },
  },
});
export function changeUrlOnFilter(filterValue: filterUnion, dataKey: keyof TableData) {
  let filterValueAndDisabled = {};
  const tab = dataKey;
  for (const [key, val] of Object.entries(filterValue) as Entries<filterUnion>) {
    const tempObject = {};
    if (val.value.join() !== val.defaultValue.join()) {
      tempObject["value"] = val.value;
    }
    if (val.disabled.length) {
      tempObject["disabled"] = val.disabled;
    }
    if (Object.keys(tempObject).length) {
      filterValueAndDisabled[key] = tempObject;
    }
  }
  if (Object.keys(filterValueAndDisabled).length) {
    console.log(filterValueAndDisabled);
    console.log(JSON.stringify(filterValueAndDisabled).length);
    const filterParams = strToBase64(JSON.stringify(filterValueAndDisabled));
    console.log(filterParams.length);
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
