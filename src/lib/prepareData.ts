import type { Action, Background, Creature, Data, Feat, Spell, actionTypes } from "../types";
import * as PF_action_1 from '../assets/PF_action_1.webp'
import * as PF_action_2 from '../assets/PF_action_2.webp'
import * as PF_action_3 from '../assets/PF_action_3.webp'
import * as PF_action_reaction from '../assets/PF_action_reaction.webp'
import * as PF_action_free from '../assets/PF_action_free.webp'

const nameOfNum: { [index: string]: number } = {
  " одно ": 1,
  " два ": 2,
  " три ": 3,
  "1": 1,
  "2": 2,
  "3": 3,
};
const actionsName: {
  [k in PropertyKey]: string;
} = {
  "одиночное действие": "1 действие",
  "активность из 2-х действий": "2 действия",
  "активность из 3-х действий": "3 действия",
  реакция: "реакция",
  "свободное действие": "свободное действие",
};
const backgrounds: Background[] = [];
const spells: Spell[] = [];
const actions: Action[] = [];
const feats: Feat[] = [];
const creatures: Creature[] = [];
const traits: Set<string> = new Set();
const paragraphs: Set<string> = new Set();
export function prepareData(data: any): Data {
  for (let site of data.checked) {
    const el = document.createElement("div");
    el.innerHTML = site.data;
    prepareBackgrounds(el);
    prepareContentWithTraits(el);
  }
  return { backgrounds, spells, actions, feats, creatures, traits, paragraphs };
}
function prepareBackgrounds(site: HTMLDivElement) {
  for (const res of site.querySelectorAll('section[id^="bg"')) {
    const background: Background = {
      fullName: "",
      originalName: "",
      name: "",
      attributeValue: "",
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
        background.name = child.textContent!.replace(/\((?<=\().+/, "");
        background.fullName = child.textContent!;
        background.originalName = child.textContent!.match(/(?<=\()((?<!\))[a-z-A-Z ]+)/)![0];
      } else if (child.localName === "ul") {
        const rarity = child.textContent!.replaceAll(/[^а-яА-Я]/g, "");
        background.rarity = rarity.replace(/^./, rarity[0].toUpperCase());
      } else if (child.textContent?.includes("Источник:")) {
        background.src = child.textContent.replace("Источник: ", "");
      } else if (child.textContent?.includes("Особенность: ")) {
      } else if (child.textContent?.includes("Вы обучены")) {
      } else if (child.textContent?.includes("Ваши девиантные умения относятся к")) {
      } else if (child.textContent?.includes("характеристик")) {
        background.attributeDesc = child.textContent;
        const abilities = [...child.innerHTML.matchAll(/((?<=<strong>)[а-яА-Я]*)|((?<=другое )[а-яА-Я]*)/g)].map((v) =>
          v[0].replace(/^./, v[0][0].toUpperCase())
        );
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
            tempAbil.push(
              abilities
                .slice(tempInd, ind + numOfAbilities)
                .filter((ab) => !ab.includes("Своб"))
                .join("/")
            );
            tempInd += ind + numOfAbilities;
          }
          background.attributeValue = tempAbil.join(", ");
        }
      } else if (child.innerHTML.includes("strong")) {
      } else {
        background.desc += child.textContent;
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
        [...res.parentElement!.querySelectorAll('img[alt="одиночное действие"]')].forEach((img) =>
          img.setAttribute("src", PF_action_1.default)
        );
        [...res.parentElement!.querySelectorAll('img[alt="реакция"')].forEach((img) =>
          img.setAttribute("src", PF_action_reaction.default)
        );
        [...res.parentElement!.querySelectorAll('img[alt="свободное действие"')].forEach((img) =>
          img.setAttribute("src", PF_action_free.default)
        );
        [...res.parentElement!.querySelectorAll('img[alt="активность из 2-х действий"')].forEach((img) =>
          img.setAttribute("src", PF_action_2.default)
        );
        [...res.parentElement!.querySelectorAll('img[alt="активность из 3-х действий"')].forEach((img) =>
          img.setAttribute("src", PF_action_3.default)
        );

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
function prepareSpell(el: Element): Spell | void {
  if (
    ["/ Чары", "/ Закл", "/ Ф.чары", "/ Фокус"].some((type) => el.previousElementSibling?.textContent?.includes(type))
  ) {
    const parent = el.parentElement!;
    const fullName = el.previousElementSibling!.textContent!;
    //у фокусных чар нет традиции, так что проверяем их наличие
    const tradition = [...el.parentElement!.children].filter((e) => {
      return e.textContent?.includes("Обычай: ");
    });
    const alltraits = el.textContent!.split("\n").filter((t) => t !== "");
    let spell: Spell = {
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
          (child) => !["UL", "H1", "H2"].includes(child.tagName) && child.textContent !== "" && 1
          //![...paragraphs].some((parag) => child.textContent?.includes(parag))
        )
        .map((e) => e.innerHTML.trim())
        .join("\n"),
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
    };

    return spell;
  }

  return;
}
function prepareCreature(el: Element): Creature | void {
  return;
}
function prepareFeat(el: Element): Feat | void {
  return;
}
function prepareAction(el: Element): Action {
  const action = {
    fullName: "",
    name: "",
    traits: [""],
    rarity: "",
    desc: "",
    src: "",
    originalName: "",
  };
  return action;
}
