//
//Content types
//

export interface Data {
    ancestries: ancestryType[];
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

export type Routes =
    keyof Pick<Data, "actions" | "backgrounds" | "creatures" | "feats" | "spells" | "ancestries">
    | "favorites";
export type DataRoutes = Exclude<Routes, "favorites">;
export type generalContent =
    {
        name: string;
        originalName: string;
        fullName: string;
        traits: string[];
        rarity: string;
        desc: string;
        srcBook: string[];
        id: string;
    }
    & (ancestryProperties | backgroundProperties | spellProperties | featProperties | creatureProperties | actionProperties)
type ancestryProperties = {
    dataType: "ancestry",
    hp: number,
    size: "tiny" | "small" | "medium" | "large" | "huge" | "gargantuan";
    reach: number;
    speed: number;
    traits: string[];
    senses: string[];
    rarity: "common" | "uncommon" | "rare";
    languages: {
        value: string[]
    },
    additionalLanguages: {
        count: number,
        value: string[]
    },
    vision: string,
    boosts: ["str", "dex", "con", "int", "wis", "cha"][],
    flaws: ["str", "dex", "con", "int", "wis", "cha"][],
    special: { name: string, desc: string }[]
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
    skills: Record<SkillsEnum, number>,
    attributes: Record<AttributesEnum, number>,
    hp: number,
    defences: Record<DefencesEnum, number>,
    speed: Record<SpeedEnum, number>,
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
    [Property in keyof Omit<Type, "name" | "desc" | "fullName" | "originalName" | "id">]: filterProps;
};
export type filterProps = {
    name: string;
    multiply?: boolean;

    excluded: string[];
    search: string;
    hasSearch: boolean;

    optionsName?: Record<string, string>;
} & (notDeepOptions | deepSelection);
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
type notDeepOptions = {
    readonly isDeep: false;
    value: string[];
    disabled: string[];
    defaultValue: string[];
} & (singleRadioProps | multipleRadio | minMax)
type deepSelection = {
    readonly isDeep: true;
    selection: "minMax" | 'singleRadio' | "multipleRadio";
    value: Record<string, string[]>;
    disabled: Record<string, string[]>;
    defaultValue: Record<string, string[]>;
    optionsName: Record<string, string>;

} & (deepMinMax | deepRadio)
type deepMinMax = {
    selection: 'minMax',
    options: Record<string, { min: number, max: number }>
}
type deepRadio = {
    selection: 'singleRadio' | 'multipleRadio',
    options: Record<string, string[]>
}
type BgFilterKeys = Pick<backgroundType, "attributeValue" | "skills" | "rarity" | "traits" | "srcBook">;
type SpellFilterKeys = Pick<spellType, "action" | "castingType" | "level" | "save" | "rarity" | "traits" | "tradition" | "type" | "srcBook">
type FeatFilterKeys = Pick<featType, "traits" | "rarity" | "level" | "action" | "archetype" | "skills" | "srcBook">;
type ActionFilterKeys = Pick<actionType, "traits" | "action" | "srcBook">;
type CreatureFilterKeys = Pick<creatureType, "traits" | "rarity" | "hp" | "srcBook" | "attributes" | "skills" | "level">;
type AncestriesFilterKeys = Pick<ancestryType, "traits" | "rarity" | "hp" | "srcBook" | "boosts" | "flaws">
export type backgroundFilter = Filter<BgFilterKeys>;
export type spellsFilter = Filter<SpellFilterKeys>;
export type featFilter = Filter<FeatFilterKeys>;
export type actionFilter = Filter<ActionFilterKeys>;
export type creatureFilter = Filter<CreatureFilterKeys>;
export type ancestryFilter = Filter<AncestriesFilterKeys>
export type UnionFilterKeys =
    keyof BgFilterKeys
    | keyof SpellFilterKeys
    | keyof FeatFilterKeys
    | keyof ActionFilterKeys
    | keyof CreatureFilterKeys
    | keyof AncestriesFilterKeys
export type globalFilter = {
    backgrounds: backgroundFilter;
    spells: spellsFilter;
    feats: featFilter;
    actions: actionFilter;
    creatures: creatureFilter;
    ancestries: ancestryFilter
};
export type FilterKeys = {
    backgrounds: BgFilterKeys;
    spells: SpellFilterKeys;
    feats: FeatFilterKeys;
    actions: ActionFilterKeys;
    creatures: CreatureFilterKeys;
    ancestries: AncestriesFilterKeys
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
enum AttributesEnum {
    str = "str",
    dex = "dex",
    con = "con",
    wis = "wis",
    cha = "cha",
    int = "int"
}

enum SkillsEnum {
    acr = "acr",
    "arc" = "arc",
    "ath" = "ath",
    "cra" = "cra",
    "dec" = "dec",
    "dip" = "dip",
    "itm" = "itm",
    "med" = "med",
    "nat" = "nat",
    "occ" = "occ",
    "prf" = "prf",
    "rel" = "rel",
    "soc" = "soc",
    "ste" = "ste",
    "sur" = "sur",
    "thi" = "thi"
}

enum DefencesEnum {
    ac = "ac",
    fortitude = "fortitude",
    will = "will",
    reflex = "reflex"
}

enum SpeedEnum {
    common = "common",
    burrow = "burrow",
    climb = "climb",
    fly = "fly",
    swim = "swim",

}