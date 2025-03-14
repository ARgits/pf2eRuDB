import {PGlite} from "@electric-sql/pglite"
import type {dbFilter, generalContent, dbFilterEntries, notParsedContent} from "@types"
import {createData} from "./data/dev/prepareData.js"
import * as fs from "fs/promises"

// import creatures from './data/prod/creatures-1.json' with {type: "json"}
const db = new PGlite()
await db.exec(`
  create type size_enum as enum('Tiny' , 'Small' , 'Medium' , 'Large' , 'Huge' , 'Gargantuan');
  create type attribute_enum as enum ('Intelligence' , 'Wisdom' , 'Strength' , 'Dexterity' , 'Charisma' , 'Constitution');
  create type action_enum as enum('single action', 'two actions', 'three actions','none','free action','reaction','1 hour','1 minute','10 minutes');
  create type spell_type_enum as enum('Spell' , 'Cantrip' , 'Focus');
  create type tradition_enum as enum('Divine' , 'Occult' , 'Arcane' , 'Primal' , 'Elemental');
  create type rarity_enum as enum('common','uncommon','rare','unique');

 CREATE TABLE IF NOT EXISTS content (
  id TEXT PRIMARY KEY,
  ru_id TEXT,
  aon_id TEXT,
  is_translate_raw BOOLEAN,
  name TEXT,
  original_name TEXT,
  description TEXT,
  original_desc TEXT,
  aon_url TEXT,
  external_ru_url TEXT,
  data_type TEXT,
  release_date DATE,
  remaster_id text[],
  legacy_id text[],
  source text[]
);
create table if not exists ancestry (
  id text primary key references content (id),
  trait text[],
  hp integer,
  reach integer,
  speed text,
  vision text,
  language text[],
  size text[],
  boosts text[],
  flaws text[],
  rarity rarity_enum
);
create table if not exists background (
  id text primary key references content (id),
  trait text[],
  attribute text[],
  feat text[],
  lore text[],
  skill text[],
  feat_markdown text[],
  rarity rarity_enum
);
create table if not exists action (
  id text primary key  references content (id),
  trait text[],
  action text[],
  rarity rarity_enum
);
create table if not exists spell (
  id text primary key  references content (id),
  trait text[],
  spell_type spell_type_enum,
  level integer,
  tradition text[],
  action text[],
  casting_type text[],
  save text,
  rarity rarity_enum
);
create table if not exists creature (
  id text primary key  references content (id),
  trait text[],
  level integer,
  senses text[],
  languages text[],
  str INT,
  dex INT,
  con INT,
  wis INT,
  int INT,
  cha INT,
  ac INT,
  fortitude INT,
  reflex INT,
  will INT,
  acrobatics INT,
  athletics INT,
  arcana INT,
  diplomacy INT,
  deception INT,
  intimidation INT,
  stealth INT,
  thievery INT,
  society INT,
  crafting INT,
  perception INT,
  religion INT,
  occultism INT,
  survival INT,
  nature INT,
  performance INT,
  medicine INT,
  burrow INT,
  climb INT,
  land INT,
  fly INT,
  swim INT,
  rarity rarity_enum
);
create table if not exists feat (
  id text primary key  references content (id),
  trait text[],
  action text[],
  level integer,
  archetype text[],
  skill text[],
  rarity rarity_enum
);
create table if not exists rules (
  id text primary key  references content (id),
  breadcrumbs text[],
  next_link text,
  previous_link text
);
  CREATE TABLE IF NOT EXISTS data_filter (
    id TEXT ,
    is_default BOOLEAN,
    enabled BOOLEAN,
    disabled BOOLEAN,
    exclude_enabled BOOLEAN,
    exclude_disabled BOOLEAN,
    is_num BOOLEAN,
    type TEXT,
    data_type TEXT,
    data_group TEXT,
    filter_name TEXT,
    option_name TEXT,
    data_min INT,
    data_min_default INT,
    data_max INT,
    data_max_default INT,
    PRIMARY KEY (id, data_type, type)
  );
  CREATE INDEX data_type_index ON content (data_type);
  CREATE INDEX source_index ON content USING GIN (source);

  CREATE INDEX trait_feat_index ON feat USING GIN (trait);
  CREATE INDEX trait_spell_index ON spell USING GIN (trait);
  CREATE INDEX trait_creature_index ON creature USING GIN (trait);
  CREATE INDEX trait_background_index ON background USING GIN (trait);
  CREATE INDEX trait_action_index ON action USING GIN (trait);
  CREATE INDEX trait_ancestry_index ON ancestry USING GIN (trait);

  CREATE INDEX archetype_index ON feat USING GIN (archetype);

  CREATE INDEX action_feat_index ON feat USING GIN (action);
  CREATE INDEX action_action_index ON action USING GIN (action);
  CREATE INDEX action_spell_index ON spell USING GIN (action);
  
  CREATE INDEX rarity_feat_index ON feat  (rarity);
  CREATE INDEX rarity_spell_index ON spell  (rarity);
  CREATE INDEX rarity_creature_index ON creature  (rarity);
  CREATE INDEX rarity_background_index ON background  (rarity);
  CREATE INDEX rarity_action_index ON action  (rarity);
  CREATE INDEX rarity_ancestry_index ON ancestry  (rarity);
`)
const {action, ancestry, background, creature, feat, spell, notParsedContent} = createData()
const optionRus = (await import("./RuTerms.json", {with: {type: "json"}})).default as Record<string, string>

