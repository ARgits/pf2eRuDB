import type {
  actionType,
  ancestryType,
  backgroundType,
  creatureType, featType,
  generalContent,
  notParsedContent,
  rawRuData,
  spellType,
} from "@types"
import type { AONBase, AONarmor, AONbackground, AONcreature, AONspell, AONfeat, AONaction, AONweapon, AONancestry, AONarchetype } from "../../AONtypes.ts"
import * as cheerio from "cheerio"
import { Element } from "node_modules/domhandler/lib/esm/node"
const ruNames = (await import("../../RuTerms.json", {with: {type: "json"}})).default as Record<string, string>
const fs = await import("fs")
const files = fs.readdirSync("src/data/manualData/AON")
const AONdata: AONBase[] = []

for (const file of files) {
  const arr = (await import(`../../../src/data/manualData/AON/${file}`, {with: {type: "json"}})).default as AONBase[]
    
  AONdata.push(...arr)
    
}
const data = (await import("./data.json", {with: {type: "json"}})).default as rawRuData
const imgUrlArray = [
  "/PF_action_1.webp",
  "/PF_action_2.webp",
  "/PF_action_3.webp",
  "/PF_action_free.webp",
  "/PF_action_reaction.webp"
]
const actionMap=<Record<string,string[]>>{
  "1 hour":["1 hour"],
  "1 minute":["1 minute"],
  "10 minutes":["10 minutes"],
  "30 minutes":["30 minutes"],
  "5 minutes":["5 minutes"],
  "single action or two actions":["single action","two actions"],
  "reaction":["reaction"],
  "free action":["free action"],
  "single action":["single action"],
  "two actions":["two actions"],
  "single action to two actions":["single action","two actions"],
  "single action to three actions":["single action","two actions","three actions"],
  "two actions or three actions":["two actions","three actions"],
  "two actions to 2 rounds":["two actions", "three actions","two rounds"],
  "three actions":["three actions"],
  "<i>nethys note: no cast time was printed</i>":["none"],
  "reaction or two actions":["reaction","two actions"],
  "none":["none"],
  "free action or one action":["free action","single action"],
  "reaction or one action":["reaction","single action"],
  "single action or more actions":["single action","two actions","three actions"],
}
const wrongComponent = ["1 hour", "1 minute", "10 minutes", "<i>Nethys Note: No cast time was printed</i>"]
const background: backgroundType[] = []
const spell: spellType[] = []
const action: actionType[] = []
const feat: featType[] = []
const creature: creatureType[] = []
const trait: Set<string> = new Set()
const paragraph: Set<string> = new Set()
const table: Map<string, {
  fullName: string;
  description: string;
  data_type: "table" 
}> = new Map()
const ancestry: ancestryType[] = []
const notParsedContent: notParsedContent[] = []
const idSet: Set<string> = new Set()
let $: cheerio.CheerioAPI

