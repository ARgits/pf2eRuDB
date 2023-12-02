import type { filterProps } from "../types";
import { writable } from "svelte/store";
//import { prepareData } from "./prepareData";
import {
  actionOptions,
  attributeValueOptions,
  castingTypeOptions,
  featTraitsOptions,
  levelOneToTen,
  levelOneToTventy,
  rarityOptions,
  spellTraditionOptions,
  spellTraitsOptions,
  spellTypeOptions,
} from "./constants";
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
});