const filterKeys: dbFilter =
{
  rarity: {
    type: "singleRadio",
    data_group: "rarity",
    filter_name: "редкость",
    is_num: false,
    tables: ["action", "ancestry", "background", "spell", "feat", "creature"]
  },
  source: {
    type: "multipleRadio",
    data_group: "source",
    filter_name: "источник",
    is_num: false,
    tables: ["action", "ancestry", "background", "spell", "feat", "creature"]
  },
  attribute: {
    type: "multipleRadio",
    data_group: "attribute",
    filter_name: "характеристика",
    is_num: false,
    tables: ["background"]
  },
  trait: {
    type: "multipleRadio",
    data_group: "trait",
    filter_name: "признаки",
    is_num: false,
    tables: ["action", "ancestry", "background", "spell", "feat", "creature"]
  },
  skill: {
    type: "multipleRadio",
    data_group: "skill",
    filter_name: "навыки",
    is_num: false,
    tables: ["background", "feat"]
  },
  level: {
    type: "singleRadio",
    data_group: "level",
    filter_name: "уровень",
    is_num: true,
    tables: ["creature", "feat", "spell"]
  },
  action: {
    type: "multipleRadio",
    data_group: "action",
    filter_name: "действие",
    is_num: false,
    tables: ["action", "feat", "spell"]
  },
  str: {
    type: "minMax",
    data_group: "attribute",
    filter_name: "характеристики",
    option_name: "сила",
    is_num: true,
    tables: ["creature"]
  },
  dex: {
    type: "minMax",
    data_group: "attribute",
    filter_name: "характеристики",
    option_name: "ловкость",
    is_num: true,
    tables: ["creature"]
  },
  con: {
    type: "minMax",
    data_group: "attribute",
    filter_name: "характеристики",
    option_name: "телосложение",
    is_num: true,
    tables: ["creature"]
  },
  int: {
    type: "minMax",
    data_group: "attribute",
    filter_name: "характеристики",
    option_name: "интеллект",
    is_num: true,
    tables: ["creature"]
  },
  wis: {
    type: "minMax",
    data_group: "attribute",
    filter_name: "характеристики",
    option_name: "мудрость",
    is_num: true,
    tables: ["creature"]
  },
  cha: {
    type: "minMax",
    data_group: "attribute",
    filter_name: "характеристики",
    option_name: "харизма",
    is_num: true,
    tables: ["creature"]
  },
  ac: {
    data_group: "defence",
    filter_name: "защиты",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "КБ"
  },
  archetype: {
    data_group: "archetype",
    filter_name: "Архетип",
    is_num: false,
    tables: ["feat"],
    type: "multipleRadio",
  },
  casting_type: {
    data_group: "casting_type",
    filter_name: "Тип сотворения",
    is_num: false,
    tables: ["spell"],
    type: "multipleRadio"
  },
  feat: {
    data_group: "feat",
    filter_name: "Способности",
    is_num: false,
    tables: ["background"],
    type: "multipleRadio"
  },
  boosts: {
    data_group: "boosts",
    filter_name: "Повышения характеристики",
    is_num: false,
    tables: ["ancestry"],
    type: "multipleRadio"
  },
  flaws: {
    data_group: "flaws",
    filter_name: "Недостаток характеристик",
    is_num: false,
    tables: ["ancestry"],
    type: "multipleRadio"
  },
  hp: {
    data_group: "hp",
    filter_name: "здоровье",
    is_num: true,
    tables: ["ancestry", "creature", "class"],
    type: "minMax"
  },
  fortitude: {
    data_group: "defence",
    filter_name: "защиты",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "стойкость"
  },
  reflex: {
    data_group: "defence",
    filter_name: "защиты",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "рефлекс"
  },
  tradition: {
    data_group: "tradition",
    filter_name: "традиция",
    is_num: false,
    tables: ["spell"],
    type: "multipleRadio"
  },
  will: {
    data_group: "defence",
    filter_name: "защиты",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "воля"
  },
  spell_type: {
    data_group: "spell_type",
    filter_name: "тип заклинания",
    is_num: false,
    tables: ["spell"],
    type: "singleRadio"
  },
  perception: {
    data_group: "skill",
    filter_name: "навыки",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "восприятие"
  },
  acrobatics: {
    data_group: "skill",
    filter_name: "навыки",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "акробатика"
  },
  arcana: {
    data_group: "skill",
    filter_name: "навыки",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "аркана"
  },
  athletics: {
    data_group: "skill",
    filter_name: "навыки",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "атлетика"
  },
  crafting: {
    data_group: "skill",
    filter_name: "навыки",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "ремесло"
  },
  deception: {
    data_group: "skill",
    filter_name: "навыки",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "обман"
  },
  diplomacy: {
    data_group: "skill",
    filter_name: "навыки",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "дипломатия"
  },
  intimidation: {
    data_group: "skill",
    filter_name: "навыки",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "запугивание"
  },
  medicine: {
    data_group: "skill",
    filter_name: "навыки",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "медицина"
  },
  thievery: {
    data_group: "skill",
    filter_name: "навыки",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "воровство"
  },
  nature: {
    data_group: "skill",
    filter_name: "навыки",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "природа"
  },
  occultism: {
    data_group: "skill",
    filter_name: "навыки",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "оккультизм"
  },
  performance: {
    data_group: "skill",
    filter_name: "навыки",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "выступление"
  },
  religion: {
    data_group: "skill",
    filter_name: "навыки",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "религия"
  },
  society: {
    data_group: "skill",
    filter_name: "навыки",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "общество"
  },
  stealth: {
    data_group: "skill",
    filter_name: "навыки",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "скрытность"
  },
  survival: {
    data_group: "skill",
    filter_name: "навыки",
    is_num: true,
    tables: ["creature"],
    type: "minMax",
    option_name: "выживание"
  }
}
async function insertDataToContentDB(array: generalContent[] | notParsedContent[],dataType:generalContent["data_type"]) {
  const validKeys = (await db.exec("SELECT * FROM content limit 1"))[0].fields.map(f => f.name)
  const validKeysAlt = (await db.exec(`select * from ${dataType} limit 1`))[0].fields.map(f=>f.name)
  console.log(dataType, validKeysAlt)
  const queryBegin = `INSERT INTO content (${validKeys.map(key => `"${key}"`).toString()})
                            VALUES (${validKeys.map((_, index) => `$${index + 1}`)})`
  const queryBeginAlt = `insert into ${dataType} (${validKeysAlt.map(key=>`"${key}"`).toString()})
                            values (${validKeysAlt.map((_,index)=>`$${index + 1}`)})`                          
  console.log(`${array[0].data_type}: start`)
  for (const item of array) {
    const queryParams = Array.from({length: validKeys.length})
    const queryParamsAlt = Array.from({length: validKeysAlt.length})
    for (const [key, val] of Object.entries(item)) {
      if(val===undefined){
        console.log(item.data_type, key)
      }
      if (val===null||(typeof val !== "boolean" && val?.["length"] !== undefined) || typeof val === "number" || typeof val === "boolean") {
        if (validKeys.includes(key)) {
          const index = validKeys.findIndex((v) => v === key)
          queryParams[index] = val 
        }
        if (validKeysAlt.includes(key)) {
          const indexAlt = validKeysAlt.findIndex((v)=>v===key)
          queryParamsAlt[indexAlt] = val 
        }
      } else {
        for (const [k, v] of Object.entries((val as Record<string, never>))) {
          if (validKeys.includes(k)) {
            const index = validKeys.findIndex((validKey) => validKey === k)
            queryParams[index] = v 
          }
          if (validKeysAlt.includes(key)) {
            const indexAlt = validKeysAlt.findIndex((v)=>v===key)          
            queryParamsAlt[indexAlt] = val 
          }
        }
      }
    }
    try {
      await db.query(queryBegin, queryParams)
    } catch (error) {
      if (error instanceof Error) {
        console.error("adding to content table error:",error.message, dataType, item.original_name)
      }
    }
    try{
      await db.query(queryBeginAlt,queryParamsAlt)
    } catch(error){
      if (error instanceof Error) {
        console.error(`adding to ${dataType} table error:`,error.message, dataType, item.original_name,queryBeginAlt, queryParamsAlt)
      }
    }
  }
  console.log(`${array[0].data_type}: done`)
}
async function insertDataToFilterDB(dataType: generalContent["data_type"]) {
  console.log(`${dataType} filter: start`)
  for (const [key, filter] of Object.entries(filterKeys) as unknown as dbFilterEntries) {
    try {
      if ((filter.tables as generalContent["data_type"][]).includes(dataType)) {
        if (filter.type === "minMax") {
          const {min, max} = (await db.query<{ min: number, max: number }>(`select min(${key}), max(${key}) from ${dataType}`)).rows[0]
          await db.query("INSERT INTO data_filter VALUES ($1,$2,$2,$2,$2,$2,$3,$4,$5,$6,$7,$8,$9,$9,$10,$10)", [key, false, filter.is_num, key, dataType, filter.data_group, filter.filter_name, filter.option_name ?? "", min, max])
        } else {
          const options = (await db.query<{ option: string | number }>(`select distinct ${filter.type === "multipleRadio" ? `unnest(${key})` : key} as option from ${dataType}`)).rows.map((v) => v.option)
          if(key==="action"){
            console.log(options)
          }
          for (const option of options) {
            const optionName = optionRus[`${key}.${option?.toString().toLowerCase()}`] ?? option
            if(key==="action"){
              console.log(optionName)
            }
            await db.query("INSERT INTO data_filter VALUES ($1,$2,$2,$2,$2,$2,$3,$4,$5,$6,$7,$8,$9,$9,$9,$9)", [option, false, filter.is_num, key, dataType, filter.data_group, filter.filter_name, optionName ?? "", null])
          }
        }
      }
    }

    catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }
  console.log(`${dataType} filter: done`)
}
await insertDataToContentDB(creature,"creature")
await insertDataToContentDB(spell,"spell")
await insertDataToContentDB(ancestry,"ancestry")
await insertDataToContentDB(background,"background")
await insertDataToContentDB(action,"action")
await insertDataToContentDB(feat,"feat")

// await insertDataToContentDB(notParsedContent)
await insertDataToFilterDB("creature")
await insertDataToFilterDB("spell")
await insertDataToFilterDB("ancestry")
await insertDataToFilterDB("background")
await insertDataToFilterDB("action")
await insertDataToFilterDB("feat")

const notParsedDataTypes = [...new Set(notParsedContent.map(v=>v.data_type))]
for(const data_type of notParsedDataTypes){
  console.log("creating notParseContent:",data_type)
  await db.query(`create table if not exists ${data_type}(
      id text primary key  references content (id)
    )`)
  await insertDataToContentDB(notParsedContent.filter(v=>v.data_type===data_type),data_type)
}

try {
  const dbDump = await db.dumpDataDir()
  const saveBuffer = Buffer.from(await dbDump.arrayBuffer())
  fs.writeFile("./public/db.tar.gz", saveBuffer).then(() => {
    db.close().then(() =>{ console.log("db is closed")
    }) })
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message)
  }
} finally {
  console.log("done")
}
