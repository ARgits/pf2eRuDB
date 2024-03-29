import type {
  ActionType,
  BackgroundType,
  CreatureType,
  Data,
  FeatType,
  SpellType,
  actionFilter,
  ancestryType,
  backgroundFilter,
  creatureFilter,
  featFilter,
  filterProps,
  globalFilter,
  spellsFilter,
} from "../../types";
import { backgrounds as basckgroundsManual } from "../../manualData/backgrounds.js"
import { spells as spellsManual } from "../../manualData/spells.js"
import * as cheerio from "cheerio";
import data from "../../assets/data.json" assert { type: "json" };
import { conditions } from "../../components/constants.js";
const allImgs = ["/PF_action_1.webp", "/PF_action_2.webp", "/PF_action_3.webp", "/PF_action_free.webp", "/PF_action_reaction.webp"];
const nameOfNum: { [index: string]: number } = {
  " одно ": 1,
  " два ": 2,
  " три ": 3,
  "1": 1,
  "2": 2,
  "3": 3,
};
const savesReplacement = {
  "Вол": "will",
  "Сто": "fortitude",
  "Реф": "reflex"
}
const skillsReplacement = {
  "Акробатик": "acr",
  "Аркан": "arc",
  "Атлетик": "ath",
  "Ремесл": "cra",
  "Обман": "dec",
  "Дипломат": "dip",
  "Запугиван": "itm",
  "Медицин": "med",
  "Природ": "nat",
  "Оккутильзм": "occ",
  "Выступлен": "prf",
  "Религ": "rel",
  "Обществ": "soc",
  "Скрытност": "ste",
  "Выживан": "sur",
  "Воровств": "thi"
}
const skillsRegex = /(Акробатик)|(Аркан)|(Атлетик)|(Ремесл)|(Обман)|(Дипломат)|(Запугиван)|(Медицин)|(Природ)|(Оккутильзм)|(Выступлен)|(Религ)|(Обществ)|(Скрытност)|(Выживан)|(Воровств)/g
const backgroundParagraphs = ["Источник:", "Особенность: ", "Вы обучены", "Ваши девиантные умения относятся к"];
const abilitiesNames = ["Интеллект", "Сила", "Мудрость", "Ловкость", "Харизма", "Телосложение"];
const backgrounds: BackgroundType[] = [];
const spells: SpellType[] = [];
const actions: ActionType[] = [];
const feats: FeatType[] = [];
const creatures: CreatureType[] = [];
const traits: Set<string> = new Set();
const paragraphs: Set<string> = new Set();
const tables: Map<string, { fullName: string; desc: string }> = new Map();
const ancestries: ancestryType[] = [];
const allData: any[] = [];
let $: cheerio.CheerioAPI;
function prepareData(data: any): Data {
  for (const site of data.checked) {
    $ = cheerio.load(site.data);

    $('img[class*="action-"]').each((_, img) => {
      const tempSrc = img.attribs["src"]?.match(/(PF_action).+(?=.png)/g)?.[0];
      if (tempSrc) {
        const src = allImgs.filter((item) => item.includes(tempSrc))[0];
        img.attribs["src"] = src;
      }
    });
    $("table").each((_, res) => {
      const id = $(res).prev().attr("id");
      if (!tables.has(id) && id) {
        $(res).find(".headerlink").remove();
        const fullName = $(res).find("caption .caption-text").prop("outerHTML");
        const desc = $(res).prop("outerHTML");
        tables.set(id, { fullName, desc });
      }
    });
    prepareBackgrounds();
    prepareContentWithTraits();
  }
  allData.push(
    ...conditions,
    ...[...tables].map((val) => {
      return { id: val[0], ...val[1] };
    })
  );
  const tempData = { backgrounds, spells, actions, feats, creatures };
  for (const arr of Object.values(tempData)) {
    if (arr instanceof Array)
      for (const value of arr) {
        if (value?.desc) {
          const $ = cheerio.load(value.desc);
          $("a.internal, span[class^='c-']").each((_, el) => {
            const href =
              $(el)
                .attr("href")
                ?.match(/(?<=#).+/)?.[0] ?? $(el).attr("class");

            const data = allData.find((v) => v.id === href)?.id ?? null;
            const className = data ? "std std-ref" : "";

            const textContent = $(el).prop("textContent");
            const dataId = data ? `data-id=${data}` : "";
            $(el).replaceWith(`<span class="card-link ${className}" ${dataId}>${textContent}</span>`);
          });
          value.desc = $("body").html();
        }
      }
  }
  return { ...tempData, tables, allData, traits, paragraphs };
}
function prepareBackgrounds() {
  $('section[id^="bg"]').each((_, res) => {
    const { fullName, originalName, name } = getFullname($(res));
    const alltraits = getTraits($(res));
    const { attributeDesc, attributeValue } = getAttributeArray(res);
    let src = "";
    let desc = "";
    $(res)
      .children("p")
      .each((_, item) => {
        const child = $(item);
        desc += $(child).prop("outerHTML");
        if (child.prop("textContent").includes("Источник:")) {
          src = child.prop("textContent").replace("Источник: ", "");
        }
      });
    const id = getId($(res))
    const skills = basckgroundsManual.get(id)
    const background: BackgroundType = {
      fullName,
      originalName,
      name,
      attributeValue,
      attributeDesc,
      desc,
      feat: "",
      lore: "",
      src,
      customAbs: "",
      rarity: getRarity(alltraits),
      traits: alltraits,
      skills,
      id,
    };
    backgrounds.push(background);
    allData.push(background);
  });
}
function prepareContentWithTraits() {
  $("section:not(:has(section)) > :is(h1, h2, h3, h4, h5, h6) + ul").each((_, res) => {
    $(res).addClass("traits");
    $(res)
      .children()
      .each((_, el) => {
        traits.add($(el).prop("textContent"));
      });
  });
  $("section:not(:has(section:not(.creature))):has(>span[id^='spell-'])").each((_, res) => {
    const element = $(res) as cheerio.Cheerio<cheerio.Element>;
    const spell = prepareSpell(element);
    spells.push(spell);
    allData.push(spell);
  });
  $('section:not(:has(section:not(.description))):has(>span[id*="feat-"])').each((_, res) => {
    const element = $(res) as cheerio.Cheerio<cheerio.Element>;
    const feat = prepareFeat(element);
    feats.push(feat);
    allData.push(feat);
  });
  $(
    'section:not(:has(section)):has(>span:is([id^="skill-"], [id|="action"])), section:not(:has(section)):is([id|="activity-"], [id^="skill-"], [id|="action"]):has(>span:first-child:not([id*="-terms-"])) '
  ).each((_, res) => {
    const id = getId($(res));
    //There can be feats with id="skill", so we need to check this. Also we don't want class features be there
    if (!allData.find((content) => content.id === id) && !id.includes("class-feature") && !id.includes("variants")) {
      const element = res.tagName === "span" ? $(res).parent() : $(res);
      const action = prepareAction(element);
      actions.push(action);
      allData.push(action);
    }
  });
  $("section.creature").each((_, res) => {
    const id = getId($(res))
    if (!allData.find((content) => content.id === id) && id) {
      const element = res.tagName === "span" ? $(res).parent() : $(res);
      const creature = prepareCreature(element)
      creatures.push(creature)
      allData.push(creature)
    }
  })
}

function prepareSpell(el: cheerio.Cheerio<cheerio.Element>): SpellType {
  const { fullName, name, originalName, level } = getFullname(el);
  const traditionNode = el.children().filter((_, child) => $(child).prop("textContent")?.includes("Обычай: "));
  const tradition = traditionNode.length
    ? $(traditionNode)
      .prop("textContent")
      .replace("Обычай: ", "")
      .split(", ")
      .filter((t) => t !== "")
    : [];
  const id = getId(el)
  const alltraits = getTraits(el);
  function getSave() {
    const manualSave = spellsManual.get(id)
    if (manualSave) {
      return manualSave.save
    }
    if (alltraits.includes('атака')) return ["ac"]
    const saveElem = el.children().filter((_, child) => $(child).prop("textContent")?.includes("Спасбросок: "))
    return saveElem.length ?
      [$(saveElem).prop("textContent").replace("Спасбросок: ", "").replace("простой ", "").replace(/((Вол)|(Сто)|(Реф))[а-я]*/gm, (_, p1) => savesReplacement[p1])] : []
  }
  const save = getSave()
  const spell: SpellType = {
    fullName,
    name,
    originalName,
    type: fullName.includes("/ Закл") ? "Заклинание" : fullName.includes("/ Ф.чары") ? "Ф.чары" : fullName.includes("/ Фокус") ? "Фокус" : "Чары",
    level,
    traits: alltraits,
    desc: getDescripton(el),
    rarity: getRarity(alltraits),
    tradition,
    src: getSrc(el),
    action: getAction(el),
    castingType: getCastingType(el),
    id,
    save
  };
  return spell;
}
function prepareCreature(el: cheerio.Cheerio<cheerio.Element>): CreatureType {
  const { fullName, name, originalName, level } = getFullname(el);
  const traits = getTraits(el)
  function getHP() {
    const child = el.children().filter((_, p) => $(p).prop("textContent").includes('ОЗ:'))
    if (!child.length) return 0
    return parseInt($(child).prop("textContent").replace("ОЗ:", ""))
  }
  const creature: CreatureType = {
    id: getId(el),
    fullName,
    name,
    originalName,
    level,
    hp: getHP(),
    attributes: {},
    defences: {},
    desc: getDescripton(el),
    languages: [],
    perception: 0,
    traits,
    rarity: getRarity(traits),
    senses: [],
    skills: {},
    speed: {},
    src: getSrc(el),
  }
  return creature;

}
function prepareFeat(el: cheerio.Cheerio<cheerio.Element>): FeatType {
  const { fullName, name, originalName, level } = getFullname(el);
  const alltraits = getTraits(el);
  const id = getId(el);
  const archetype = id.includes("arch-feat") ? getArchetype(el) : "";
  function getSkills() {
    if (!alltraits.includes("навык")) return []
    const requrementsElem = el.children().filter((_, p) => $(p).prop("textContent").includes('Предварительные условия:'))
    if (!requrementsElem.length) return []
    return [...$(requrementsElem[0]).prop("textContent").matchAll(skillsRegex)].map((d) => skillsReplacement[d[0]]) as string[]

  }
  const skills = getSkills()
  const feat: FeatType = {
    fullName,
    name,
    originalName,
    level,
    traits: alltraits,
    rarity: getRarity(alltraits),
    desc: getDescripton(el),
    src: getSrc(el),
    action: getAction(el),
    id,
    archetype,
    skills
  };
  return feat;
}

function prepareAction(el: cheerio.Cheerio<cheerio.Element>): ActionType {
  const { fullName, name, originalName } = getFullname(el);
  const alltraits = getTraits(el);
  const action: ActionType = {
    fullName,
    name,
    traits: alltraits,
    originalName,
    rarity: getRarity(alltraits),
    desc: getDescripton(el),
    src: getSrc(el),
    action: getAction(el),
    id: getId(el),
  };
  return action;
}
function getTraits(element: cheerio.Cheerio<cheerio.Element>) {
  return (
    $(element)
      .find("h1 + ul, h2 + ul, h3 + ul, h4 + ul, h5 + ul, h6 + ul")
      ?.text()
      ?.split("\n")
      .filter((t) => t !== "") || []
  );
}
function getFullname(element: cheerio.Cheerio<cheerio.Element>) {
  const header = $(element).find("h1, h2, h3, h4, h5, h6");
  const idElem = header.find(".headerlink");
  idElem.remove();
  return {
    fullName: header.html(),
    name: header
      .text()
      .replace(/\((?<=\().+/, "")
      .trim(),
    originalName:
      header
        .text()
        .match(/(?<=\()((?<!\))[a-z-A-Z ']+)/)?.[0]
        .trim() || "",
    level: parseInt(header.text().match(/-?\d{1,2}/g)?.[0]) || 0,
  };
}
function getAttributeArray(element: cheerio.Element) {
  const $ = cheerio.load(element);
  let child: cheerio.Element;
  $("p").each((_, val) => {
    if ($(val).text().includes("характеристик") && backgroundParagraphs.every((parag) => !$(val).text().includes(parag))) child = val;
  });
  const innerHTML = $(child).prop("innerHTML");
  const attribParagraph = $(child).prop("outerHTML");
  const attributeDesc = $(child).prop("textContent");
  let attributeValue: string[][];
  const abilities = [...innerHTML.matchAll(/((?<=<strong>)[а-яА-Я]*)|((?<=другое )[а-яА-Я]*)/g)].map((v) => v[0].replace(/^./, v[0][0].toUpperCase()));
  for (let key of abilities.keys()) {
    abilities[key] = abilitiesNames.filter((item) => item.includes(abilities[key].slice(0, 3)))[0] || "Свободное";
  }
  let numOfAbilities: RegExpMatchArray | null | number = innerHTML.match(/\d|(\sдва\s)|(\sодно\s)|(\sтри\s)/g);
  if (!numOfAbilities) {
  } else {
    numOfAbilities = nameOfNum[numOfAbilities[0]];
    const tempAbil = [];
    let tempInd = 0;
    for (let ind of Array(numOfAbilities).keys()) {
      tempAbil.push(abilities.slice(tempInd, ind + numOfAbilities).filter((ab) => ab !== "Свободное"));
      tempInd += ind + numOfAbilities;
    }
    attributeValue = tempAbil.map((abil) => {
      if (abil.length) {
        return abil;
      }
      return ["Свободное"];
    });
  }
  return { attribParagraph, attributeDesc, attributeValue };
}
function getRarity(allTraits: string[]): string {
  const rarityStr = allTraits.filter((t) => ["необычный", "редкий"].includes(t))[0] ?? "обычный";
  return rarityStr.charAt(0).toUpperCase() + rarityStr.slice(1);
}
function getSrc(element: cheerio.Cheerio<cheerio.Element>): string {
  const srcElem = element.children("p").filter((_, child) => $(child).prop("textContent").includes("Источник: "))?.[0];
  return $(srcElem)?.prop("textContent")?.replace("Источник: ", "") || "";
}
function getCastingType(element: cheerio.Cheerio<cheerio.Element>): string[] {
  const castingTypeElem = element.children("p").filter((_, child) => $(child).prop("textContent").includes("Сотворение: "))?.[0];
  return (
    $(castingTypeElem)
      ?.prop("textContent")
      ?.match(/материальный|жестовый|словесный/gm) || []
  );
}
function getDescripton(element: cheerio.Cheerio<cheerio.Element>): string {
  return element
    .children(":not(h1, h2, h3, h4, h5, h6, span, aside, .traits)")
    .map((_, child) => $(child).prop("outerHTML").trim())
    .toArray()
    .join("");
}
function getAction(element: cheerio.Cheerio<cheerio.Element>): string {
  return element.find("img")?.first()?.attr("alt") || "";
}
function getId(element: cheerio.Cheerio<cheerio.Element>): string {
  const firstSpan = element.children("span").first();
  return firstSpan.attr("id")?.match(/\d+/) ? element.attr("id") : firstSpan.attr("id");
}
function getArchetype(element: cheerio.Cheerio<cheerio.Element>): string {
  const id = element.parents("[id^=archetype]").children("h1, h2, h3, h4, h5, h6");
  const multiclass = element.parents("[id^=archetype]").attr("class").includes("multiclass") ? "Мультикласс " : "";
  id.find(".headerlink").remove();
  return (multiclass + id.prop("textContent").replace("(Archetype)", "")).trim();
}

function prepareFilters(data: Data): globalFilter {
  const action: filterProps = {
    name: "Действие",
    selection: "singleRadio",
    value: [],
    options: ["одиночное действие", "активность из 2-х действий", "активность из 3-х действий", "реакция", "свободное действие"],
    disabled: [],
    excluded: [],
    hasSearch: false,
    search: "",
    defaultValue: [],
  };
  const rarity: filterProps = {
    name: "Редкость",
    value: [],
    defaultValue: [],
    disabled: [],
    excluded: [],
    hasSearch: false,
    search: "",
    selection: "singleRadio",
    options: ["Обычный", "Необычный", "Редкий"],
  };
  const backgrounds: backgroundFilter = {
    rarity,
    attributeValue: {
      defaultValue: [],
      disabled: [],
      excluded: [],
      hasSearch: false,
      name: "Характеристика",
      options: ["Сила", "Ловкость", "Телосложение", "Мудрость", "Харизма", "Интеллект"],
      search: "",
      selection: "multipleRadio",
      value: [],
      multiply: false,
    },
    skills: {
      defaultValue: [],
      disabled: [],
      excluded: [],
      hasSearch: false,
      name: "Навыки",
      search: "",
      selection: "multipleRadio",
      value: [],
      multiply: false,
      options: ["acr", "arc", "ath", "prf", "occ", "thi", "cra", "rel", "nat", "dip", "dec", "itm", "soc", "ste"],
      optionsName: {
        acr: "Акробатика",
        arc: "Аркана",
        ath: "Атлетика",
        prf: "Выступление",
        occ: "Оккультизм",
        thi: "Воровство",
        cra: "Ремесло",
        rel: "Ремесло",
        nat: "Природа",
        dip: "Дипломатия",
        dec: "Обман",
        itm: "Запугивание",
        soc: "Общество",
        ste: "Скрытность"
      }
    }
  };
  const spells: spellsFilter = {
    traits: {
      name: "Признаки",
      selection: "multipleRadio",
      value: [],
      options: [...new Set(data.spells.map((content) => content.traits).flat())].sort((a, b) => a.localeCompare(b)),
      multiply: false,
      disabled: [],
      excluded: [],
      search: "",
      hasSearch: true,
      defaultValue: [],
    },
    rarity,
    type: {
      name: "Тип",
      selection: "singleRadio",
      value: [],
      options: [...new Set(data.spells.map((content) => content.type))],
      disabled: [],
      excluded: [],
      search: "",
      hasSearch: false,
      defaultValue: [],
    },
    level: {
      name: "Уровень",
      selection: "singleRadio",
      value: [],
      options: [...new Set(data.spells.map((content) => content.level))].sort((a, b) => a - b).map((val) => val.toString()),
      disabled: [],
      excluded: [],
      search: "",
      hasSearch: false,
      defaultValue: [],
    },
    tradition: {
      name: "Традиция",
      selection: "multipleRadio",
      value: [],
      options: [...new Set(data.spells.map((content) => content.tradition).flat())],
      disabled: [],
      excluded: [],
      search: "",
      hasSearch: false,
      defaultValue: [],
    },
    action,
    castingType: {
      name: "Тип сотворения",
      selection: "multipleRadio",
      value: [],
      options: [...new Set(data.spells.map((content) => content.castingType).flat())],
      multiply: false,
      disabled: [],
      excluded: [],
      search: "",
      hasSearch: false,
      defaultValue: [],
    },
    save: {
      name: "Защита противника",
      selection: "multipleRadio",
      defaultValue: [],
      disabled: [],
      excluded: [],
      hasSearch: false,
      multiply: false,
      options: ["will", "fortitude", "reflex", "ac"],
      search: "",
      value: [],
      optionsName: {
        will: "Воля",
        fortitude: "Стойкость",
        reflex: "Рефлекс",
        ac: "КБ"
      }
    }
  };
  const feats: featFilter = {
    skills: {
      value: [],
      defaultValue: [],
      disabled: [],
      excluded: [],
      hasSearch: false,
      name: "Навыки",
      options: ["acr", "arc", "ath", "cra", "dec", "dip", "itm", "med", "nat", "occ", "prf", "rel", "soc", "ste", "sur", "thi"],
      search: "",
      selection: "multipleRadio",
      optionsName: {
        "acr": "Акробатика",
        "arc": "Аркана",
        "ath": "Атлетика",
        "cra": "Ремесло",
        "dec": "Обман",
        "dip": "Дипломатия",
        "itm": "Запугивание",
        "med": "Медицина",
        "nat": "Природа",
        "occ": "Оккультизм",
        "prf": "Выступление",
        "rel": "Религия",
        "soc": "Общество",
        "ste": "Скрытность",
        "sur": "Выживание",
        "thi": "Воровство"
      }
    },
    traits: {
      name: "Признаки",
      selection: "multipleRadio",
      value: [],
      options: [...new Set(data.feats.map((content) => content.traits).flat())].sort((a, b) => a.localeCompare(b)),
      multiply: false,
      disabled: [],
      excluded: [],
      search: "",
      hasSearch: true,
      defaultValue: [],
    },
    rarity,
    level: {
      name: "Уровень",
      selection: "singleRadio",
      value: [],
      options: [...new Set(data.feats.map(f => f.level.toString()))],
      disabled: [],
      excluded: [],
      search: "",
      hasSearch: false,
      defaultValue: [],
    },
    action,
    archetype: {
      name: "Архетип",
      selection: "singleRadio",
      value: [],
      options: [...new Set(data.feats.map((content) => content.archetype))].filter((str) => str !== "").sort((a, b) => a.localeCompare(b)),
      disabled: [],
      excluded: [],
      search: "",
      hasSearch: true,
      defaultValue: [],
    },
  };
  const actions: actionFilter = {
    action,
    traits: {
      defaultValue: [],
      disabled: [],
      excluded: [],
      hasSearch: false,
      name: "Признаки",
      options: [...new Set(data.actions.map((content) => content.traits).flat())].filter((str) => str !== "").sort((a, b) => a.localeCompare(b)),
      search: "",
      selection: "multipleRadio",
      value: [],
      multiply: false,
    },
  };
  const creatures: creatureFilter = {
    traits: {
      name: "Признаки",
      selection: "multipleRadio",
      value: [],
      options: [...new Set(data.creatures.map((content) => content.traits).flat())].filter((str) => str !== "").sort((a, b) => a.localeCompare(b)),
      multiply: false,
      disabled: [],
      excluded: [],
      search: "",
      hasSearch: false,
      defaultValue: [],
    },
    // hp: {
    //   name: "ОЗ",
    //   value: [Math.min(...data.creatures.map((cr) => cr.hp)).toString(), Math.max(...data.creatures.map((cr) => cr.hp)).toString()],
    //   defaultValue: [Math.min(...data.creatures.map((cr) => cr.hp)).toString(), Math.max(...data.creatures.map((cr) => cr.hp)).toString()],
    //   disabled: [],
    //   excluded: [],
    //   hasSearch: false,
    //   search: "",
    //   selection: "minMax",
    //   max: Math.max(...data.creatures.map((cr) => cr.hp)),
    //   min: Math.min(...data.creatures.map((cr) => cr.hp))
    // },
    rarity,
  };
  return { backgrounds, spells, feats, actions, creatures };
}
export const readyData = prepareData(data);
export const filters = prepareFilters(readyData);
