<script lang="ts">
  import { getContext } from "svelte";
  import type { BackgroundType, Data, backgroundFilters, globalFilter } from "../types";
  import type { Writable } from "svelte/store";
  import { filter, searchByName } from "./lib";
  import Filter from "./Filter.svelte";
  import Background from "./rows/background.svelte";
  import Counter from "./Counter.svelte";

  const dataKey = "backgrounds";
  const contextData: Data = getContext("data");
  const filters: Writable<globalFilter> = getContext("filters");
  const data = contextData[dataKey];
  function filterFunction() {
    let { filteredData, pageNum, filtAr } = filter<BackgroundType[], backgroundFilters>(
      dataKey,
      $filters.backgrounds,
      temp.length
    );
    filteredData = searchByName(filteredData, searchStr);
    temp = [...filteredData];
    numOfpage = pageNum;
    $filters.backgrounds = { ...filtAr };
    collapsibleContent.forEach((v, k) =>
      collapsibleContent.set(k, temp.filter((spell) => spell.fullName === k).length === 1 ? v : false)
    );
    collapsibleContent = collapsibleContent;
  }
  let temp = [...data];
  let numOfpage = 1;
  let searchStr = "";
  let collapsibleContent = new Map();
  data.forEach((content) => collapsibleContent.set(content.fullName, false));
  $: numOfElems = temp.length;
</script>

<div class="main">
  <Filter {dataKey} {filterFunction} />
  <div class="content">
    <div class="search">
      <label>
        Поиск по названию
        <input placeholder="Перевод/оригинал" type="text" bind:value={searchStr} on:input={filterFunction} />
      </label>
    </div>
    <Counter {numOfElems} />
    <div class="table">
      <thead>
        <th class="header">Имя</th>
        <th class="header">Редкость</th>
        <th class="header desc">Повышение характеристик</th>
      </thead>
      {#each temp as bg}
        <Background content={bg} bind:collapsibleContent />
      {/each}
    </div>
  </div>
</div>

<style>
  div {
    & .fa-check {
      color: green;
    }
    & .fa-xmark {
      color: red;
    }
  }
</style>
