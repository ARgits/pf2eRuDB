<script lang="ts">
  import Tooltip from "@components/tooltip/TooltipFromAction.svelte";
  import { getContext, setContext } from "svelte";
  import { derived, writable, type Writable } from "svelte/store";
  import type {
    ActionType,
    BackgroundType,
    Entries,
    FeatType,
    SpellType,
    TableData,
    filterProps,
    filterUnion,
    generalContent,
    globalFilter,
    tableHeadersByKey,
  } from "../types";
  import Counter from "@components/utilityComponents/Counter.svelte";
  import Filter from "@components/filter/Filter.svelte";
  import Pagination from "@components/utilityComponents/Pagination.svelte";
  import Row from "@components/row.svelte";
  import { dataStore } from "@stores/dataStore";
  import Masonry from "./masonry.svelte";
  import FavoritesButton from "./Favorites/favoritesButton.svelte";

  export let tableHeaders: tableHeadersByKey<typeof dataKey>;
  const dataKey: Writable<keyof TableData> = getContext("currentTab");
  const filters: Writable<globalFilter> = getContext("filters");
  if ($dataKey === "creatures") console.log(tableHeaders);
  const hasFilterOptions = Object.values($filters[$dataKey]).some((val: filterProps) => {
    if (val.selection !== "minMax") return val.options.length;
    return true;
  });
  const searchString = writable("");
  const derivedData = derived([dataStore, filters, searchString], ([$dataStore, $filters, $searchString]) => {
    if ($dataKey === "creatures") console.log($dataStore[$dataKey]);
    const result = $dataStore[$dataKey].filter((item: BackgroundType | FeatType | SpellType | ActionType) => {
      if ($searchString?.length > 0) {
        const ruAndOrigName = item.name + item.originalName;
        if (!ruAndOrigName.toLowerCase().includes($searchString.toLowerCase())) return 0;
      }
      let criteria = 0;
      const filtEntries = Object.entries($filters[$dataKey]) as Entries<filterUnion>;
      for (const [key, val] of filtEntries) {
        switch (val.selection) {
          case "minMax": {
            const numberValue = item[key] as number;
            criteria +=
              numberValue >= Number.parseInt(val.value[0]) && numberValue <= Number.parseInt(val.value[1]) ? 1 : 0;
            break;
          }
          case "singleRadio": {
            const strValue = item[key].toString();
            criteria +=
              (val.value.includes(strValue) || val.value.length === 0) && !val.disabled.includes(strValue) ? 1 : 0;
            break;
          }
          case "multipleRadio": {
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
      }
      return criteria === filtEntries.length;
    });
    console.log("data formed");
    return result;
  });
  let numOfPage = 1;
  setContext(
    "numOfElems",
    derived(derivedData, ($derivedData) => {
      numOfPage = 1;
      return $derivedData.length;
    }),
  );
  const view: Writable<"table" | "mansonry"> = getContext("tableView");

  const collapsibleContent = new Map();

  let itemsPerPage = 50;
  let headerHeight: number;
  function renderCard(ev: MouseEvent, data: generalContent) {
    ev.preventDefault();
    const { id } = data;
    const card: HTMLElement | undefined = document.querySelector(`#${id}.message`);
    if (card) {
      card.focus();
    } else {
      const tooltipComponent = new Tooltip({
        props: {
          data,
          onClick: () => {
            tooltipComponent.$destroy();
          },
        },
        target: document.body,
      });
    }
  }
</script>

<div class="content" style="--header-height:{headerHeight}px">
  <div class="content_header" bind:clientHeight={headerHeight}>
    <div class="search">
      <label>
        Поиск по названию
        <input placeholder="Перевод/оригинал" type="text" bind:value={$searchString} />
      </label>
      <button class="view" on:click={() => ($view = $view === "table" ? "mansonry" : "table")}
        >{#if $view === "table"}
          <i class="fa-solid fa-table-cells-large"></i>
        {:else}
          <i class="fa-solid fa-table-list"></i>
        {/if}</button
      >
    </div>

    <Counter />
    {#key $derivedData.length}
      <Pagination bind:numOfPage bind:itemsPerPage />
    {/key}
  </div>
  {#if $view === "table"}
    <div class="grid grid-{tableHeaders.length} content" style="--col-number:{tableHeaders.length}">
      {#if tableHeaders.length > 1}
        {#each tableHeaders as header}
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
  {:else}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <Masonry
      data={$derivedData.slice((numOfPage - 1) * itemsPerPage, numOfPage * itemsPerPage)}
      isSortedByHeight={false}
    >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div slot="item" class="slot" let:item on:click={(ev) => renderCard(ev, item)}>
        <div>
          <span>{item.name}</span>
          <FavoritesButton itemId={item.id} />
        </div>
      </div>
    </Masonry>
  {/if}
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
    z-index: 1;
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
  button.view {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5rem;
  }
  .slot div:first-child {
    display: flex;
    & span {
      margin: 0 auto;
    }
  }
</style>
