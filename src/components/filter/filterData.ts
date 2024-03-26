import { encode } from 'js-base64';
import type { filterUnion, TableData, Entries } from '../../types';

const filterModules = import.meta.glob('@data/prod/filter-*.json', { import: 'default' })
export const obj: Record<'backgrounds' | 'spells' | 'actions' | 'feats' | "creatures", filterUnion> = {
  backgrounds: undefined,
  spells: undefined,
  actions: undefined,
  feats: undefined,
  creatures: undefined
}
for (const path in filterModules) {
  console.log(path)
  const module = (await filterModules[path]()) as Record<'backgrounds' | 'spells' | 'actions' | 'feats' | "creatures", filterUnion>;
  console.log(module)
  const key = Object.keys(module)[0] as keyof typeof module;
  obj[key] = { ...module[key] }
}



export function changeUrlOnFilter(filterValue: filterUnion, dataKey: keyof TableData) {
  if (dataKey === 'favorites') {
    window.history.replaceState({ tab: dataKey }, "", `?tab=${dataKey}`);
    return
  }
  const filterValueAndDisabled = {};
  console.log(filterValue)
  for (const [key, val] of Object.entries(filterValue) as Entries<filterUnion>) {
    const tempObject = {};
    if (val.value.join() !== val.defaultValue.join()) {
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      tempObject['value'] = val.value;
    }
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    if (val.disabled.length) tempObject['disabled'] = val.disabled;
    if (Object.keys(tempObject).length) {
      filterValueAndDisabled[key] = tempObject;
    }
  }
  if (Object.keys(filterValueAndDisabled).length) {
    const filterParams = strToBase64(JSON.stringify(filterValueAndDisabled));

    window.history.replaceState({ tab: dataKey, filter: filterParams }, "", `?tab=${dataKey}&&filter=${filterParams}`);
  } else {
    window.history.replaceState({ tab: dataKey }, "", `?tab=${dataKey}`);
  }
}
function strToBase64(str: string) {
  const bytes = new TextEncoder().encode(str);
  const binString = String.fromCodePoint(...bytes);
  return encode(binString, true);
}
