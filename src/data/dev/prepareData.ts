import type {
    actionFilter,
    actionType,
    ancestryFilter,
    ancestryType,
    backgroundFilter,
    backgroundType,
    creatureFilter,
    creatureType,
    Data,
    Entries,
    featFilter,
    featType,
    filterProps,
    generalContent,
    globalFilter,
    spellsFilter,
    spellType,
} from "@types";
import {backgrounds as backgroundsManual} from "../manualData/backgrounds"
import {spells as spellsManual} from "../manualData/spells"
import * as cheerio from "cheerio";
import data from "../dev/data.json" assert {type: "json"};
import {conditions} from "../dev/constants.js";

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
} as const
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
    "Оккультизм": "occ",
    "Выступлен": "prf",
    "Религ": "rel",
    "Обществ": "soc",
    "Скрытност": "ste",
    "Выживан": "sur",
    "Воровств": "thi"
} as const
const textToAncestryProp = {
    'Очки здоровья': 'hp',
    'Размер': 'size',
    'Скорость': 'speed',
    'Повышения характеристик': 'boosts',
    'Недостаток характеристики': 'flaws',
    'Языки': 'languages',
    'Признаки': 'traits',
    'Редкость': 'rarity',
    'Источник': 'srcBook'
} as const
const sizeReplacement = {
    "Крошечный": 'tiny',
    "Маленький": 'small',
    "Средний": 'medium',
    "Большой": "large",
    "Огромный": 'huge',
    "Исполинский": 'gargantuan'
} as const
const rarityReplacement = {
    "Обычный": 'common',
    "Необычный": 'uncommon',
    "Редкий": 'rare'
} as const
const attributeReplacement = {
    "Сила": "str",
    "Ловкость": "dex",
    "Интеллект": "int",
    "Телосложение": "con",
    "Мудрость": "wis",
    "Харизма": "cha"
} as const
const attributesAbbrReplacement = {
    "Сил": "str",
    "Лвк": "dex",
    "Инт": "int",
    "Тел": "con",
    "Мдр": "wis",
    "Хар": "cha"
} as const
const defencesReplacement = {
    "КБ": "ac",
    "Стойкость": 'fortitude',
    "Рефлекс": "reflex",
    "Воля": "will"
} as const
const speedReplacement = {
    "рыт": "burrow",
    "кар": "climb",
    "пол": "fly",
    "пла": "swim"
} as const
const skillsRegex = /(Акробатик)|(Аркан)|(Атлетик)|(Ремесл)|(Обман)|(Дипломат)|(Запугиван)|(Медицин)|(Природ)|(Оккутильзм)|(Выступлен)|(Религ)|(Обществ)|(Скрытност)|(Выживан)|(Воровств)/g
const backgroundParagraphs = ["Источник:", "Особенность: ", "Вы обучены", "Ваши девиантные умения относятся к"];
const abilitiesNames = ["Интеллект", "Сила", "Мудрость", "Ловкость", "Харизма", "Телосложение"];

const backgrounds: backgroundType[] = [];
const spells: spellType[] = [];
const actions: actionType[] = [];
const feats: featType[] = [];
const creatures: creatureType[] = [];
const traits: Set<string> = new Set();
const paragraphs: Set<string> = new Set();
const tables: Map<string, { fullName: string; desc: string, dataType: 'table' }> = new Map();
const ancestries: ancestryType[] = [];
const allData: any[] = [];
let $: cheerio.CheerioAPI;