export function createData(): {
  spell: spellType[]
  background: backgroundType[]
  ancestry: ancestryType[]
  feat: featType[]
  creature: creatureType[]
  action: actionType[],
  notParsedContent: notParsedContent[]
} {
  for (const site of data.checked) {
    $ = cheerio.load(site.data)
    $("img[class*=\"action-\"]").each((_, img) => {
      const tempSrc = img.attribs["src"]?.match(/(PF_action).+(?=.png)/g)?.[0]
      if (tempSrc) {
        img.attribs["src"] = imgUrlArray.filter((item) => item.includes(tempSrc))[0]
      }
    })
    for (const aExt of $("h1 > a.external, h2 > a.external, h3 > a.external, h4 > a.external, h5 > a.external, h6 > a.external").toArray()) {
      const content = AONdata.find(s => `https://2e.aonprd.com${s.url}` === aExt.attribs["href"])
      if (content) {
        if (content.category === "spell") {
          addSpell({
            elem: aExt,
            ruSite: site.site,
            item: content as unknown as AONspell 
          })
        }
        else if (content.category === "background") {
          addBackground({
            elem: aExt,
            ruSite: site.site,
            item: content as unknown as AONbackground 
          })
        }
        else if (content.category === "feat") {
          addFeat({
            elem: aExt,
            ruSite: site.site,
            item: content as unknown as AONfeat 
          })
        }
        else if (content.category === "action") {
          addAction({
            elem: aExt,
            ruSite: site.site,
            item: content as unknown as AONaction 
          })
        }
        else if (content.category === "ancestry") {
          addAncestry({
            elem: aExt,
            ruSite: site.site,
            item: content as unknown as AONancestry 
          })
        }
        else if (content.category === "creature") {
          addCreature({
            elem: aExt,
            ruSite: site.site,
            item: content as unknown as AONcreature 
          })
        } else {
          addNotParsedContent({
            elem: aExt,
            ruSite: site.site,
            item: content 
          })
        }
      }
    }
  }
  for (const AONitem of AONdata) {
    if (!idSet.has(AONitem.id)&&!AONitem.exclude_from_search) {
      switch (AONitem.category) {
          case "feat": { 
            const item = AONitem as unknown as AONfeat
            addFeat({item})
            break
          }
          case "spell": { 
            const item = AONitem as unknown as AONspell
            addSpell({item})
            break
          }
          case "creature": { 
            const item = AONitem as unknown as AONcreature
            addCreature({item})
            break
          }
          case "action": { 
            const item = AONitem as unknown as AONaction
            addAction({item})
            break
          }
          case "ancestry": {
            const item = AONitem as unknown as AONancestry
            addAncestry({item})
            break
          }
          case "background": {
            const item = AONitem as unknown as AONbackground
            addBackground({item})
            break
          }
          default: {
            addNotParsedContent({item:AONitem})
          }
      }
    }
  }
  const result = {
    spell: {
      russian: spell.length,
      AON: AONdata.filter(s => s.category === "spell").length
    },
    background: {
      russian: background.length,
      AON: AONdata.filter(s => s.category === "background").length
    },
    action: {
      russian: action.length,
      AON: AONdata.filter(s => s.category === "action").length
    },
    ancestry: {
      russian: ancestry.length,
      AON: AONdata.filter(s => s.category === "ancestry").length
    },
    feat: {
      russian: feat.length,
      AON: AONdata.filter(s => s.category === "feat").length
    },
    creature: {
      russian: creature.length,
      AON: AONdata.filter(s => s.category === "creature").length
    }
  }
    
  console.table(result)
  return {
    spell,
    background,
    ancestry,
    feat,
    creature,
    action,
    notParsedContent 
  }
}

