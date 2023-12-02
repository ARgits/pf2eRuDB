import type { ActionType, BackgroundType, CreatureType, Data, FeatType, SpellType, actionTypes } from "../types";
import PF_action_1 from "../assets/PF_action_1.webp";
import PF_action_2 from "../assets/PF_action_2.webp";
import PF_action_3 from "../assets/PF_action_3.webp";
import PF_action_reaction from "../assets/PF_action_reaction.webp";
import PF_action_free from "../assets/PF_action_free.webp";

const nameOfNum: { [index: string]: number } = {
  " одно ": 1,
  " два ": 2,
  " три ": 3,
  "1": 1,
  "2": 2,
  "3": 3,
};
const abilitiesNames = ["Интеллект", "Сила", "Мудрость", "Ловкость", "Харизма", "Телосложение"];
const allImgs = [PF_action_1, PF_action_2, PF_action_3, PF_action_free, PF_action_reaction];
console.log(PF_action_reaction);
const backgrounds: BackgroundType[] = [];
const spells: SpellType[] = [];
const actions: ActionType[] = [];
const feats: FeatType[] = [];
const creatures: CreatureType[] = [];
const traits: Set<string> = new Set();
const paragraphs: Set<string> = new Set();
export function prepareData(data: any): Data {
  for (const site of data.checked) {
    const el = document.createElement("div");
    el.innerHTML = site.data;
    el.querySelectorAll('img[class*="action-"]').forEach((img) => {
      const tempSrc = img.getAttribute("src")?.match(/(PF_action).+(?=.png)/g)?.[0];
      if (tempSrc) {
        const src = allImgs.filter((item) => item.includes(tempSrc))[0];
        img.setAttribute("src", src.slice(4));
      }
    });
    prepareBackgrounds(el);
    prepareContentWithTraits(el);
  }
  return { backgrounds, spells, actions, feats, creatures, traits, paragraphs };
}
function prepareBackgrounds(site: HTMLDivElement) {
  for (const res of site.querySelectorAll('section[id^="bg"')) {
    const background: BackgroundType = {
      fullName: "",
      originalName: "",
      name: "",
      attributeValue: [[]],
      attributeDesc: "",
      desc: "",
      feat: "",
      lore: "",
      src: "",
      customAbs: "",
      rarity: "",
      traits: [""],
    };
    for (const child of res.children) {
      if (child.localName === "h2") {
        background.name = child.textContent!.replace(/\((?<=\().+/, "").trim();
        background.fullName = child.textContent!;
        background.originalName = child.textContent!.match(/(?<=\()((?<!\))[a-z-A-Z ]+)/)![0];
      } else if (child.localName === "ul" && child.previousElementSibling?.localName === "h2") {
        const rarity = [...child.children].filter((el) =>
          ["необычный", "редкий"].includes(el.textContent!.replaceAll(/[^а-яА-Я]/g, ""))
        )[0].textContent!;
        background.rarity = rarity.replace(/^./, rarity[0].toUpperCase());
      } else if (child.textContent?.includes("Источник:")) {
        background.src = child.textContent.replace("Источник: ", "");
        background.desc += child.outerHTML;
      } else if (child.textContent?.includes("Особенность: ")) {
        background.desc += child.outerHTML;
      } else if (child.textContent?.includes("Вы обучены")) {
        background.desc += child.outerHTML;
      } else if (child.textContent?.includes("Ваши девиантные умения относятся к")) {
        background.desc += child.outerHTML;
      } else if (child.textContent?.includes("характеристик")) {
        background.desc += child.outerHTML;
        background.attributeDesc = child.textContent;
        const abilities = [...child.innerHTML.matchAll(/((?<=<strong>)[а-яА-Я]*)|((?<=другое )[а-яА-Я]*)/g)].map((v) =>
          v[0].replace(/^./, v[0][0].toUpperCase())
        );
        if (background.name === "Послушник") {
          console.log(abilities);
        }
        for (let key of abilities.keys()) {
          abilities[key] = abilitiesNames.filter((item) => item.includes(abilities[key].slice(0, 3)))[0] || "Свободное";
        }
        if (background.name === "Послушник") {
          console.log(abilities);
        }
        let numOfAbilities: RegExpMatchArray | null | number = child.innerHTML.match(
          /\d|(\sдва\s)|(\sодно\s)|(\sтри\s)/g
        );
        if (!numOfAbilities) {
          console.log(child.innerHTML);
        } else {
          numOfAbilities = nameOfNum[numOfAbilities[0]];
          const tempAbil = [];
          let tempInd = 0;
          for (let ind of Array(numOfAbilities).keys()) {
            tempAbil.push(abilities.slice(tempInd, ind + numOfAbilities).filter((ab) => ab !== "Свободное"));
            tempInd += ind + numOfAbilities;
          }
          background.attributeValue = tempAbil;
        }
      }
      // else if (child.innerHTML.includes("strong")) {

      // }
      else {
        background.desc += child.outerHTML;
        background.rarity = background.rarity.length ? background.rarity : "Обычный";
      }
    }
    backgrounds.push(background);
  }
}
function prepareContentWithTraits(site: HTMLDivElement) {
  for (let res of site.querySelectorAll(
    "section > h1 + ul, \
		section > h2 + ul, \
		section > h3 + ul, \
		section > h4 + ul, \
		section > h5 + ul, \
		section > h6 + ul"
  )) {
    res.className = res.className + " traits";
    if (!["description"].some((str) => res.parentElement!.className.includes(str))) {
      const h2Text = res.previousElementSibling?.textContent;
      [...res.children].forEach((tag) => traits.add(tag.textContent!));
      if (
        ["/ Чары", "/ Закл", "/ Ф.чары", "/ Фокус"].some((type) =>
          res.previousElementSibling?.textContent?.includes(type)
        )
      ) {
        [...res.parentElement!.children]
          .filter((child) => child.tagName === "P" && child.innerHTML.includes("</strong>:"))
          .forEach((el) => paragraphs.add(el.textContent!.match(/(?<!:)[а-яА-Я()\- ,]+/)![0]));
      }
      if (h2Text?.includes("/ ")) {
        const spell = prepareSpell(res);
        if (spell) spells.push(spell);
        const creature = prepareCreature(res);
        if (creature) creatures.push(creature);
        const feat = prepareFeat(res);
        if (feat) feats.push(feat);
      } else actions.push(prepareAction(res));
    }
  }
}
function prepareSpell(el: Element): SpellType | void {
  if (
    ["/ Чары", "/ Закл", "/ Ф.чары", "/ Фокус"].some((type) => el.previousElementSibling?.textContent?.includes(type))
  ) {
    const parent = el.parentElement!;
    const fullName = el.previousElementSibling!.textContent!.replace("¶", "");
    //у фокусных чар нет традиции, так что проверяем их наличие
    const tradition = [...el.parentElement!.children].filter((e) => {
      return e.textContent?.includes("Обычай: ");
    });
    const alltraits = el.textContent!.split("\n").filter((t) => t !== "");
    let spell: SpellType = {
      fullName,
      name: fullName.replace(/\((?<=\().+/, ""),
      originalName: fullName.match(/(?<=\()((?<!\))[a-z-A-Z ']+)/)![0] || "",
      type: fullName.includes("/ Закл")
        ? "Заклинание"
        : fullName.includes("/ Ф.чары")
        ? "Ф.чары"
        : fullName.includes("/ Фокус")
        ? "Фокус"
        : "Чары",
      level: parseInt(fullName.match(/\d+/)![0]) || 0,
      traits: alltraits,
      desc: [...parent.children]
        .filter(
          (child) =>
            !["H1", "H2"].includes(child.tagName) &&
            //child.textContent !== "" &&
            !child.textContent?.includes("<strong>Обычай") &&
            !["H1", "H2"].includes(child.previousElementSibling?.tagName ?? "")
          //![...paragraphs].some((parag) => child.textContent?.includes(parag))
        )
        .map((e) => e.outerHTML.trim())
        .join(""),
      rarity: alltraits.filter((t) => ["необычный", "редкий"].includes(t))[0] ?? "обычный",
      tradition: tradition.length
        ? tradition[0]
            .textContent!.replace("Обычай: ", "")
            .split(", ")
            .filter((t) => t !== "")
        : [],
      src:
        [...parent.children]
          .filter((child) => child.textContent?.includes("Источник: "))?.[0]
          ?.textContent?.replace("Источник: ", "") || "",
      action: parent.querySelector("img")?.getAttribute("alt") as actionTypes,
      castingType:
        [...parent.children]
          .filter((child) => child.textContent?.includes("Сотворение:"))?.[0]
          ?.textContent?.match(/материальный|жестовый|словесный/gm) ?? [],
    };

    return spell;
  }

  return;
}
function prepareCreature(el: Element): CreatureType | void {
  return;
}
function prepareFeat(el: Element): FeatType | void {
  const parent = el.parentElement!;
  if (parent.firstElementChild?.id.includes("feat-")) {
    parent.querySelector("h1, h2, h3, h4")?.querySelector('a[title="Ссылка на этот заголовок"]')?.remove();
    const fullName = parent.querySelector("h3, h4, h2, h1")!.innerHTML;
    const fullNameText = parent.querySelector("h3, h4, h2, h1")!.textContent!;
    const alltraits = el.textContent!.split("\n").filter((t) => t !== "");
    const feat: FeatType = {
      fullName,
      name: fullNameText.replace(/\((?<=\().+/, ""),
      originalName: fullNameText.match(/(?<=\()((?<!\))[a-z-A-Z ']+)/)?.[0] || "",
      level: parseInt(fullNameText.match(/\d{1,2}/g)![0]),
      traits: alltraits,
      rarity:
        alltraits.filter((trait) => {
          let lowerTrait = trait.toLowerCase();
          return lowerTrait === "редкий" || lowerTrait === "необычный";
        })?.[0] || "обычный",
      desc: [...parent.children]
        .filter(
          (child) => ![...parent.querySelectorAll("h1, h2, h3, h4, ul.traits")].includes(child)
          // !["H1", "H2"].includes(child.tagName) &&
          // !["H1", "H2"].includes(child.previousElementSibling?.tagName ?? "")
        )
        .map((e) => e.outerHTML.trim())
        .join(""),
      src: "",
      action: parent.querySelector("img")?.getAttribute("alt") as actionTypes,
    };
    return feat;
  }
}
function prepareAction(el: Element): ActionType {
  const action: ActionType = {
    fullName: "",
    name: "",
    traits: [""],
    rarity: "",
    desc: "",
    src: "",
    originalName: "",
    level: 0,
  };
  return action;
}
