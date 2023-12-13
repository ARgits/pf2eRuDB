//
//Content types
//
interface Data {
  backgrounds: BackgroundType[];
  spells: SpellType[];
  actions: ActionType[];
  feats: FeatType[];
  creatures: CreatureType[];
  traits: Set<string>;
  paragraphs: Set<string>;
}
type Content = {
  [k in keyof TableData]: k extends "backgrounds" ? BackgroundType : k extends "spells" ? SpellType : FeatType;
};
type ContentByKey<K extends tableData> = Content[K];
type contentTableUnion = BackgroundType[] | SpellType[] | FeatType[];
type TableData = Omit<Data, "traits" | "paragraphs">;
type actionTypes = "реакция" | "свободное действие" | "1 действие" | "2 действия" | "3 действия";
interface generalContent {
  name: string;
  originalName: string;
  fullName: string;
  traits: string[];
  rarity: string;
  desc: string;
  src: string;
  id: string;
}
type tableHeaders = { [k in keyof Tabs]: { name: string; value: keyof Content[k] }[] };
type tableHeadersGeneral = { name: string; value: keyof generalContent }[];
type tableHeadersByKey<K extends keyof tableHeaders> = tableHeaders[k];
export interface BackgroundType extends generalContent {
  attributeValue: string[][];
  attributeDesc: string;
  feat: string;
  lore: string;
  src: string;
  customAbs: string;
}
export interface ActionType extends generalContent {
  action: string;
}
export interface SpellType extends generalContent {
  //[index: string]: string;
  type: "Заклинание" | "Чары" | "Ф.чары" | "Фокус" | "-";
  level: number;
  tradition: string[];
  action: string;
  castingType: string[];
  level: number;
}
export interface CreatureType extends generalContent {}
export interface FeatType extends generalContent {
  action: string;
  level: number;
}
//
//Filters Type
//
type globalFilter = {
  backgrounds: backgroundFilter;
  spells: spellsFilter;
  feats: FeatFilter;
  actions: ActionFilter;
  creatures: CreatureFilter;
};
type Filter<Type> = {
  [Property in keyof Omit<Type, "name" | "desc" | "fullName" | "src" | "originalName">]: filterProps;
};
type filterProps = {
  name: string;
  selection: "singleRadio" | "multipleRadio" | "minMax";
  value: string[];
  options: string[];
  multiply?: boolean;
  disabled: string[];
  excluded: string[];
  search: string;
  hasSearch: boolean;
  defaultValue: string[];
};
type filterUnion = backgroundFilter | spellsFilter | featFilter | actionFilter;
type SelectionByProperty = {
  rarity: "singleRadio";
  level: "minMax";
  traits: "multipleRadio";
  action: "singleRadio";
  tradition: "multipleRadio";
  type: "singleRadio";
};
type BgFilterKeys = Omit<BackgroundType, "attributeDesc" | "feat" | "customAbs" | "lore" | "traits">;
type SpellFilterKeys = Omit<SpellType, "">;
type FeatFilterKeys = Pick<FeatType, "traits" | "rarity" | "level" | "action">;
type ActionFilterKeys = Pick<ActionType, "traits", "rarity">;
export type backgroundFilter = Filter<BgFilterKeys>;
export type spellsFilter = Filter<SpellFilterKeys>;
export type featFilter = Filter<FeatFilterKeys>;
export type actionFilter = Filter<ActionFilterKeys>;
//
//Tabs type
//
type tab = {
  visible: boolean;
  name: string;
  key: keyof Tabs;
};
export interface Tabs {
  feats: tab;
  backgrounds: tab;
  spells: tab;
  actions: tab;
}
//
//Utility types
//
type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
//
//Enums
//
