import type { ActionType, BackgroundType, CreatureType, Data, FeatType, SpellType, actionTypes } from "../types";

const allImgs = Object.values(import.meta.glob("../assets/PF_action_*.webp")).map((val: any) => val.name);
console.log(allImgs);
import data from "../assets/data.json";
const nameOfNum: { [index: string]: number } = {
  " одно ": 1,
  " два ": 2,
  " три ": 3,
  "1": 1,
  "2": 2,
  "3": 3,
};
const abilitiesNames = ["Интеллект", "Сила", "Мудрость", "Ловкость", "Харизма", "Телосложение"];
const backgrounds: BackgroundType[] = [];
const spells: SpellType[] = [];
const actions: ActionType[] = [];
const feats: FeatType[] = [];
const creatures: CreatureType[] = [];
const traits: Set<string> = new Set();
const paragraphs: Set<string> = new Set();
function prepareData(data: any): Data {
  for (const site of data.checked) {
    const el = document.createElement("div");
    el.innerHTML = site.data;
    el.querySelectorAll('img[class*="action-"]').forEach((img) => {
      const tempSrc = img.getAttribute("src")?.match(/(PF_action).+(?=.png)/g)?.[0];
      if (tempSrc) {
        const src = allImgs.filter((item) => item.includes(tempSrc))[0];
        img.setAttribute("src", src.slice(9));
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
      id: res.id.match(/(?<=bg-).+/)[0],
    };
    for (const child of res.children) {
      if (child.localName === "h2") {
        background.name = child.textContent.replace(/\((?<=\().+/, "").trim();
        background.fullName = child.textContent.replace("¶", "");
        background.originalName = child.textContent.match(/(?<=\()((?<!\))[a-z-A-Z ]+)/)![0];
      } else if (child.localName === "ul" && child.previousElementSibling?.localName === "h2") {
        const rarity = [...child.children].filter((el) =>
          ["необычный", "редкий"].includes(el.textContent.replaceAll(/[^а-яА-Я]/g, ""))
        )[0].textContent;
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
        for (let key of abilities.keys()) {
          abilities[key] = abilitiesNames.filter((item) => item.includes(abilities[key].slice(0, 3)))[0] || "Свободное";
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
          background.attributeValue = tempAbil.map((abil) => {
            if (abil.length) {
              return abil;
            }
            return ["Свободное"];
          });
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
  for (let res of site.querySelectorAll("section")) {
    res.querySelector("h1, h2, h3, h4, h5, h6")?.querySelector('a[title="Ссылка на этот заголовок"]')?.remove();
    const traitsElement = res.querySelector("h2 + ul, h3 + ul, h4 + ul, h5 + ul, h6 + ul");
    if (traitsElement) {
      traitsElement.className = res.className + " traits";
      [...traitsElement.children].forEach((tag) => traits.add(tag.textContent));
    }
    const sectionHead = res.querySelector("h1, h2, h3, h4, h5, h6");
    if (sectionHead) {
      if (["/ Чары", "/ Закл", "/ Ф.чары", "/ Фокус"].some((type) => sectionHead.textContent.includes(type))) {
        spells.push(prepareSpell(res));
      } else if (res.firstElementChild.id.includes("feat-")) {
        feats.push(prepareFeat(res));
      } else if (res.firstElementChild.id.match(/(?<!\w)(action)(?!\w)/)) {
        actions.push(prepareAction(res));
      }
    }
  }
}

function prepareSpell(el: Element): SpellType {
  [...el.children]
    .filter((child) => child.tagName === "P" && child.innerHTML.includes("</strong>:"))
    .forEach((element) => paragraphs.add(element.textContent.match(/(?<!:)[а-яА-Я()\- ,]+/)![0]));
  const { fullName, fullNameText } = getFullname(el);
  //у фокусных чар нет традиции, так что проверяем их наличие
  const tradition = [...el.children].filter((e) => {
    return e.textContent?.includes("Обычай: ");
  });
  const alltraits = getTraits(el);
  let spell: SpellType = {
    fullName,
    name: fullNameText.replace(/\((?<=\().+/, ""),
    originalName: fullNameText.match(/(?<=\()((?<!\))[a-z-A-Z ']+)/)?.[0] || "",
    type: fullName.includes("/ Закл")
      ? "Заклинание"
      : fullName.includes("/ Ф.чары")
      ? "Ф.чары"
      : fullName.includes("/ Фокус")
      ? "Фокус"
      : "Чары",
    level: parseInt(fullName.match(/\d+/)![0]) || 0,
    traits: alltraits,
    desc: [...el.children]
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
    rarity: (alltraits.filter((t) => ["необычный", "редкий"].includes(t))[0] ?? "обычный").toUpperCase(),
    tradition: tradition.length
      ? tradition[0].textContent
          .replace("Обычай: ", "")
          .split(", ")
          .filter((t) => t !== "")
      : [],
    src:
      [...el.children]
        .filter((child) => child.textContent?.includes("Источник: "))?.[0]
        ?.textContent?.replace("Источник: ", "") || "",
    action: el.querySelector("img")?.getAttribute("alt") as actionTypes,
    castingType:
      [...el.children]
        .filter((child) => child.textContent?.includes("Сотворение:"))?.[0]
        ?.textContent?.match(/материальный|жестовый|словесный/gm) ?? [],
    id: el.firstElementChild.id,
  };
  return spell;
}
function prepareCreature(el: Element): CreatureType | void {
  return;
}
function prepareFeat(el: Element): FeatType {
  const { fullName, fullNameText } = getFullname(el);
  const alltraits = getTraits(el);
  const feat: FeatType = {
    fullName,
    name: fullNameText.replace(/\((?<=\().+/, ""),
    originalName: fullNameText.match(/(?<=\()((?<!\))[a-z-A-Z ']+)/)?.[0] || "",
    level: parseInt(fullNameText.match(/\d{1,2}/g)![0]),
    traits: alltraits,
    rarity: (alltraits.filter((t) => ["необычный", "редкий"].includes(t))[0] ?? "обычный").toUpperCase(),
    desc: [...el.children]
      .filter((child) => ![...el.querySelectorAll("h1, h2, h3, h4, h5, h6, ul.traits, aside")].includes(child))
      .map((e) => e.outerHTML.trim())
      .join(""),
    src: "",
    action: el.querySelector("img")?.getAttribute("alt") as actionTypes,
    id: el.firstElementChild.id,
  };
  return feat;
}

function prepareAction(el: Element): ActionType {
  const { fullName, fullNameText } = getFullname(el);
  const alltraits = getTraits(el);
  const action: ActionType = {
    fullName,
    name: fullNameText.replace(/\((?<=\().+/, ""),
    traits: alltraits,
    rarity: "",
    desc: [...el.children]
      .filter((child) => ![...el.querySelectorAll("h1, h2, h3, h4, h5, h6, ul.traits, aside")].includes(child))
      .map((e) => e.outerHTML.trim())
      .join(""),
    src: "",
    originalName: fullNameText.match(/(?<=\()((?<!\))[a-z-A-Z ']+)/)?.[0] || "",
    action: "",
    id: el.firstElementChild.id,
  };
  return action;
}
function getTraits(element: Element) {
  return element
    .querySelector("h1 + ul, h2 + ul, h3 + ul, h4 + ul, h5 + ul, h6 + ul")
    ?.textContent?.split("\n")
    .filter((t) => t !== "");
}
function getFullname(element: Element) {
  const header = element.querySelector("h1, h2, h3, h4, h5, h6");
  return { fullName: header.innerHTML, fullNameText: header.textContent };
}
export const readyData = prepareData(data);
