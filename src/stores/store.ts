import { derived, writable, type Writable } from "svelte/store";
import type { TableData } from "../types";
import { onDestroy } from "svelte";


export const currentTab = writable("backgrounds") as Writable<keyof TableData>;
export function watch(deps, fn) {
  const unsubscribe = derived(deps, (values) => values).subscribe(fn);
  onDestroy(unsubscribe);
}








/**
 * У нас должен быть 1 store "исходный"
 * derived stores в svelte позволяют зависеть от нескольких store одновременно
 * соответственно мы можем сделать derived store, зависящий от "исходного" store и от store с фильтрами
 */
