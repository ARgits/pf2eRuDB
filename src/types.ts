//
//Content types
//

export interface Data {
    backgrounds: backgroundType[];
    spells: spellType[];
    actions: actionType[];
    feats: featType[];
    creatures: creatureType[];
    traits: Set<string>;
    paragraphs: Set<string>;
    allData: any[];
    tables: { fullName: string; desc: string, dataType: 'table', id: string }[];
    conditions: { fullName: string, desc: string, id: string, dataType: 'condition' }[]
}
export type Routes = keyof Pick<Data, "actions" | "backgrounds" | "creatures" | "feats" | "spells"> | "favorites";
export type DataRoutes = Exclude<Routes, "favorites">;
export type generalContent = {
    name: string;
    originalName: string;
    fullName: string;
    traits: string[];
    rarity: string;
    desc: string;
    src: string;
    id: string;
} & (backgroundProperties | spellProperties | featProperties | creatureProperties | actionProperties)
type ancestryProperties = {
    dataType: "ancestry",
    size: "tiny" | "small" | "medium" | "large" | "huge" | "gargantuan";
    reach: number;
    speed: number;
    traits: string[];
    senses: string[];
    rarity: "common" | "uncommon" | "rare";
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ancestryType = Extract<generalContent, { dataType: 'ancestry' }>
export type backgroundType = Extract<generalContent, { dataType: 'background' }>
export type spellType = Extract<generalContent, { dataType: 'spell' }>
export type featType = Extract<generalContent, { dataType: 'feat' }>
export type creatureType = Extract<generalContent, { dataType: 'creature' }>
export type actionType = Extract<generalContent, { dataType: 'action' }>
type backgroundProperties = {
    dataType: "background",
    attributeValue: string[][];
    attributeDesc: string;
    feat: string;
    lore: string;
    customAbs: string;
    skills: string[]
}
type actionProperties = {
    dataType: "action",
    action: string;
}
type spellProperties = {
    dataType: "spell",
    //[index: string]: string;
    type: "Заклинание" | "Чары" | "Ф.чары" | "Фокус" | "-";
    level: number;
    tradition: string[];
    action: string;
    castingType: string[];
    save: string[]
}
type creatureProperties = {
    dataType: "creature",
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
type featProperties = {
    dataType: "feat",
    action: string;
    level: number;
    archetype: string;
    skills: string[]
}
//
//Filters Type
//

export type Filter<Type> = {
    [Property in keyof Omit<Type, "name" | "desc" | "fullName" | "src" | "originalName" | "id">]: filterProps;
};
export type filterProps = {
    name: string;
    value: string[];
    multiply?: boolean;
    disabled: string[];
    excluded: string[];
    search: string;
    hasSearch: boolean;
    defaultValue: string[];
    optionsName?: Record<string, string>;
    options?: string[]
} & (singleRadioProps | multipleRadio | minMax);
export type FilterUnion = backgroundFilter | spellsFilter | featFilter | actionFilter | creatureFilter;
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
type BgFilterKeys = Pick<backgroundType, "attributeValue" | "skills" | "rarity" | "traits">;
type SpellFilterKeys = Pick<spellType, "action" | "castingType" | "level" | "save" | "rarity" | "traits" | "tradition" | "type">
type FeatFilterKeys = Pick<featType, "traits" | "rarity" | "level" | "action" | "archetype" | "skills">;
type ActionFilterKeys = Pick<actionType, "traits" | "action">;
type CreatureFilterKeys = Pick<creatureType, "traits" | "rarity" | "hp">;
export type backgroundFilter = Filter<BgFilterKeys>;
export type spellsFilter = Filter<SpellFilterKeys>;
export type featFilter = Filter<FeatFilterKeys>;
export type actionFilter = Filter<ActionFilterKeys>;
export type creatureFilter = Filter<CreatureFilterKeys>;
export type UnionFilterKeys = keyof BgFilterKeys | keyof SpellFilterKeys | keyof FeatFilterKeys | keyof ActionFilterKeys | keyof CreatureFilterKeys
export type globalFilter = {
    backgrounds: backgroundFilter;
    spells: spellsFilter;
    feats: featFilter;
    actions: actionFilter;
    creatures: creatureFilter;
};
export type FilterKeys = {
    backgrounds: BgFilterKeys;
    spells: SpellFilterKeys;
    feats: FeatFilterKeys;
    actions: ActionFilterKeys;
    creatures: CreatureFilterKeys;
};
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
export type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];
//
//Enums
//
