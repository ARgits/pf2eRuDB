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
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  allData: any[];
  tables: Map<string, { fullName: string; desc: string }>;
}
type Content = {
  [k in keyof TableData]: k extends "backgrounds" ? BackgroundType : k extends "spells" ? SpellType : k extends "feats" ? FeatType : k extends "actions" ? ActionType : CreatureType;
};
type ContentByKey<K extends tableData> = Content[K];
type contentTableUnion = BackgroundType[] | SpellType[] | FeatType[];
type TableData = { favorites: generalContent[] } & Omit<Data, "traits" | "paragraphs" | "tables" | "allData">;
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
type ancestryType = {
  name: string;
  originalName: string;
  id: string;
  size: "tiny" | "small" | "medium" | "large" | "huge" | "gargantuan";
  reach: number;
  speed: number;
  traits: string[];
  senses: string[];
  rarity: "common" | "uncommon" | "rare";
};
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
  skills: string[]
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
  save: string[]
}
export interface CreatureType extends generalContent {
  level: number,
  perception: number,
  senses: string[],
  languages: string[],
  skills: Record<string, number>,
  attributes: Record<string, number>,
  hp: number,
  defences: Record<string, number>,
  speed: Record<string, number>,
  melee?: string,
  range?: string,
  spells?: string[]
}
export interface FeatType extends generalContent {
  action: string;
  level: number;
  archetype: string;
  skills: string[]
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
  [Property in keyof Omit<Type, "name" | "desc" | "fullName" | "src" | "originalName" | "id">]: filterProps;
};
type filterProps = {
  name: string;

  value: string[];
  multiply?: boolean;
  disabled: string[];
  excluded: string[];
  search: string;
  hasSearch: boolean;
  defaultValue: string[];
  optionsName?: Record<string, string>
} & (singleRadioProps | multipleRadio | minMax);
type filterUnion = backgroundFilter | spellsFilter | featFilter | actionFilter | creatureFilter;
type singleRadioProps = {
  selection: "singleRadio",
  options: string[],
}
type multipleRadio = {
  selection: "multipleRadio",
  options: string[]
}
type minMax = {
  selection: "minMax",
  min: number,
  max: number
}
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
type FeatFilterKeys = Pick<FeatType, "traits" | "rarity" | "level" | "action" | "archetype" | "skills">;
type ActionFilterKeys = Pick<ActionType, "traits", "action">;
type CreatureFilterKeys = Pick<CreatureType, "traits" | "rarity">;
export type backgroundFilter = Filter<BgFilterKeys>;
export type spellsFilter = Filter<SpellFilterKeys>;
export type featFilter = Filter<FeatFilterKeys>;
export type actionFilter = Filter<ActionFilterKeys>;
export type creatureFilter = Filter<CreatureFilterKeys>;
//
//Tabs type
//
type tab = {
  visible: boolean;
  name: string;
  key: keyof Tabs;
  maxItems: number;
};
export interface Tabs {
  feats: tab;
  backgrounds: tab;
  spells: tab;
  actions: tab;
  favorites: tab;
  creatures: tab
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
