import { obj } from "@components/filter/filterData";
import { writable } from "svelte/store";
import type { backgroundFilter, featFilter, spellsFilter, actionFilter, creatureFilter } from "../types";

export const filters = writable({
    backgrounds: obj.backgrounds as backgroundFilter,
    feats: obj.feats as featFilter,
    spells: obj.spells as spellsFilter,
    actions: obj.actions as actionFilter,
    creatures: obj.creatures as creatureFilter
});