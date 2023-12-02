<script lang="ts">
  import { getContext } from "svelte";
  import type { Data, SpellType, globalFilter, spellsFilters } from "../types";
  import type { Writable } from "svelte/store";
  import { filter, searchByName, sortBy } from "./lib";
  import Counter from "./Counter.svelte";
  import Filter from "./Filter.svelte";
  import Spell from "./rows/spell.svelte";

  const dataKey = "spells";
  const contextData: Data = getContext("data");
  const data = contextData[dataKey];
  const filters: Writable<globalFilter> = getContext("filters");
  let hasEmpower = false;
  function filterFunction() {
    let { filteredData, pageNum, filtAr } = filter<SpellType[], spellsFilters>(dataKey, $filters.spells, temp.length);
    filteredData = searchByName(filteredData, searchStr);
    temp = sortBy(filteredData, sortValues);
    if (hasEmpower) {
      filtEmpower();
    }
    $filters.spells = { ...filtAr };
    numOfpage = pageNum;
    collapsibleContent.forEach((v, k) =>
      collapsibleContent.set(k, temp.filter((spell) => spell.fullName === k).length === 1 ? v : false)
    );
    collapsibleContent = collapsibleContent;
  }
  function sortSpell() {
    temp = sortBy(temp, sortValues);
  }
  function filtEmpower() {
    temp = temp.filter((item) => item.desc.includes("<strong>Усиление"));
  }
  let temp = [...data];
  let numOfpage = 1;
  let sortVariants = [
    { name: "-", value: "-" },
    { name: "Название", value: "name", type: 1 },
    { name: "Уровень", value: "level", type: 2 },
    { name: "Ориг.название", value: "originalName", type: 1 },
  ];
  let sortValues: string[] = [];
  let itemsPerPage = 50;
  $: maxPages = Array(Math.ceil(temp.length / itemsPerPage))
    .fill(null)
    .map((_, ind) => ind + 1);
  let searchStr: string = "";
  $: numOfElems = temp.length;
  let collapsibleContent = new Map();
  data.forEach((spell) => collapsibleContent.set(spell.fullName, false));
</script>

<div class="main">
  <Filter {filterFunction} {dataKey}>
    <div>Есть Усиление? <input type="checkbox" bind:checked={hasEmpower} on:change={filterFunction} /></div>
  </Filter>
  <div class="content">
    <div class="search">
      <label>
        Поиск по названию
        <input placeholder="Перевод/оригинал" type="text" bind:value={searchStr} on:input={filterFunction} />
      </label>
    </div>

    <div>
      <Counter {numOfElems} />
      <div>
        <span>
          страница
          {#if maxPages.length > 1}
            <select bind:value={numOfpage}>
              {#each maxPages as num}
                <option>{num}</option>
              {/each}
            </select>
          {/if}
        </span>
        <span>
          Кол-во элементов на странице
          <select bind:value={itemsPerPage}>
            {#each [10, 20, 50, 100] as num}
              <option>{num}</option>
            {/each}
          </select>
        </span>
      </div>
    </div>
    <div>
      <span>Сортировать по</span>
      <span>
        {#each sortVariants.slice(0, 2) as _, ind}
          <select bind:value={sortValues[ind]} on:change={sortSpell} disabled={ind > 0 && sortValues[0] === "-"}>
            {#each sortVariants as svar}
              <option value={svar.value} disabled={sortValues.includes(svar.value) && svar.value !== "-"}>
                {svar.name}
              </option>
            {/each}
          </select>
        {/each}
      </span>
    </div>
    <div class="table">
      <thead>
        <th style="width: 30%;">Название</th>
        <th>Обычай / Признак</th>
      </thead>
      <tbody>
        {#each temp.slice((numOfpage - 1) * itemsPerPage, numOfpage * itemsPerPage) as el}
          <Spell spell={el} bind:collapsibleContent />
        {/each}
      </tbody>
    </div>
  </div>
</div>
