<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import type { Content, Data, FeatType, TableData, filterProps, globalFilter, tableHeadersByKey } from "../types";
  import Counter from "./utilityComponents/Counter.svelte";
  import { filter, searchByName } from "./filter/filterFunctions";
  import Filter from "./filter/Filter.svelte";
  import Pagination from "./utilityComponents/Pagination.svelte";
  import Row from "./row.svelte";
  import { changeUrlOnFilter } from "./filter/filterData";

  export let dataKey: keyof TableData = "backgrounds";

  export let tableHeaders: tableHeadersByKey<typeof dataKey>;
  const contextData: Data = getContext("data");
  const data = contextData[dataKey] as Content[typeof dataKey][];
  const filters: Writable<globalFilter> = getContext("filters");
  const numOfElems: Writable<number> = getContext("numOfElems");
  const hasFilterOptions = Object.values($filters[dataKey]).some((val: filterProps) => val.options.length);
  let searchStr: string;
  let temp = [];
  //делаем так, что при первой загрузке не создается url
  let changleURL = false;
  function filterFunction() {
    let { filteredData, pageNum } = filter(dataKey, $filters[dataKey], temp.length, numOfPage, searchStr);
    filteredData = searchByName(filteredData, searchStr);
    numOfPage = pageNum;
    collapsibleContent.forEach((v, k) =>
      collapsibleContent.set(k, temp.filter((content) => content.fullName === k).length === 1 ? v : false)
    );
    collapsibleContent = collapsibleContent;
    temp = [...filteredData];
    if (changleURL) changeUrlOnFilter($filters[dataKey], dataKey);
    else changleURL = !changleURL;

    $numOfElems = temp.length;
  }

  $numOfElems = temp.length;
  let collapsibleContent = new Map();
  data.forEach((content) => collapsibleContent.set(content.fullName, false));
  let numOfPage = 1;
  let itemsPerPage = 50;
  let headerHeight: number;
  filterFunction();
</script>

<div class="content" style="--header-height:{headerHeight}px">
  <div class="content_header" bind:clientHeight={headerHeight}>
    <div class="search">
      <label>
        Поиск по названию
        <input placeholder="Перевод/оригинал" type="text" bind:value={searchStr} on:input={filterFunction} />
      </label>
    </div>

    <Counter />
    {#key temp.length}
      <Pagination bind:numOfPage bind:itemsPerPage />
    {/key}
  </div>
  <!-- <div class="grid grid-{tableHeaders.length} header">
      {#each tableHeaders as header, key}
        <div class="th" bind:this={columns[key]}>{header.name}</div>
      {/each}
    </div> -->
  <div class="grid grid-{tableHeaders.length} content" style="--col-number:{tableHeaders.length}">
    {#if tableHeaders.length > 1}
      {#each tableHeaders as header, key}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="th">
          {header.name}
        </div>
      {/each}
    {/if}
    {#each temp.slice((numOfPage - 1) * itemsPerPage, numOfPage * itemsPerPage) as content, key}
      <Row {content} {collapsibleContent} {tableHeaders} even={(key + 1) % 2 === 0} />
    {/each}
    <!-- </tbody> -->
  </div>
</div>
{#if hasFilterOptions}
  <Filter {filterFunction} {dataKey} />
{/if}

<style lang="scss">
  .content {
    height: 100%;
    &_header {
      height: fit-content;
      max-height: 15%;
      margin-bottom: 0.5rem;
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
    max-height: calc(100% - var(--header-height) - 2px - 0.5rem);
    height: fit-content;
    overflow-y: scroll;
    border: 1px solid black;
    border-right: 0;
    position: relative;
    scrollbar-gutter: stable;
    &.content {
      border-top: 0;
    }
    @for $i from 1 through 5 {
      &.grid-#{$i} {
        grid-template-columns: repeat(#{$i}, 1fr);
      }
    }
  }
  @media (max-aspect-ratio: 1.1/1) {
    .content:has(+ :not(.collapsed)) {
      display: none;
    }
  }
</style>
