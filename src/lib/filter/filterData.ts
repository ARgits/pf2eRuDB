


import { encode } from 'js-base64';
import type {filterUnion, TableData, Entries } from '../../types';

const filterModules = import.meta.glob('../../data/prod/filter-*.json', {import:'default'})
export const obj={}
for(const path in filterModules){
  console.log(path)
  const module = (await filterModules[path]()) as {};
  console.log(module)
  const key = Object.keys(module)[0];
  obj[key] = {...module[key]}
}



export function changeUrlOnFilter(filterValue: filterUnion, dataKey: keyof TableData) {
  let filterValueAndDisabled = {};
  const tab = dataKey;
  for (const [key, val] of Object.entries(filterValue) as Entries<filterUnion>) {
    const tempObject = {};
    if (val.value.join() !== val.defaultValue.join()) {
      tempObject['value'] = val.value;
    }
    if (val.disabled.length) tempObject['disabled'] = val.disabled;
    if (Object.keys(tempObject).length) {
      filterValueAndDisabled[key] = tempObject;
    }
  }
  if (Object.keys(filterValueAndDisabled).length) {
    const filterParams = strToBase64(JSON.stringify(filterValueAndDisabled));

    window.history.replaceState({ tab, filter: filterParams }, "", `?tab=${tab}&&filter=${filterParams}`);
  } else {
    window.history.replaceState({ tab }, "", `?tab=${tab}`);
  }
}
function strToBase64(str: string) {
  const bytes = new TextEncoder().encode(str);
  const binString = String.fromCodePoint(...bytes);
  return encode(binString, true);
}
