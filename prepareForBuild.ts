import * as fs from "fs";
import { readyData } from "./src/data/dev/prepareData.js";
console.log("before backgrounds");
const numOfJSONentries = 100;
console.log(readyData.tables.size);
function createData() {
  for (const [key, value] of Object.entries(readyData))
    if (key !== "allData") {
      const tempArr = [...value]; //in case we have Map or Set instead of Array
      if (tempArr.length > numOfJSONentries) {
        const numOfFiles = Array(Math.ceil(tempArr.length / numOfJSONentries))
          .fill(null)
          .map((_, ind) => ind + 1);
        for (let ind of numOfFiles) {
          const obj = {};
          obj[key] = tempArr.slice((ind - 1) * numOfJSONentries, ind * numOfJSONentries);
          fs.writeFile(`./src/data/prod/${key}-${ind}.json`, JSON.stringify(obj, null, 4), () => {
            console.log(`wrting ${key} finished: ${ind} of ${numOfFiles.length}`);
          });
        }
      } else {
        const obj = {};
        obj[key] = tempArr;

        fs.writeFile(`./src/data/prod/${key}.json`, JSON.stringify(obj, null, 4), () => {
          console.log(`wrting ${key} finished`);
        });
      }
    }
}
createData();
