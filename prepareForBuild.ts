import * as fs from "fs";
import { filters, readyData } from "./src/data/dev/prepareData.js";
console.log("before backgrounds");
const memorySizeLimit = 500;
function createData() {
  for (const [key, value] of Object.entries(readyData)) {
    if (key !== "allData") {
      const tempArr = [...value]; //in case we have Map or Set instead of Array
      const sliceArr = createSlices(tempArr);
      for (const [ind, { start, end }] of sliceArr.entries()) {
        const obj = {};
        obj[key] = tempArr.slice(start, end);
        fs.writeFile(`./src/data/prod/${key}-${ind+1}.json`, JSON.stringify(obj), () => {
          console.log(`writing ${key} finished: ${ind+1} of ${sliceArr.length}`);
        });
      }
    }
  }
  for (const [key, value] of Object.entries(filters)) {
    const obj = {};
    obj[key] = value;
    fs.writeFile(`./src/data/prod/filter-${key}.json`, JSON.stringify(obj, null, 4), () => {
      console.log(`writing ${key} filters finished`);
    });
  }
}
function createSlices(arr: any[]) {
  const sliceArr: { start: number; end: number }[] = [];
  let start = 0;
  let end = arr.length;
  let prevEnd = 0;
  while (start < end) {
    const objMemo = getSizeKb(arr.slice(start, end));
    if (objMemo < memorySizeLimit && objMemo >= memorySizeLimit * 0.8) {
      sliceArr.push({ start, end });
      start = end;
      prevEnd = start;
      end = arr.length + 1;
    } else if (objMemo > memorySizeLimit) {
      const offset = Math.ceil(Math.abs(end - prevEnd) / 2);
      prevEnd = end;
      end -= offset;
    } else if (objMemo <= memorySizeLimit * 0.8 && end < arr.length) {
      end += Math.ceil(Math.abs(prevEnd - end) / 2);
    } else {
      sliceArr.push({ start, end });
      break;
    }
  }
  return sliceArr;
}
createData();

function getSizeKb(arr:any[]) {
  return new TextEncoder().encode(JSON.stringify(arr)).length / 1024;
}
