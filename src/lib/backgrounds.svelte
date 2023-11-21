<script lang="ts">
  import { getContext } from "svelte";
  import type { Data, backgroundFilters } from "../types";
  import type { Writable } from "svelte/store";
  import { filt, searchByName } from "./lib";
  import Filter from "./Filter.svelte";
  import Background from "./rows/background.svelte";
  import Counter from "./Counter.svelte";

  const contextData: Writable<Data> = getContext("data");
  const data = $contextData["backgrounds"];
  const filters: backgroundFilters = {
    rarity: {
      name: "Редкость",
      value: [],
      selection: "singleRadio",
      options: [...new Set(data.map((bg) => bg.rarity))],
      disabled: [],
    },
    attributeValue: {
      disabled: [],
      name: "Повышение характеристики",
      value: [],
      selection: "multipleRadio",
      options: ["Сила", "Ловкость", "Интеллект", "Телосложение", "Харизма", "Мудрость"],
    },
  };
  function filterFunction() {
    let { filteredData, pageNum } = filt(data, filters, temp.length);
    filteredData = searchByName(filteredData, searchStr);
    temp = [...filteredData];
    numOfpage = pageNum;
    collapsibleContent.forEach((v, k) =>
      collapsibleContent.set(k, temp.filter((spell) => spell.fullName === k).length === 1 ? v : false)
    );
  }
  let temp = [...data];
  let numOfpage = 1;
  let searchStr = "";
  let collapsible = false;
  let collapsibleContent = new Map();
  data.forEach((content) => collapsibleContent.set(content.fullName, false));
  $: numOfElems = temp.length;
</script>

<div class="main">
  <div class="search">
    <label>
      Поиск по названию
      <input placeholder="Перевод/оригинал" type="text" bind:value={searchStr} on:input={filterFunction} />
    </label>
    <button
      class="filter"
      on:click={() => {
        collapsible = !collapsible;
      }}
    >
      {collapsible ? "Скрыть" : "Раскрыть"} фильтр
    </button>
  </div>
  <Filter {filters} {filterFunction} {collapsible} />
  <Counter {numOfElems} />
  <table class="table">
    <thead>
      <th class="header">Имя</th>
      <th class="header">Редкость</th>
      <th class="header desc">Повышение характеристик</th>
    </thead>
    {#each temp as bg}
      <Background content={bg} bind:collapsibleContent />
    {/each}
  </table>
</div>
