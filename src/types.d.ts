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
export interface ActionType extends generalContent {}
export interface SpellType extends generalContent {
  //[index: string]: string;
  type: "Заклинание" | "Чары" | "Ф.чары" | "Фокус" | "-";
  level: number;
  tradition: string[];
  action: string;
  castingType: string[];
}
export interface CreatureType extends generalContent {}
export interface FeatType extends generalContent {
  action: string;
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
};
type filterUnion = backgroundFilter | spellsFilter | featFilter;
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
export type backgroundFilter = Filter<BgFilterKeys>;
export type spellsFilter = Filter<SpellFilterKeys>;
export type featFilter = Filter<FeatFilterKeys>;
//
//Tabs type
//
type component = typeof SvelteComponent<any, any, any>;
type tab = {
  component: component;
  visible: boolean;
  name: string;
  key: keyof Tabs;
};
export interface Tabs {
  feats: tab;
  backgrounds: tab;
  spells: tab;
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
enum SpellTradition {
  "арканный",
  "оккультный",
  "природный",
  "сакральный",
}
enum Tags {
  "исследование",
  "тайна",
  "концентрация",
  "отдых",
  "движение",
  "атака",
  "воздействие",
  "ментальный",
  "слуховой",
  "языковой",
  "эмоция",
  "страх",
  "исцеление",
  "общая",
  "редкий",
  "истинное имя",
  "навык",
  "откровение",
  "удача",
  "необычный",
  "позитивный",
  "негативный",
  "недееспособность",
  "природный",
  "некромантия",
  "оккультный",
  "прорицание",
  "сакральный",
  "визуальный",
  "редкость",
  "мировоззрение",
  "размер",
  "другие признаки",
  "свет",
  "электричество",
  "заводной",
  "вода",
  "воздух",
  "огонь",
  "эвокация",
  "паровой",
  "расходуемый",
  "комбинированное",
  "гном",
  "иллюзия",
  "телепортация",
  "гоблин",
  "дварф",
  "полурослик",
  "человек",
  "полуэльф",
  "полуорк",
  "орк",
  "эльф",
  "леший",
  "трансмутация",
  "полиморф",
  "яд",
  "людоящер",
  "хобгоблин",
  "коточеловек",
  "болезнь",
  "размах",
  "неудача",
  "кобольд",
  "аркана",
  "крысолюд",
  "тэнгу",
  "трансформация",
  "фечлин",
  "тень",
  "тьма",
  "воплощение",
  "кицунэ",
  "азаркет",
  "преграждение",
  "спрайт",
  "стрикс",
  "андроид",
  "флэшворп",
  "гнолл",
  "гриппли",
  "анади",
  "конрас",
  "голома",
  "шиск",
  "автоматон",
  "кукла",
  "скелет",
  "горан",
  "кашриши",
  "нагаджи",
  "очарование",
  "ванар",
  "вишканья",
  "род",
  "аазимар",
  "тифлинг",
  "аура",
  "сила",
  "афорит",
  "ганзи",
  "подменыш",
  "дампир",
  "сумеречный",
  "смерть",
  "зверолюд",
  "отражение",
  "межпространственный",
  "ифрит",
  "ореад",
  "сули",
  "сильф",
  "ундина",
  "метамагия",
  "повсеместная магия",
  "воин",
  "натиск",
  "начальный",
  "стойка",
  "варвар",
  "ярость",
  "чемпион",
  "клятва",
  "рейнджер",
  "проклятие",
  "монах",
  "плут",
  "магический",
  "сорвиголова",
  "финишер",
  "стрелок",
  "алхимик",
  "примесь 1",
  "примесь 2",
  "примесь 3",
  "сыщик",
  "предсказание",
  "модификация",
  "изобретатель",
  "нестабильный",
  "холод",
  "тауматург",
  "эзотерика",
  "кинетик",
  "нагнетание",
  "импульс",
  "переполнение",
  "звук",
  "земля",
  "жизненность",
  "металл",
  "дерево",
  "растение",
  "составной",
  "бард",
  "жрец",
  "друид",
  "оружие",
  "волшебник",
  "обнаружение",
  "чародей",
  "ведьма",
  "оракул",
  "магус",
  "визуальное",
  "позитивное",
  "ангел",
  "небожитель",
  "эйдолон",
  "фантом",
  "эфирный",
  "чудовище",
  "конструкт",
  "астральный",
  "демон",
  "бес",
  "дракон",
  "фея",
  "психопомп",
  "наблюдатель",
  "нежить",
  "эволюция",
  "призыватель",
  "тандем",
  "экстрасенс",
  "расширение",
  "психика",
  "сдвиг разума",
  "несмертельный",
  "ПЗ",
  "дьявол",
  "слизь",
  "бестелесный",
  "дух",
  "элементаль",
  "Н",
  "архетип",
  "посвящение",
  "мультикласс",
  "класс",
  "публичный",
  "линчеватель",
  "безрассудство",
  "обонятельный",
  "силок",
  "ловушка",
  "механический",
  "кислота",
  "татуировка",
  "инвестируемый",
  "чары",
  "композиция",
  "добро",
  "литания",
  "зло",
  "видение",
  "сон",
  "сглаз",
  "проклятое",
  "освящение",
  "одержимость",
  "ПН",
  "ХЗ",
  "ХД",
  "ПД",
  "НД",
  "ХН",
  "огромный",
  "животное",
  "исполинский",
  "большой",
  "тролль",
  "гигант",
  "окружение",
  "грибковый",
  "призрак",
  "комплексная",
  "разумный",
  "наивысший",
  "проклятый",
  "зелье",
  "уникальный",
  "артефакт",
  "вирулентный",
  "наркотик",
  "алхимический",
  "глотаемый",
  "вдыхаемый",
  "ранение",
  "субъективная гравитация",
  "безграничный",
  "вневременной",
  "неустойчивый",
  "метаморфный",
  "НЗ",
  "статичный",
  "текущий",
  "конечный",
  "средний",
  "гуманоид",
  "посох",
  "фокусирующий",
  "хаотичный",
  "сварганенное",
  "принципиальный",
  "компаньон",
  "бомба",
  "брызги",
  "несмертельное",
  "эликсир",
  "мутаген",
  "контакт",
  "масло",
  "свиток",
  "талисман",
  "фулу",
  "катализатор",
  "гаджет",
  "палочка",
  "гримуар",
  "сердце заклинания",
  "приспособление",
  "драгоценный",
  "строение",
  "маленький",
  "переносное",
  "стационарное",
  "контракт",
  "водный",
  "аберрация",
  "земноводный",
  "крошечный",
  "неразумный",
  "рой",
  "асура",
  "мутант",
  "боггард",
  "калигни",
  "дэймон",
  "деро",
  "динозавр",
  "див",
  "дроу",
  "дуэргар",
  "гений",
  "привидение",
  "гуль",
  "грёзы",
  "голем",
  "гремлин",
  "карга",
  "мерфолк",
  "мумия",
  "клиппот",
  "ракшас",
  "морской дьявол",
  "змеелюд",
  "отряд",
  "скельм",
  "вампир",
  "вельстрак",
  "оборотень",
  "умертвие",
  "рэйф",
  "зулгат",
  "зомби",
  "различается",
  "проситель",
  "любое",
  "одушевленный",
  "сопряженность",
  "инкарнация",
}
