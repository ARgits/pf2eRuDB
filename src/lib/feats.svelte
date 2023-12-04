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
    collapsibleContent.forEach((v, k) =>
      collapsibleContent.set(k, temp.filter((spell) => spell.fullName === k).length === 1 ? v : false)
    );
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
  const columns = [];
  // $: console.log(columns);
  // $: if (columns.length) {
  //   const columnsWidth = [...document.querySelectorAll(".td")]
  //     .slice(0, tableHeaders.length)
  //     .map((e) => e.clientWidth + "px");
  //   columns.forEach((el, key) => (el.style.width = columnsWidth[key]));
  // }
  let headerHeight: number;
</script>

<div class="content" style="--header-height:{headerHeight}px">
  <div class="content_header" bind:clientHeight={headerHeight}>
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
  <!-- <div class="grid grid-{tableHeaders.length} header">
      {#each tableHeaders as header, key}
        <div class="th" bind:this={columns[key]}>{header.name}</div>
      {/each}
    </div> -->
  <div class="grid grid-{tableHeaders.length} content" style="--col-number:{tableHeaders.length}">
    {#each tableHeaders as header, key}
      <div class="th" bind:this={columns[key]}>{header.name}</div>
    {/each}
    {#each temp.slice((numOfPage - 1) * itemsPerPage, numOfPage * itemsPerPage) as content, key}
      <Feat {content} {collapsibleContent} {tableHeaders} even={(key + 1) % 2 === 0} />
    {/each}
    <!-- </tbody> -->
  </div>
</div>
<Filter {filterFunction} {dataKey} />

<style lang="scss">
  .content {
    height: 100%;
    &_header {
      height: fit-content;
      max-height: 15%;
    }
    &:has(+ :not(.collapsed)) {
      display: none;
    }
  }

  .th {
    border: 1px solid black;
    border-left: 0;
    position: sticky;
    top: 0;
    font-size: larger;
    background-image: var(--cell-even-background-image);
  }
  .grid {
    display: grid;
    max-height: calc(100% - var(--header-height));
    height: fit-content;
    overflow-y: auto;
    border: 1px solid black;
    border-right: 0;
    position: relative;
    &.content {
      border-top: 0;
    }
    &.header {
      height: fit-content;
      max-height: 5%;
      margin: 0;
      gap: 0;
    }
    // scrollbar-gutter: stable;
    @for $i from 1 through 5 {
      &.grid-#{$i} {
        grid-template-columns: repeat(#{$i}, 1fr);
      }
    }
  }
</style>