function prepareData(data: any): Data {
    for (const site of data.checked) {
        $ = cheerio.load(site.data);

        $('img[class*="action-"]').each((_, img) => {
            const tempSrc = img.attribs["src"]?.match(/(PF_action).+(?=.png)/g)?.[0];
            if (tempSrc) {
                img.attribs["src"] = allImgs.filter((item) => item.includes(tempSrc))[0];
            }
        });
        $("table").each((_, res) => {
            const id = $(res).prev().attr("id");
            if (!id) return
            if (!tables.has(id)) {
                $(res).find(".headerlink").remove();
                const fullName = $(res).find("caption .caption-text").prop("outerHTML")!;
                const desc = [...$(res).children(':not(caption)')].reduce((prev, next) => prev + $(next).prop('outerHTML'), '')
                tables.set(id, {fullName, desc, dataType: 'table'});
            }
        });
        prepareBackgrounds();
        prepareContentWithTraits();
    }
    allData.push(
        ...conditions,
        ...[...tables].map((val) => {
            return {id: val[0], ...val[1]};
        })
    );
    const tempData = {backgrounds, spells, actions, feats, creatures, ancestries};
    for (const arr of Object.values(tempData)) {
        for (const value of arr) {
            if (value?.desc) {
                const $ = cheerio.load(value.desc);
                $("a.internal, span[class^='c-']").each((_, el) => {
                    const href =
                        $(el)
                            .attr("href")
                            ?.match(/(?<=#).+/)?.[0] ?? $(el).attr("class");

                    const data = allData.find((v) => v.id === href) ?? null;
                    const className = data ? "std std-ref" : "";

                    const textContent = $(el).prop("textContent");
                    const dataId = data ? `data-id=${data.id}` : "";
                    const dataType = data ? `data-type=${data.dataType}` : ""
                    $(el).replaceWith(`<span class="card-link ${className}" ${dataId} ${dataType}>${textContent}</span>`);
                });
                value.desc = $("body").html()!;
            }
        }
    }
    return {
        ...tempData, tables: [...tables].map((a) => {
            return {id: a[0], desc: a[1].desc, dataType: a[1].dataType, fullName: a[1].fullName}
        }), allData, traits, paragraphs, conditions
    };
}

function prepareBackgrounds() {
    $('section[id^="bg"]').each((_, res) => {
        const {fullName, originalName, name} = getFullname($(res));
        const alltraits = getTraits($(res));
        const {attributeDesc, attributeValue} = getAttributeArray(res);
        let desc = "";
        $(res)
            .children("p")
            .each((_, item) => {
                const child = $(item);
                desc += $(child).prop("outerHTML");
            });
        const id = getId($(res))
        const skills = backgroundsManual.get(id)!
        const background: backgroundType = {
            dataType: 'background',
            fullName,
            originalName,
            name,
            attributeValue,
            attributeDesc,
            desc,
            feat: "",
            lore: "",
            srcBook: getSrc($(res)),
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
                traits.add($(el).prop("textContent")!);
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
        //There can be feats with id="skill", so we need to check this. Also, we don't want class features be there
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
    $('section.ancestry').each((_, res) => {
        const id = getId($(res))
        if (!allData.find((content) => content.id === id) && id) {
            const element = res.tagName === "span" ? $(res).parent() : $(res);
            const ancestry = prepareAncestry(element)
            ancestries.push(ancestry)
            allData.push(ancestry)
        }
    })
}

function prepareAncestry(el: cheerio.Cheerio<cheerio.Element>): ancestryType {
    const {fullName, name, originalName} = getFullname(el)

    function getAttrFromAside() {
        const aside = el.children('aside')
        const attributes: Record<string, any> = {
            hp: 0,
            size: 'medium' as const,
            speed: 25,
            traits: [] as string[],
            senses: [] as string[],
            srcBook: ['CoreBook'],
            rarity: 'common' as const,
            reach: 5,
            languages: {
                value: [] as string[]
            },
            additionalLanguages: {
                count: 0,
                value: [] as string[],
            },
            vision: 'normal',
            boosts: [],
            flaws: [],
            special: [] as { name: string, desc: string }[]
        }
        let currentProp = 'hp'
        for (const child of aside.children()) {
            const childSelect = $(child)
            const childTextContent = childSelect.prop('textContent')!
            if (childSelect.hasClass('rubric')) {

                const prop = textToAncestryProp[childTextContent as keyof typeof textToAncestryProp]
                if (prop) {
                    currentProp = prop
                } else {
                    if (childTextContent.includes('зрение')) {
                        attributes.senses = childTextContent
                        attributes.vision = childTextContent
                        currentProp = ""
                    } else {
                        attributes.special.push({name: childTextContent, desc: ''})
                        currentProp = "special"
                    }

                }
            } else if (currentProp !== "") {
                switch (currentProp) {
                    case "hp":
                    case "reach":
                    case "speed": {
                        attributes[currentProp] = parseInt(childTextContent)
                        break
                    }
                    case "size": {
                        attributes[currentProp] = sizeReplacement[childTextContent as keyof typeof sizeReplacement]
                        break
                    }
                    case "rarity": {
                        attributes[currentProp] = rarityReplacement[childTextContent as keyof typeof rarityReplacement]
                        break
                    }
                    case "srcBook": {
                        attributes[currentProp] = childTextContent.replace('Lost Omens ', 'Lost Omens: ').split(',').map((str) => str.match(/.*(?=pg)/gm)?.[0].trim() ?? "CoreBook")
                        break
                    }
                    case "traits": {
                        attributes[currentProp].push(childTextContent)
                        break
                    }
                    case "languages": {
                        const additionalLang = childTextContent.match(/\d/)
                        if (additionalLang) {
                            attributes.additionalLanguages.count = parseInt(additionalLang[0])
                        } else if (!childTextContent.match(/\s/)) {
                            attributes.languages.value.push(childTextContent)
                        }
                        break
                    }
                    case "boosts":
                    case "flaws": {
                        const abil = attributeReplacement[childTextContent as keyof typeof attributeReplacement] ? [attributeReplacement[childTextContent as keyof typeof attributeReplacement]] : ["any"]
                        attributes[currentProp].push(abil)
                        break
                    }
                    case "special": {
                        attributes.special.slice(-1)[0].desc = childTextContent
                        break
                    }
                }
            }
        }
        return attributes
    }

    const {
        special,
        hp,
        boosts,
        flaws,
        size,
        speed,
        traits,
        senses,
        rarity,
        srcBook,
        reach,
        languages,
        vision,
        additionalLanguages
    } = getAttrFromAside()
    return {
        fullName,
        name,
        originalName,
        dataType: 'ancestry',
        desc: getDescription(el),
        id: getId(el),
        hp,
        size,
        speed,
        traits,
        senses,
        rarity,
        srcBook,
        reach,
        boosts,
        flaws,
        languages,
        additionalLanguages,
        vision,
        special
    }
}

function prepareSpell(el: cheerio.Cheerio<cheerio.Element>): spellType {
    const {fullName, name, originalName, level} = getFullname(el);
    const traditionNode = el.children().filter((_, child) => !!$(child).prop("textContent")?.includes("Обычай: "));
    const tradition = traditionNode.length
        ? $(traditionNode)
            .prop("textContent")!
            .replace("Обычай: ", "")
            .split(", ")
            .filter((t) => t !== "")
            .map((t) => t.slice(0, 1).toUpperCase() + t.slice((1)))
        : [];
    const id = getId(el)
    const alltraits = getTraits(el);

    function getSave() {
        const manualSave = spellsManual.get(id)
        if (manualSave) {
            return manualSave.save
        }
        if (alltraits.includes('атака')) return ["ac"]
        const saveElem = el.children().filter((_, child) => !!$(child).prop("textContent")?.includes("Спасбросок: "))
        return saveElem.length ?
            [$(saveElem).prop("textContent")!.replace("Спасбросок: ", "").replace("простой ", "").replace(/((Вол)|(Сто)|(Реф))[а-я]*/gm, (_, p1: keyof typeof savesReplacement) => savesReplacement[p1])] : []
    }

    const save = getSave()
    return {
        dataType: "spell",
        fullName,
        name,
        originalName,
        type: fullName.includes("/ Закл") ? "Заклинание" : fullName.includes("/ Ф.чары") ? "Ф.чары" : fullName.includes("/ Фокус") ? "Фокус" : "Чары",
        level,
        traits: alltraits,
        desc: getDescription(el),
        rarity: getRarity(alltraits),
        tradition,
        srcBook: getSrc(el),
        action: getAction(el),
        castingType: getCastingType(el),
        id,
        save
    };
}

function prepareCreature(el: cheerio.Cheerio<cheerio.Element>): creatureType {
    const {fullName, name, originalName, level} = getFullname(el);
    const traits = getTraits(el)

    function getHP() {
        const child = el.children().filter((_, p) => $(p).prop("textContent")!.includes('ОЗ:'))
        if (!child.length) return 0
        return parseInt($(child).prop("textContent")!.replace("ОЗ:", ""))
    }

    function getSkills() {
        const child = el.children().filter((_, p) => $(p).prop("textContent")!.includes("Навыки:"))
        const skills: creatureType["skills"] = {
            "acr": 0,
            "arc": 0,
            "ath": 0,
            "cra": 0,
            "dec": 0,
            "dip": 0,
            "itm": 0,
            "med": 0,
            "nat": 0,
            "occ": 0,
            "prf": 0,
            "rel": 0,
            "soc": 0,
            "ste": 0,
            "sur": 0,
            "thi": 0
        }
        if (!child.length) return skills
        const skillsFromElem = child.prop('textContent')!.replace('Навыки: ', '').trim().split(',')
        for (const [key, skl] of Object.entries(skillsReplacement) as Entries<typeof skillsReplacement>) {
            const skill = skillsFromElem.find((v) => v.includes(key) && !v.includes('Знания'))
            if (skill) {
                const [_, sklValue] = skill.split(' ')
                skills[skl] = parseInt(sklValue)
            }
        }
        return skills
    }

    function getAttributes() {
        const attributes: creatureType["attributes"] = {
            "str": 0,
            "dex": 0,
            "int": 0,
            "con": 0,
            "cha": 0,
            "wis": 0
        }
        const child = el.children().filter((_, p) =>
            $(p).prop("textContent")?.match(/((Сил)|(Лвк)|(Тел)|(Хар)|(Инт)|(Мдр)) [+-]\d/gm)?.length === 6
        )
        if (!child.length) return attributes
        const attributesFromElem = child.prop('textContent')!.replace(/\n/gm, '').trim().split(',')

        for (const [key, attr] of Object.entries(attributesAbbrReplacement) as Entries<typeof attributesAbbrReplacement>) {
            const attribute = attributesFromElem.find((v) => v.includes(key))
            if (attribute) {
                const [_, attrValue] = attribute.split(' ')
                attributes[attr] = parseInt(attrValue)
            }
        }
        return attributes

    }

    function getDefences() {
        const defences: creatureType["defences"] = {
            ac: 0,
            fortitude: 0,
            reflex: 0,
            will: 0
        }
        const child = el.children().filter((_, p) => Object.keys(defencesReplacement).every((def) => $(p).prop('textContent')?.includes(def)))
        if (!child.length) return defences
        const defencesFromElement = child.prop('textContent')!.split(/[,;]/).map((v) => v.replace(/[\n:]/g, ''))
        for (const [key, def] of Object.entries(defencesReplacement) as Entries<typeof defencesReplacement>) {
            const defence = defencesFromElement.find((v) => v.includes(key))
            if (defence) {
                const [_, defValue] = defence.split(' ')
                defences[def] = parseInt(defValue)
            }
        }
        return defences
    }

    function getSpeed() {
        const speed: creatureType["speed"] = {
            burrow: 0,
            climb: 0,
            common: 0,
            fly: 0,
            swim: 0
        }
        const child = el.children().filter((_, p) => !!$(p).prop('textContent')?.includes('Скорость:'))
        if (!child.length) return speed
        const speedFromElement = child.prop('textContent')!.replace(/(Скорость:)|(футов)/g, '').split(',').map((s) => s.trim())
        for (const spd of speedFromElement) {
            const specialSpeed = (Object.entries(speedReplacement) as Entries<typeof speedReplacement>).find((v) => spd.includes(v[0]))
            if (specialSpeed) {
                const [_, spdVal] = spd.split(' ')
                speed[specialSpeed[1]] = parseInt(spdVal)
            } else {
                speed.common = parseInt(spd)
            }
        }
        return speed

    }

    function getPerceptionAndSenses() {
        let perception: creatureType["perception"] = 0
        const senses: creatureType["senses"] = []
        const child = el.children().filter((_, p) => !!$(p).prop('textContent')?.includes('Восприятие:'))
        if (!child.length) return {perception, senses}
        const percepAndSenses = child.prop('textContent')!.replace('Восприятие:', '').split(';').map((v) => v.includes(',') ? v.split(',') : v)
        perception = parseInt(percepAndSenses[0] as string)
        const sensesSlice = percepAndSenses.slice(1)

        return {perception, senses}
    }

    const {perception, senses} = getPerceptionAndSenses()
    return {
        dataType: "creature",
        id: getId(el),
        fullName,
        name,
        originalName,
        level,
        hp: getHP(),
        attributes: getAttributes(),
        defences: getDefences(),
        desc: getDescription(el),
        languages: [],
        perception,
        traits,
        rarity: getRarity(traits),
        senses,
        skills: getSkills(),
        speed: getSpeed(),
        srcBook: getSrc(el),
    };

}

function prepareFeat(el: cheerio.Cheerio<cheerio.Element>): featType {
    const {fullName, name, originalName, level} = getFullname(el);
    const alltraits = getTraits(el);
    const id = getId(el);
    const archetype = id.includes("arch-feat") ? getArchetype(el) : "";

    function getSkills() {
        if (name === 'Акробатическое выступление') {
            console.log(alltraits, !alltraits.includes("Навык"))
        }
        if (!alltraits.includes("Навык")) return []
        const requirementsElem = el.children().filter((_, p) => !!$(p).prop("textContent")?.includes('Предварительные условия:'))
        if (name === 'Акробатическое выступление') {
            console.log(!requirementsElem.length)
        }
        if (!requirementsElem.length) return []
        if (name === 'Акробатическое выступление') {
            console.log(requirementsElem.prop("textContent"))
        }
        return requirementsElem.prop("textContent")!.match(skillsRegex)?.map((d) => skillsReplacement[d as keyof typeof skillsReplacement]) ?? []

    }

    return {
        dataType: 'feat',
        fullName,
        name,
        originalName,
        level,
        traits: alltraits,
        rarity: getRarity(alltraits),
        desc: getDescription(el),
        srcBook: getSrc(el),
        action: getAction(el),
        id,
        archetype,
        skills: getSkills()
    };
}

function prepareAction(el: cheerio.Cheerio<cheerio.Element>): actionType {
    const {fullName, name, originalName} = getFullname(el);
    return {
        dataType: "action",
        fullName,
        name,
        traits: getTraits(el),
        originalName,
        rarity: getRarity(getTraits(el)),
        desc: getDescription(el),
        srcBook: getSrc(el),
        action: getAction(el),
        id: getId(el),
    };
}

function getTraits(element: cheerio.Cheerio<cheerio.Element>) {
    return (
        $(element)
            .find("h1 + ul, h2 + ul, h3 + ul, h4 + ul, h5 + ul, h6 + ul")
            ?.text()
            ?.split("\n")
            .filter((t) => t !== "")
            .map((t) => t.slice(0, 1).toUpperCase() + t.slice(1)) || []
    );
}

function getFullname(element: cheerio.Cheerio<cheerio.Element>) {
    const header = $(element).find("h1, h2, h3, h4, h5, h6");
    const idElem = header.find(".headerlink");
    idElem.remove();
    return {
        fullName: header.html()!,
        name: header
            .text()
            .replace(/\((?<=\().+/, "")
            .trim(),
        originalName:
            header
                .text()
                .match(/(?<=\()((?<!\))[a-z-A-Z ']+)/)?.[0]
                .trim() || "",
        level: parseInt(header.text().match(/-?\d{1,2}/g)?.[0] || "0"),
    };
}

function getAttributeArray(element: cheerio.Element) {
    const $ = cheerio.load(element);
    const child = $("p").filter((_, el) => $(el).text().includes("характеристик") && backgroundParagraphs.every((parag) => !$(el).text().includes(parag)))[0]
    const innerHTML = $(child).prop("innerHTML")!;
    const attribParagraph = $(child).prop("outerHTML");
    const attributeDesc = $(child).prop("textContent")!;
    let attributeValue: string[][] = [];
    const abilities = [...innerHTML.matchAll(/((?<=<strong>)[а-яА-Я]*)|((?<=другое )[а-яА-Я]*)/g)].map((v) => v[0].replace(/^./, v[0][0].toUpperCase()));
    for (const key of abilities.keys()) {
        abilities[key] = abilitiesNames.filter((item) => item.includes(abilities[key].slice(0, 3)))[0] || "Свободное";
    }
    let numOfAbilities: RegExpMatchArray | null | number = innerHTML.match(/\d|(\sдва\s)|(\sодно\s)|(\sтри\s)/g);
    if (numOfAbilities) {
        numOfAbilities = nameOfNum[numOfAbilities[0]];
        const tempAbil = [];
        let tempInd = 0;
        for (const ind of Array(numOfAbilities).keys()) {
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
    return {attribParagraph, attributeDesc, attributeValue};
}

function getRarity(allTraits: string[]): string {
    const rarityStr = allTraits.filter((t) => ["Необычный", "Редкий"].includes(t))[0] ?? "Обычный";
    return rarityStr.charAt(0).toUpperCase() + rarityStr.slice(1);
}

function getSrc(element: cheerio.Cheerio<cheerio.Element>): generalContent["srcBook"] {
    const srcElem = element.children("p").filter((_, child) => $(child).prop("textContent")!.includes("Источник: "))?.[0];
    const srcTextContent = $(srcElem)?.prop("textContent")?.replace("Источник: ", "")
    // const page = srcTextContent ? parseInt(srcTextContent.match(/(?<=pg. ).*/gm)![0]) : 0
    return srcTextContent ? srcTextContent.split(',').map((str) => str.replace('Lost Omens ', 'Lost Omens: ').match(/.*(?=pg)/gm)?.[0].trim() ?? 'CoreBook') : ['CoreBook']
}

function getCastingType(element: cheerio.Cheerio<cheerio.Element>): string[] {
    const castingTypeElem = element.children("p").filter((_, child) => $(child).prop("textContent")!.includes("Сотворение: "))?.[0];
    return (
        $(castingTypeElem)
            ?.prop("textContent")
            ?.match(/материальный|жестовый|словесный/gm)?.map((m) => m.slice(0, 1).toUpperCase() + m.slice(1)) || []
    );
}

function getDescription(element: cheerio.Cheerio<cheerio.Element>): string {
    return element
        .children(":not(h1, h2, h3, h4, h5, h6, span, aside, .traits, section)")
        .map((_, child) => $(child).prop("outerHTML")!.trim())
        .toArray()
        .join("");
}

function getAction(element: cheerio.Cheerio<cheerio.Element>): string {
    const action = element.find("img")?.first()?.attr("alt") || ""
    return action.length ? action.slice(0, 1).toUpperCase() + action.slice(1) : ""
}

function getId(element: cheerio.Cheerio<cheerio.Element>): string {
    const firstSpan = element.children("span").first();
    return firstSpan.attr("id")?.match(/\d+/) ? element.attr("id")! : firstSpan.attr("id")!;
}

function getArchetype(element: cheerio.Cheerio<cheerio.Element>): string {
    const id = element.parents("[id^=archetype]").children("h1, h2, h3, h4, h5, h6");
    const multiclass = element.parents("[id^=archetype]").attr("class")!.includes("multiclass") ? "Мультикласс " : "";
    id.find(".headerlink").remove();
    return (multiclass + id.prop("textContent")!.replace("(Archetype)", "")).trim();
}

function prepareFilters(data: Data): globalFilter {
    const action: filterProps = {
        isDeep: false,
        name: "Действие",
        selection: "singleRadio",
        value: [],
        options: ["Одиночное действие", "Активность из 2-х действий", "Активность из 3-х действий", "Реакция", "Свободное действие"],
        disabled: [],
        excluded: [],
        hasSearch: false,
        search: "",
        defaultValue: [],
    };
    const rarity: filterProps = {
        isDeep: false,
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
        srcBook: {
            isDeep: false,
            name: 'Источник',
            defaultValue: [],
            disabled: [],
            excluded: [],
            hasSearch: false,
            search: '',
            selection: "multipleRadio",
            options: [...new Set(data.backgrounds.map((content) => content.srcBook).flat().flat())].sort((a, b) => a.localeCompare(b)),
            value: []
        },
        attributeValue: {
            isDeep: false,
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
        traits: {
            isDeep: false,
            defaultValue: [],
            disabled: [],
            excluded: [],
            hasSearch: false,
            name: "Признаки",
            selection: "multipleRadio",
            options: [...new Set(data.backgrounds.map((content) => content.traits).flat())].sort((a, b) => a.localeCompare(b)),
            search: '',
            value: [],
        },
        skills: {
            isDeep: false,
            defaultValue: [],
            disabled: [],
            excluded: [],
            hasSearch: false,
            name: "Навыки",
            search: "",
            selection: "multipleRadio",
            value: [],
            multiply: false,
            options: ["acr", "arc", "ath", "prf", "occ", "thi", "cra", "rel", "nat", "dip", "dec", "itm", "soc", "ste", "sur"],
            optionsName: {
                acr: "Акробатика",
                arc: "Аркана",
                ath: "Атлетика",
                prf: "Выступление",
                occ: "Оккультизм",
                thi: "Воровство",
                cra: "Ремесло",
                rel: "Религия",
                nat: "Природа",
                dip: "Дипломатия",
                dec: "Обман",
                itm: "Запугивание",
                soc: "Общество",
                ste: "Скрытность",
                sur: 'Выживание'
            }
        }
    };
    const spells: spellsFilter = {
        traits: {
            isDeep: false,
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
        srcBook: {
            isDeep: false,
            name: 'Источник',
            defaultValue: [],
            disabled: [],
            excluded: [],
            hasSearch: false,
            search: '',
            selection: "multipleRadio",
            options: [...new Set(data.spells.map((content) => content.srcBook).flat())].sort((a, b) => a.localeCompare(b)),
            value: []
        },
        rarity,
        type: {
            isDeep: false,
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
            isDeep: false,
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
            isDeep: false,
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
            isDeep: false,
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
            isDeep: false,
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
    const ancestries: ancestryFilter = {
        rarity,
        boosts: {
            isDeep: false,
            name: 'Повышения Характеристики',
            defaultValue: [],
            disabled: [],
            excluded: [],
            hasSearch: false,
            search: '',
            selection: "multipleRadio",
            options: ["str", "dex", "con", "int", "wis", "cha"],
            value: [],
            optionsName: {
                "str": "Сила",
                "dex": "Ловкость",
                "con": "Телосложение",
                "int": "Интеллект",
                "wis": "Мудрость",
                "cha": "Харизма"
            }
        },
        flaws: {
            isDeep: false,
            name: 'Недостаток Характеристики',
            defaultValue: [],
            disabled: [],
            excluded: [],
            hasSearch: false,
            search: '',
            selection: "multipleRadio",
            options: ["str", "dex", "con", "int", "wis", "cha"],
            value: [],
            optionsName: {
                "str": "Сила",
                "dex": "Ловкость",
                "con": "Телосложение",
                "int": "Интеллект",
                "wis": "Мудрость",
                "cha": "Харизма"
            }
        },
        traits: {
            isDeep: false,
            value: [],
            defaultValue: [],
            disabled: [],
            excluded: [],
            hasSearch: false,
            name: 'Признаки',
            options: [...new Set(data.ancestries.map((content) => content.traits).flat())].sort((a, b) => a.localeCompare(b)),
            selection: "multipleRadio",
            search: '',
        },
        srcBook: {
            isDeep: false,
            name: 'Источник',
            defaultValue: [],
            disabled: [],
            excluded: [],
            hasSearch: false,
            search: '',
            selection: "multipleRadio",
            options: [...new Set(data.ancestries.map((content) => content.srcBook).flat())].sort((a, b) => a.localeCompare(b)),
            value: []
        },
        hp: {
            isDeep: false,
            name: "ОЗ",
            value: [Math.min(...data.ancestries.map((cr) => cr.hp)).toString(), Math.max(...data.ancestries.map((cr) => cr.hp)).toString()],
            defaultValue: [Math.min(...data.ancestries.map((cr) => cr.hp)).toString(), Math.max(...data.ancestries.map((cr) => cr.hp)).toString()],
            disabled: [],
            excluded: [],
            hasSearch: false,
            search: "",
            selection: "minMax",
            max: Math.max(...data.ancestries.map((cr) => cr.hp)),
            min: Math.min(...data.ancestries.map((cr) => cr.hp))
        }
    }
    const feats: featFilter = {
        srcBook: {
            isDeep: false,
            name: 'Источник',
            defaultValue: [],
            disabled: [],
            excluded: [],
            hasSearch: false,
            search: '',
            selection: "multipleRadio",
            options: [...new Set(data.feats.map((content) => content.srcBook).flat())].sort((a, b) => a.localeCompare(b)),
            value: []
        },
        skills: {
            isDeep: false,
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
            isDeep: false,
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
            isDeep: false,
            name: "Уровень",
            selection: "singleRadio",
            value: [],
            options: [...new Set(data.feats.map((content) => content.level))].sort((a, b) => a - b).map((val) => val.toString()),
            disabled: [],
            excluded: [],
            search: "",
            hasSearch: false,
            defaultValue: [],
        },
        action,
        archetype: {
            isDeep: false,
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
        srcBook: {
            isDeep: false,
            name: 'Источник',
            defaultValue: [],
            disabled: [],
            excluded: [],
            hasSearch: false,
            search: '',
            selection: "multipleRadio",
            options: [...new Set(data.actions.map((content) => content.srcBook).flat())].sort((a, b) => a.localeCompare(b)),
            value: []
        },
        traits: {
            isDeep: false,
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
        rarity,
        srcBook: {
            isDeep: false,
            name: 'Источник',
            defaultValue: [],
            disabled: [],
            excluded: [],
            hasSearch: false,
            search: '',
            selection: "multipleRadio",
            options: [...new Set(data.creatures.map((content) => content.srcBook).flat())].sort((a, b) => a.localeCompare(b)),
            value: []
        },
        traits: {
            isDeep: false,
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
        hp: {
            isDeep: false,
            name: "ОЗ",
            value: [Math.min(...data.creatures.map((cr) => cr.hp)).toString(), Math.max(...data.creatures.map((cr) => cr.hp)).toString()],
            defaultValue: [Math.min(...data.creatures.map((cr) => cr.hp)).toString(), Math.max(...data.creatures.map((cr) => cr.hp)).toString()],
            disabled: [],
            excluded: [],
            hasSearch: false,
            search: "",
            selection: "minMax",
            max: Math.max(...data.creatures.map((cr) => cr.hp)),
            min: Math.min(...data.creatures.map((cr) => cr.hp))
        },
        level: {
            isDeep: false,
            name: 'Уровень',
            value: [],
            options: [...new Set(data.creatures.map((content) => content.level))].sort((a, b) => a - b).map((val) => val.toString()),
            defaultValue: [],
            disabled: [],
            excluded: [],
            hasSearch: false,
            selection: "singleRadio",
            search: ""
        },

        attributes: {
            name: 'Характеристики',
            isDeep: true,
            selection: "minMax",
            optionsName: {
                "str": "Сила",
                "dex": "Ловкость",
                "con": "Телосложение",
                "int": "Интеллект",
                "wis": "Мудрость",
                "cha": "Харизма"
            },
            options: {
                str: {
                    max: Math.max(...data.creatures.map((cr) => cr.attributes.str)),
                    min: Math.min(...data.creatures.map((cr) => cr.attributes.str))
                },
                dex: {
                    max: Math.max(...data.creatures.map((cr) => cr.attributes.dex)),
                    min: Math.min(...data.creatures.map((cr) => cr.attributes.dex))
                },
                int: {
                    max: Math.max(...data.creatures.map((cr) => cr.attributes.int)),
                    min: Math.min(...data.creatures.map((cr) => cr.attributes.int))
                },
                con: {
                    max: Math.max(...data.creatures.map((cr) => cr.attributes.con)),
                    min: Math.min(...data.creatures.map((cr) => cr.attributes.con))
                },
                wis: {
                    max: Math.max(...data.creatures.map((cr) => cr.attributes.wis)),
                    min: Math.min(...data.creatures.map((cr) => cr.attributes.wis))
                },
                cha: {
                    max: Math.max(...data.creatures.map((cr) => cr.attributes.cha)),
                    min: Math.min(...data.creatures.map((cr) => cr.attributes.cha))
                }
            },
            defaultValue: {
                str: [Math.min(...data.creatures.map((cr) => cr.attributes.str)).toString(), Math.max(...data.creatures.map((cr) => cr.attributes.str)).toString()],
                dex: [Math.min(...data.creatures.map((cr) => cr.attributes.dex)).toString(), Math.max(...data.creatures.map((cr) => cr.attributes.dex)).toString()],
                int: [Math.min(...data.creatures.map((cr) => cr.attributes.int)).toString(), Math.max(...data.creatures.map((cr) => cr.attributes.int)).toString()],
                con: [Math.min(...data.creatures.map((cr) => cr.attributes.con)).toString(), Math.max(...data.creatures.map((cr) => cr.attributes.con)).toString()],
                wis: [Math.min(...data.creatures.map((cr) => cr.attributes.wis)).toString(), Math.max(...data.creatures.map((cr) => cr.attributes.wis)).toString()],
                cha: [Math.min(...data.creatures.map((cr) => cr.attributes.cha)).toString(), Math.max(...data.creatures.map((cr) => cr.attributes.cha)).toString()]
            },
            value: {
                str: [Math.min(...data.creatures.map((cr) => cr.attributes.str)).toString(), Math.max(...data.creatures.map((cr) => cr.attributes.str)).toString()],
                dex: [Math.min(...data.creatures.map((cr) => cr.attributes.dex)).toString(), Math.max(...data.creatures.map((cr) => cr.attributes.dex)).toString()],
                int: [Math.min(...data.creatures.map((cr) => cr.attributes.int)).toString(), Math.max(...data.creatures.map((cr) => cr.attributes.int)).toString()],
                con: [Math.min(...data.creatures.map((cr) => cr.attributes.con)).toString(), Math.max(...data.creatures.map((cr) => cr.attributes.con)).toString()],
                wis: [Math.min(...data.creatures.map((cr) => cr.attributes.wis)).toString(), Math.max(...data.creatures.map((cr) => cr.attributes.wis)).toString()],
                cha: [Math.min(...data.creatures.map((cr) => cr.attributes.cha)).toString(), Math.max(...data.creatures.map((cr) => cr.attributes.cha)).toString()]
            },
            excluded: [],
            hasSearch: false,
            search: '',
            disabled: {
                str: [],
                dex: [],
                int: [],
                con: [],
                wis: [],
                cha: []
            }
        },
        skills: {
            defaultValue: {
                "acr": [Math.min(...data.creatures.map((cr) => cr.skills.acr)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.acr)).toString()],
                "arc": [Math.min(...data.creatures.map((cr) => cr.skills.arc)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.arc)).toString()],
                "ath": [Math.min(...data.creatures.map((cr) => cr.skills.ath)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.ath)).toString()],
                "cra": [Math.min(...data.creatures.map((cr) => cr.skills.cra)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.cra)).toString()],
                "dec": [Math.min(...data.creatures.map((cr) => cr.skills.dec)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.dec)).toString()],
                "dip": [Math.min(...data.creatures.map((cr) => cr.skills.dip)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.dip)).toString()],
                "itm": [Math.min(...data.creatures.map((cr) => cr.skills.itm)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.itm)).toString()],
                "med": [Math.min(...data.creatures.map((cr) => cr.skills.med)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.med)).toString()],
                "nat": [Math.min(...data.creatures.map((cr) => cr.skills.nat)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.nat)).toString()],
                "occ": [Math.min(...data.creatures.map((cr) => cr.skills.occ)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.occ)).toString()],
                "prf": [Math.min(...data.creatures.map((cr) => cr.skills.prf)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.prf)).toString()],
                "rel": [Math.min(...data.creatures.map((cr) => cr.skills.rel)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.rel)).toString()],
                "soc": [Math.min(...data.creatures.map((cr) => cr.skills.soc)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.soc)).toString()],
                "ste": [Math.min(...data.creatures.map((cr) => cr.skills.ste)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.ste)).toString()],
                "sur": [Math.min(...data.creatures.map((cr) => cr.skills.sur)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.sur)).toString()],
                "thi": [Math.min(...data.creatures.map((cr) => cr.skills.thi)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.thi)).toString()]
            },
            disabled: {
                "acr": [],
                "arc": [],
                "ath": [],
                "cra": [],
                "dec": [],
                "dip": [],
                "itm": [],
                "med": [],
                "nat": [],
                "occ": [],
                "prf": [],
                "rel": [],
                "soc": [],
                "ste": [],
                "sur": [],
                "thi": []
            },
            excluded: [],
            hasSearch: false,
            isDeep: true,
            name: 'Навыки',
            options: {
                "acr": {
                    min: Math.min(...data.creatures.map((cr) => cr.skills.acr)),
                    max: Math.max(...data.creatures.map((cr) => cr.skills.acr))
                },
                "arc": {
                    min: Math.min(...data.creatures.map((cr) => cr.skills.arc)),
                    max: Math.max(...data.creatures.map((cr) => cr.skills.arc))
                },
                "ath": {
                    min: Math.min(...data.creatures.map((cr) => cr.skills.ath)),
                    max: Math.max(...data.creatures.map((cr) => cr.skills.ath))
                },
                "cra": {
                    min: Math.min(...data.creatures.map((cr) => cr.skills.cra)),
                    max: Math.max(...data.creatures.map((cr) => cr.skills.cra))
                },
                "dec": {
                    min: Math.min(...data.creatures.map((cr) => cr.skills.dec)),
                    max: Math.max(...data.creatures.map((cr) => cr.skills.dec))
                },
                "dip": {
                    min: Math.min(...data.creatures.map((cr) => cr.skills.dip)),
                    max: Math.max(...data.creatures.map((cr) => cr.skills.dip))
                },
                "itm": {
                    min: Math.min(...data.creatures.map((cr) => cr.skills.itm)),
                    max: Math.max(...data.creatures.map((cr) => cr.skills.itm))
                },
                "med": {
                    min: Math.min(...data.creatures.map((cr) => cr.skills.med)),
                    max: Math.max(...data.creatures.map((cr) => cr.skills.med))
                },
                "nat": {
                    min: Math.min(...data.creatures.map((cr) => cr.skills.nat)),
                    max: Math.max(...data.creatures.map((cr) => cr.skills.nat))
                },
                "occ": {
                    min: Math.min(...data.creatures.map((cr) => cr.skills.occ)),
                    max: Math.max(...data.creatures.map((cr) => cr.skills.occ))
                },
                "prf": {
                    min: Math.min(...data.creatures.map((cr) => cr.skills.prf)),
                    max: Math.max(...data.creatures.map((cr) => cr.skills.prf))
                },
                "rel": {
                    min: Math.min(...data.creatures.map((cr) => cr.skills.rel)),
                    max: Math.max(...data.creatures.map((cr) => cr.skills.rel))
                },
                "soc": {
                    min: Math.min(...data.creatures.map((cr) => cr.skills.soc)),
                    max: Math.max(...data.creatures.map((cr) => cr.skills.soc))
                },
                "ste": {
                    min: Math.min(...data.creatures.map((cr) => cr.skills.ste)),
                    max: Math.max(...data.creatures.map((cr) => cr.skills.ste))
                },
                "sur": {
                    min: Math.min(...data.creatures.map((cr) => cr.skills.sur)),
                    max: Math.max(...data.creatures.map((cr) => cr.skills.sur))
                },
                "thi": {
                    min: Math.min(...data.creatures.map((cr) => cr.skills.thi)),
                    max: Math.max(...data.creatures.map((cr) => cr.skills.thi))
                }
            },
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
            },
            search: '',
            selection: 'minMax',
            value: {
                "acr": [Math.min(...data.creatures.map((cr) => cr.skills.acr)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.acr)).toString()],
                "arc": [Math.min(...data.creatures.map((cr) => cr.skills.arc)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.arc)).toString()],
                "ath": [Math.min(...data.creatures.map((cr) => cr.skills.ath)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.ath)).toString()],
                "cra": [Math.min(...data.creatures.map((cr) => cr.skills.cra)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.cra)).toString()],
                "dec": [Math.min(...data.creatures.map((cr) => cr.skills.dec)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.dec)).toString()],
                "dip": [Math.min(...data.creatures.map((cr) => cr.skills.dip)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.dip)).toString()],
                "itm": [Math.min(...data.creatures.map((cr) => cr.skills.itm)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.itm)).toString()],
                "med": [Math.min(...data.creatures.map((cr) => cr.skills.med)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.med)).toString()],
                "nat": [Math.min(...data.creatures.map((cr) => cr.skills.nat)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.nat)).toString()],
                "occ": [Math.min(...data.creatures.map((cr) => cr.skills.occ)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.occ)).toString()],
                "prf": [Math.min(...data.creatures.map((cr) => cr.skills.prf)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.prf)).toString()],
                "rel": [Math.min(...data.creatures.map((cr) => cr.skills.rel)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.rel)).toString()],
                "soc": [Math.min(...data.creatures.map((cr) => cr.skills.soc)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.soc)).toString()],
                "ste": [Math.min(...data.creatures.map((cr) => cr.skills.ste)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.ste)).toString()],
                "sur": [Math.min(...data.creatures.map((cr) => cr.skills.sur)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.sur)).toString()],
                "thi": [Math.min(...data.creatures.map((cr) => cr.skills.thi)).toString(), Math.max(...data.creatures.map((cr) => cr.skills.thi)).toString()]
            },
        }

    };
    return {backgrounds, spells, feats, actions, creatures, ancestries};
}

export const readyData = prepareData(data);
export const filters = prepareFilters(readyData);
