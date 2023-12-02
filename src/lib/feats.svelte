<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import type { Content, Data, TableData, globalFilter, tableHeaders, tableHeadersByKey } from "../types";
  import Counter from "./Counter.svelte";
  import { filter, searchByName } from "./lib";
  import Filter from "./Filter.svelte";
  import Feat from "./rows/feat.svelte";
  import Pagination from "./Pagination.svelte";

  export let dataKey: keyof TableData = "feats";
  export let tableHeaders: tableHeadersByKey<typeof dataKey>;
  const contextData: Data = getContext("data");
  const data = contextData[dataKey] as Content[typeof dataKey][];
  const filters: Writable<globalFilter> = getContext("filters");
  const numOfElems: Writable<number> = getContext("numOfElems");

  let searchStr: string;
  console.log(data);
  function filterFunction() {
    let { filteredData, pageNum, filtAr } = filter(dataKey, $filters[dataKey], temp.length, numOfPage, searchStr);
    filteredData = searchByName(filteredData, searchStr);
    numOfPage = pageNum;
    collapsibleContent.forEach((v, k) => collapsibleContent.set(k, temp.filter((spell) => spell.fullName === k).length === 1 ? v : false));
    collapsibleContent = collapsibleContent;
    temp = [...filteredData];
    $filters[dataKey] = filtAr;
    $numOfElems = temp.length;
  }
  let temp = [...data];
  $numOfElems = temp.length;
  let collapsibleContent = new Map();
  data.forEach((content) => collapsibleContent.set(content.fullName, false));
  let numOfPage = 1;
  let itemsPerPage = 50;
  console.log(tableHeaders);
</script>

<div class="main">
  <Filter {filterFunction} {dataKey} />
  <div class="content">
    <div>
      <div class="search">
        <label>
          Поиск по названию
          <input placeholder="Перевод/оригинал" type="text" bind:value={searchStr} on:input={filterFunction} />
        </label>
      </div>
      <div>
        <Counter />
        {#key temp.length}
          <Pagination bind:numOfPage bind:itemsPerPage />
        {/key}
      </div>
    </div>
    <div class="grid grid-{tableHeaders.length}" style="--col-number:{tableHeaders.length}">
      <!-- <thead> -->
      {#each tableHeaders as header}
        <div class="th">{header.name}</div>
      {/each}
      <!-- </thead> -->
      <!-- <tbody> -->
      {#each temp.slice((numOfPage - 1) * itemsPerPage, numOfPage * itemsPerPage) as content, key}
        <Feat {content} {collapsibleContent} {tableHeaders} {dataKey} even={(key + 1) % 2 === 0} />
      {/each}
      <!-- </tbody> -->
    </div>
  </div>
</div>

<style lang="scss">
  .th {
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    position: sticky;
    top: -1px;
    padding: 0 1px;
    font-size: large;
    background-image: var(--cell-even-background-image);
  }
  .grid {
    display: grid;
    max-height: 80vh;
    overflow-y: auto;
    border: 1px solid black;
    // scrollbar-gutter: stable;
    @for $i from 1 through 5 {
      &.grid-#{$i} {
        grid-template-columns: repeat(#{$i}, 1fr);
      }
    }
  }
</style>
