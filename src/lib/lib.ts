//import * as fs from "fs";
import type { Entries, Data, generalContent, TableData, filterUnion, contentTableUnion } from "../types";
import { readyData } from "./readyData";
// export async function getRes() {
//   console.log("start axios");

//   /*if (!fs.existsSync("assets/data.html")) {
//     const res = await axios.get("https://pf2e-ru-translation.readthedocs.io/ru/latest/skills.html");
//     fs.writeFile("assets/data.html", res.data, (err) => {
//       console.error(err);
//     });
//   }*/
//   const res = fs.readFileSync("assets/data.html", "utf-8");
//   console.log(res);
// }
export function filter(
  dataKey: keyof TableData,
  filtAr: filterUnion,
  currentDataLength: number,
  pageNum: number = 1,
  searchStr: string = ""
): { filteredData: contentTableUnion; pageNum: number; filtAr: filterUnion } {
  const dataAr = [...readyData[dataKey]] as contentTableUnion;
  const filtEntries = Object.entries(filtAr) as Entries<filterUnion>;
  let filteredData = dataAr.filter((item) => {
    if (searchStr.length > 0) {
      const ruAndOrigName = item.name + item.originalName;
      if (!ruAndOrigName.toLowerCase().includes(searchStr.toLowerCase())) return 0;
    }
    let criteria = 0;
    for (const [key, val] of filtEntries) {
      switch (val.selection) {
        case "minMax":
          const numberValue = item[key] as unknown as number;
          criteria += numberValue >= parseInt(val.value[0]) && numberValue <= parseInt(val.value[1]) ? 1 : 0;
          break;
        case "singleRadio":
          const strValue = item[key] as string;
          criteria +=
            (val.value.includes(strValue) || val.value.length === 0) && !val.disabled.includes(strValue) ? 1 : 0;
          break;
        case "multipleRadio":
          const arrValue = (item[key] as unknown as string[]).flat();
          if (val.disabled.some((v) => arrValue.includes(v))) {
            criteria += 0;
            break;
          }
          if (val.multiply) {
            criteria += val.value.every((v) => arrValue.includes(v)) || val.value.length === 0 ? 1 : 0;
          } else criteria += val.value.some((v) => arrValue.includes(v)) || val.value.length === 0 ? 1 : 0;
          break;
      }
    }
    return criteria === filtEntries.length;
  }) as typeof dataAr;
  // for (const [key, val] of filtEntries) {
  //   const itemOptions = [...new Set(filteredData.map((item) => item[key]).flat(2))];
  //   filtAr[key].excluded = val.options.filter((opt) => !itemOptions.includes(opt));
  // }
  pageNum = currentDataLength === filteredData.length ? pageNum : 1;
  return { filteredData, pageNum, filtAr };
}
export function sortBy<T extends generalContent[]>(dataAr: T, sortValues: string[]) {
  for (const ind of sortValues.keys()) {
    if (sortValues.slice(0, ind).includes("-")) {
      sortValues[ind] = "-";
    }
  }
  return dataAr.sort((a, b) => consecSort(a, b, sortValues));
}
function consecSort<T extends generalContent>(a: T, b: T, arr: string[]): number {
  if (!arr.length) return 0;
  if (arr[0] === "-") return 0;
  const valA = a[arr[0] as keyof T] as string | string[] | number;
  const valB = b[arr[0] as keyof T] as string | string[] | number;
  return valA.toString().localeCompare(valB.toString()) + consecSort(a, b, arr.slice(1));
}
export function searchByName<T extends generalContent[]>(arr: T, str: string = ""): T {
  return arr.filter((item) => {
    const ruAndOrigName = item.name + item.originalName;
    return ruAndOrigName.toLowerCase().includes(str.toLowerCase());
  }) as typeof arr;
}