function getName(elem?: Element, item?: AONBase) {
  if (!elem) return item ? ruNames[`${item.category}.${item.name?.toLowerCase()}`] ?? "" : ""
  try {
    return $(elem)
        .parent()
        .prop("textContent")!
        .match(/.*?(?=\()/g)![0]
        .replace(/c/g, "с")
        .replace(/C/g, "С")
        .trim() as string
  }
  catch (e) {
    if(e instanceof Error){
      console.error(e.message)
    }
  }
  return ""

}

function getRuUrl(elem?: Element, ruSite?: string) {
  if (!elem || !ruSite)
    return "";

  if (elem.tagName === "a" && $(elem).hasClass("internal")) {
    try {
      const href = elem.attribs["href"]
      return (new URL(href, ruSite)).href
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }
  return (ruSite + "#" + getId(elem));
}

function getDescription(elem?: Element, ruSite?: string) {
  if (!elem) return ""
  const desc: string[] = []
  $(elem)
      .closest("section")
      .children("p, hr, div, p+ul, table")
      .each((_, el) => {
        $(el).find("a.internal")
            .each((_, e) => {
              if (ruSite) {
                $(e).replaceWith(`<button data-id="${getRuUrl(e, ruSite)}" data-name="${$(e).text()}">${$(e).text()}</button>`)
              }
            })
        desc.push($(el).prop("outerHTML")!)
      })
  return desc.join("\n")
}
function getId(elem?: Element) {
  if (!elem) return "0"
  const htmlId = $(elem).parent()
      .siblings("span[id]")
      .prop("id")
  if (htmlId && !htmlId.match(/id[0-9]+/)) {
    return htmlId
  }
  return $(elem).siblings("a.headerlink")
      .prop("href")!.replace("#", "")
}
function addSpell({ elem, ruSite, item }: {
  elem?: Element,
  ruSite?: string,
  item: AONspell 
}) {
  if (item.category === "spell") {
    if (!idSet.has(item.id)) {
      spell.push({
        aon_id: item.id,
        aon_url: `https://2e.aonprd.com${item.url}`,
        action: actionMap[item.actions?.trim().toLowerCase()]??["none"],
        casting_type: item.component?.filter((c) => !wrongComponent.includes(c)).map(s => s.toLowerCase()) || [],
        data_type: "spell",
        description: getDescription(elem, ruSite),
        external_ru_url: getRuUrl(elem, ruSite),
        id: `${item.id}-${getId(elem)}`,
        ru_id: getId(elem),
        is_translate_raw: false,
        level: item.level,
        name: getName(elem, item),
        original_desc: item.markdown,
        original_name: item.name,
        rarity: (item.rarity.toLowerCase() as generalContent["rarity"]) || "common",
        save: item["saving_throw"] || "",
        source: item.source || [],
        tradition: item.tradition?.map(s => s.toLowerCase() as "Divine" | "Occult" | "Arcane" | "Primal" | "Elemental") || [],
        trait: item.trait?.map(f => f.toLowerCase()) || [],
        spell_type: item["spell_type"],
        remaster_id: item.remaster_id ?? [],
        legacy_id: item.legacy_id ?? [],
        release_date:item.release_date??"",
      })
      idSet.add(item.id)
      return true
    }
  }
  return false
}

function addBackground({ elem, ruSite, item }: {
  elem?: Element,
  ruSite?: string,
  item: AONbackground 
}) {
  if (item.category === "background") {
    if (!idSet.has(item.id)) {
      background.push({
        aon_id: item.id,
        aon_url: `https://2e.aonprd.com${item.url}`,
        attribute: item.attribute || [],
        data_type: "background",
        description: getDescription(elem, ruSite),
        external_ru_url: getRuUrl(elem),
        feat: item.feat || [],
        feat_markdown: item.feat_markdown?.split(", ") || [],
        id: `${item.id}-${getId(elem)}`,
        ru_id: getId(elem),
        is_translate_raw: false,
        lore: item.skill?.filter((sk) => sk.includes("Lore")) || [],
        name: getName(elem, item),
        original_desc: item.markdown,
        original_name: item.name,
        rarity: (item.rarity.toLowerCase() as generalContent["rarity"]) || "common",
        skill: item.skill?.filter((sk) => !sk.includes("Lore")).map((s) => s.toLowerCase()) || [],
        source: item.source || [],
        trait: item.trait?.map(f => f.toLowerCase()) || [],
        remaster_id: item.remaster_id ?? [],
        legacy_id: item.legacy_id ?? [],
        release_date:item.release_date??"",
      })
      idSet.add(item.id)
      return true
    }
  }
  return false
}

function addAncestry({ elem, ruSite, item }: {
  elem?: Element,
  ruSite?: string,
  item: AONancestry 
}) {
  if (item.category === "ancestry") {
    if (!idSet.has(item.id)) {
      ancestry.push({
        aon_id: item.id,
        aon_url: `https://2e.aonprd.com${item.url}`,
        additional_languages: {
          count: 0,
          value: [] 
        },
        boosts: item.attribute || [],
        data_type: "ancestry",
        description: getDescription(elem, ruSite),
        external_ru_url: getRuUrl(elem, ruSite),
        flaws: item.attribute_flaw || [],
        hp: item.hp || 0,
        id: `${item.id}-${getId(elem)}`,
        ru_id: getId(elem),
        is_translate_raw: false,
        language: item.language || [],
        name: getName(elem, item),
        original_desc: item.markdown,
        original_name: item.name,
        rarity: (item.rarity.toLowerCase() as generalContent["rarity"]) || "common",
        reach: 0,
        size: item.size || [],
        speed: item["speed_raw"],
        source: item.source || [],
        trait: item.trait?.map(f => f.toLowerCase()) || [],
        vision: item.vision || "",
        remaster_id: item.remaster_id ?? [],
        legacy_id: item.legacy_id ?? [],
        release_date:item.release_date??""
      })
      idSet.add(item.id)
      return true
    }
  }
  return false
}

function addAction({ elem, ruSite, item }: {
  elem?: Element,
  ruSite?: string,
  item: AONaction 
}) {
  if (item.category === "action") {
    if (!idSet.has(item.id)) {
      action.push({
        aon_id: item.id,
        aon_url: `https://2e.aonprd.com${item.url}`,
        action: actionMap[item.actions?.trim().toLowerCase()]??["none"],
        data_type: "action",
        description: getDescription(elem, ruSite),
        external_ru_url: getRuUrl(elem, ruSite),
        id: `${item.id}-${getId(elem)}`,
        ru_id: getId(elem),
        is_translate_raw: false,
        name: getName(elem, item),
        original_desc: item.markdown,
        original_name: item.name,
        rarity: (item.rarity.toLowerCase() as generalContent["rarity"]) || "common",
        source: item.source || [],
        trait: item.trait?.map(f => f.toLowerCase()) || [],
        remaster_id: item.remaster_id ?? [],
        legacy_id: item.legacy_id ?? [],
        release_date:item.release_date??""
      })
      idSet.add(item.id)
      return true
    }
  }
  return false
}

function addCreature({ elem, ruSite, item }: {
  elem?: Element,
  ruSite?: string,
  item: AONcreature 
}) {
  if (item.category === "creature") {
    if (!idSet.has(item.id)) {
      creature.push({
        aon_id: item.id,
        aon_url: `https://2e.aonprd.com${item.url}`,
        rarity: (item.rarity.toLowerCase() as generalContent["rarity"]) || "common",
        description: getDescription(elem, ruSite),
        cha: item.charisma,
        con: item.constitution,
        dex: item.dexterity,
        int: item.intelligence,
        data_type: "creature",
        id: `${item.id}-${getId(elem)}`,
        ru_id: getId(elem),
        str: item.strength,
        wis: item.wisdom,
        name: getName(elem, item),
        ac: item.ac,
        external_ru_url: getRuUrl(elem, ruSite),
        fortitude: item.fortitude_save,
        hp: item.hp,
        level: item.level,
        is_translate_raw: false,
        languages: item.language || [],
        trait: item.trait?.map(f => f.toLowerCase()) || [],
        acrobatics: item.skill_mod.acrobatics ?? 0,
        arcana: item.skill_mod.arcana ?? 0,
        athletics: item.skill_mod.athletics ?? 0,
        crafting: item.skill_mod.crafting ?? 0,
        deception: item.skill_mod.deception ?? 0,
        diplomacy: item.skill_mod.diplomacy ?? 0,
        intimidation: item.skill_mod.intimidation ?? 0,
        medicine: item.skill_mod.medicine ?? 0,
        nature: item.skill_mod.nature ?? 0,
        occultism: item.skill_mod.occultism ?? 0,
        performance: item.skill_mod.performance ?? 0,
        religion: item.skill_mod.religion ?? 0,
        society: item.skill_mod.society ?? 0,
        stealth: item.skill_mod.stealth ?? 0,
        survival: item.skill_mod.survival ?? 0,
        thievery: item.skill_mod.thievery ?? 0,
        source: item.source,
        original_name: item.name,
        original_desc: item.markdown,
        reflex: item.reflex_save,
        speed: item.speed,
        will: item.will_save,
        spells: item.spell || [],
        perception: item.perception,
        senses: item.sense?.split(", ") || [],
        remaster_id: item.remaster_id ?? [],
        legacy_id: item.legacy_id ?? [],
        release_date:item.release_date??""
      })
      idSet.add(item.id)
      return true
    }
  }
  return false
}

function addFeat({ elem, ruSite, item }: {
  elem?: Element,
  ruSite?: string,
  item: AONfeat 
}) {
  if (item.category === "feat") {
    if (!idSet.has(item.id)) {
      feat.push({
        aon_id: item.id,
        action:actionMap[item.actions?.trim().toLowerCase()]??["none"],
        aon_url: `https://2e.aonprd.com${item.url}`,
        source: item.source,
        trait: item.trait?.map(f => f.toLowerCase()) || [],
        data_type: "feat",
        description: getDescription(elem, ruSite),
        name: getName(elem, item),
        id: `${item.id}-${getId(elem)}`,
        ru_id: getId(elem),
        level: item.level || 0,
        external_ru_url: getRuUrl(elem, ruSite),
        is_translate_raw: false,
        original_desc: item.markdown,
        original_name: item.name,
        archetype: item.archetype || [],
        rarity: (item.rarity.toLowerCase() as generalContent["rarity"]) || "common",
        skill: item.skill?.map((s) => s.toLowerCase()) || [],
        remaster_id: item.remaster_id ?? [],
        legacy_id: item.legacy_id ?? [],
        release_date:item.release_date??""
      })
      idSet.add(item.id)
      return true
    }
  }
  return false
}
function addNotParsedContent({ elem, ruSite, item }: {
  elem?: Element,
  ruSite?: string,
  item: AONBase
}){
  const external_ru_url = getRuUrl(elem, ruSite)
  if(item.next_link&&!item.next_link.url){
    console.log(item)
  }
  notParsedContent.push({
    id: `${item.id}-${getId(elem)??0}`,
    aon_url: `https://2e.aonprd.com${item.url}`,
    aon_id: item.id,
    ru_id: getId(elem),
    name: getName(elem, item),
    original_name: item.name ?? "",
    external_ru_url,
    original_desc: item.markdown,
    description: getDescription(elem, ruSite),
    data_type: item.category.replaceAll("-","_") as (generalContent["data_type"]),
    remaster_id: item.remaster_id ?? [],
    legacy_id: item.legacy_id ?? [],
    breadcrumbs:item.breadcrumbs??[],
    next_link:item.category==="rules"?item.next_link?.url.replace(/\/Rules.aspx\?ID=(\d+)/gm,"rules-$1")??null:null,
    previous_link:item.category==="rules"?item.previous_link?.url.replace(/\/Rules.aspx\?ID=(\d+)/gm,"rules-$1")??null:null,
    source:item.source??[],
    release_date:item.release_date
  })
  idSet.add(item.id)
}