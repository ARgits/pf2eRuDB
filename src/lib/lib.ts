//import * as fs from "fs";
import type { Entries, Filter, contentUnion } from "../types";
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

export function filt<T extends contentUnion[]>(
  dataAr: T,
  filtAr: Filter<contentUnion>,
  currentDataLength: number,
  pageNum: number = 1
): { filteredData: T; pageNum: number; disabledTraits: string[] } {
  let filteredData = dataAr.filter((item) => {
    const filtAR = Object.entries(filtAr) as Entries<typeof filtAr>;
    let criteria = 0;
    for (const [key, val] of filtAR) {
      switch (val.selection) {
        case "minMax":
          const numberValue = item[key] as unknown as number;
          criteria += numberValue >= parseInt(val.value[0]) && numberValue <= parseInt(val.value[1]) ? 1 : 0;
          break;
        case "singleRadio":
          const strValue = item[key] as string;
          criteria += val.value.includes(strValue) || val.value.length === 0 ? 1 : 0;
          break;
        case "multipleRadio":
          const arrValue = item[key] as string[];
          if (val.multiply) {
            criteria += val.value.every((v) => arrValue.includes(v)) || val.value.length === 0 ? 1 : 0;
          } else criteria += val.value.some((v) => arrValue.includes(v)) || val.value.length === 0 ? 1 : 0;
          break;
      }
    }
    return criteria === filtAR.length;
  }) as typeof dataAr;
  pageNum = currentDataLength === filteredData.length ? pageNum : 1;
  const traits = [...new Set(filteredData.map((data) => data.traits).flat())];
  const filtTraits = filtAr.traits;
  if (filtTraits.multiply) filtTraits.disabled = filtTraits.options.filter((tag) => !traits.includes(tag));
  return { filteredData, pageNum, disabledTraits: filtTraits.disabled };
}
export function sortBy<T extends contentUnion[]>(dataAr: T, sortValues: string[]) {
  for (const [ind, val] of sortValues.entries()) {
    if (sortValues.slice(0, ind).includes("-")) {
      sortValues[ind] = "-";
    }
  }
  return dataAr.sort((a, b) => consecSort(a, b, sortValues));
}
function consecSort<T extends contentUnion>(a: T, b: T, arr: string[]): number {
  if (!arr.length) return 0;
  if (arr[0] === "-") return 0;
  const valA = a[arr[0] as keyof T] as string | string[] | number;
  const valB = b[arr[0] as keyof T] as string | string[] | number;
  return valA.toString().localeCompare(valB.toString()) + consecSort(a, b, arr.slice(1));
}
export function searchByName<T extends contentUnion[]>(arr:T, str:string):T{
  
  return arr.filter((item)=>{const ruAndOrigName = item.name+item.originalName; return ruAndOrigName.toLowerCase().includes(str.toLowerCase())}) as typeof arr
}
