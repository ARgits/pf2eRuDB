<script lang="ts">
  import { getContext, setContext } from "svelte";
  import { derived, writable, type Writable } from "svelte/store";
  import type { ActionType, BackgroundType, Entries, FeatType, SpellType, TableData, filterProps, filterUnion, globalFilter, tableHeadersByKey } from "../types";
  import Counter from "./utilityComponents/Counter.svelte";
  import Filter from "./filter/Filter.svelte";
  import Pagination from "./utilityComponents/Pagination.svelte";
  import Row from "./row.svelte";
  import { dataStore } from "../store";

  export let tableHeaders: tableHeadersByKey<typeof dataKey>;
  // const contextData: Data = getContext("data");
  // const data = contextData[dataKey] as Content[typeof dataKey][];
  const dataKey: Writable<keyof TableData> = getContext("currentTab");
  const filters: Writable<globalFilter> = getContext("filters");
  dataStore.getKeyData($dataKey);
  const hasFilterOptions = Object.values($filters[$dataKey]).some((val: filterProps) => val.options.length);
  const searchString = writable("");
  const derivedData = derived([dataStore, filters, searchString], ([$dataStore, $filters, $searchString]) => {
    const result = $dataStore[$dataKey].filter((item: BackgroundType | FeatType | SpellType | ActionType) => {
      if ($searchString?.length > 0) {
        const ruAndOrigName = item.name + item.originalName;
        if (!ruAndOrigName.toLowerCase().includes($searchString.toLowerCase())) return 0;
      }
      let criteria = 0;
      const filtEntries = Object.entries($filters[$dataKey]) as Entries<filterUnion>;
      for (const [key, val] of filtEntries) {
        switch (val.selection) {
          case "minMax":
            const numberValue = item[key] as number;
            criteria += numberValue >= parseInt(val.value[0]) && numberValue <= parseInt(val.value[1]) ? 1 : 0;
            break;
          case "singleRadio":
            const strValue = item[key].toString();
            criteria += (val.value.includes(strValue) || val.value.length === 0) && !val.disabled.includes(strValue) ? 1 : 0;
            break;
          case "multipleRadio":
            const arrValue = (item[key] as string[]).flat();
            if (val.disabled.some((v) => arrValue.includes(v))) {
              criteria += 0;
              break;
            }
            if (val.multiply) {
              criteria += val.value.every((v) => arrValue.includes(v)) || val.value.length === 0 ? 1 : 0;
            } else criteria += val.value.some((v) => arrValue.includes(v)) || val.value.length === 0 ? 1 : 0;
            break;
        }
      }
      return criteria === filtEntries.length;
    });
    return result;
  });
  setContext(
    "numOfElems",
    derived(derivedData, ($derivedData) => $derivedData.length)
  );
  let collapsibleContent = new Map();

  let numOfPage = 1;
  let itemsPerPage = 50;
  let headerHeight: number;
</script>

<div class="content" style="--header-height:{headerHeight}px">
  <div class="content_header" bind:clientHeight={headerHeight}>
    <div class="search">
      <label>
        Поиск по названию
        <input placeholder="Перевод/оригинал" type="text" bind:value={$searchString} />
      </label>
    </div>

    <Counter />
    {#key $derivedData.length}
      <Pagination bind:numOfPage bind:itemsPerPage />
    {/key}
  </div>
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
    {#each $derivedData.slice((numOfPage - 1) * itemsPerPage, numOfPage * itemsPerPage) as content, key}
      <Row {content} {collapsibleContent} {tableHeaders} even={(key + 1) % 2 === 0} />
    {/each}
  </div>
</div>
{#if hasFilterOptions}
  <Filter />
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
