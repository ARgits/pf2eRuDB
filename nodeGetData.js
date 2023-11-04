import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as pagesData from "./src/assets/data.json" assert { type: "json" };
const mainSite = "https://pf2e-ru-translation.readthedocs.io/ru/latest/index.html";
const pages = pagesData.default;
/**
 *
 * @param {string} site
 * @param {Set} parsedLinks
 * @returns
 */
async function parseSite(site, parsedLinks) {
  try {
    const { data } = await axios.get(site);
    if (pages.checked.filter((v) => v.site === site).length) {
      console.log("skip", site);
      return await recurse(parsedLinks);
    }
    const $ = cheerio.load(data);
    const docData = $("div.document").html();
    pages.checked.push({ site, data: docData });
    const tempLinks = [];
    function createLink(el) {
      if (!$(el).attr("href").includes("#")) {
        const href = $(el).attr("href").split("/");
        const goingUp = (href.filter((part) => part === "..").length + 1) * -1;
        const trueHREF = href.filter((part) => part !== "..");
        return [...site.split("/").slice(0, goingUp), ...trueHREF].join("/");
      }
      return null;
    }
    $("div.document a.internal").each(function (i, el) {
      const link = createLink(el);
      if (link) tempLinks.push(link);
    });
    // if (!tempLinks.length) {
    //   $("div.document a.internal").each(function (i, el) {
    //     const link = createLink(el);
    //     tempLinks.push(link);
    //   });
    // }
    tempLinks.forEach((link) => parsedLinks.add(link));
    console.log("parsedLinks length", parsedLinks.size);
    return await recurse(parsedLinks);
  } catch (error) {
    console.log("error", error);
    if (pages.checked.filter((v) => v.site === site).length) return;
    pages.error.push({ site, error: error.stack });
    return await recurse(parsedLinks);
    //something
  }
}
/**
 *
 * @param {Set} parsedLinks
 * @returns
 */
async function recurse(parsedLinks) {
  if (parsedLinks.size > 0) {
    const link = [...parsedLinks][0];
    parsedLinks.delete(link);
    console.log("link", link);
    return await parseSite(link, parsedLinks);
  }
  return;
}

await parseSite(mainSite, new Set());
console.log("await prase site completed", pages.error, pages.checked.length);
fs.writeFile("src/assets/data.json", JSON.stringify(pages, null, 4), () => {
  console.log("writing finished");
});
