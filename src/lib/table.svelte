<script lang="ts">
  import { getContext } from "svelte";
  import type { Data, globalFilter } from "../types";
  import Filter from "./Filter.svelte";
  import Counter from "./Counter.svelte";
  import type { Writable } from "svelte/store";
  import { filter } from "./lib";
  export let dataKey: keyof Omit<Data, "traits" | "paragraphs">;
  const contextData: Data = getContext("data");
  const data = contextData[dataKey];
  const globalFilters: Writable<globalFilter> = getContext("filters");
  function filterFunction() {
    const { filteredData } = filter(dataKey, $globalFilters[dataKey], temp.length);
  }
  let temp = [...data];
  let searchStr = "";
  let numOfpage = 1;
  $: numOfElems = temp.length;
</script>

<div class="main">
  <Filter {dataKey} />
  <div class="content">
    <div>
      <div class="search">
        <label>
          Поиск по названию
          <input placeholder="Перевод/оригинал" type="text" bind:value={searchStr} on:input={filterFunction} />
        </label>
      </div>
      <div>
        <Counter {numOfElems} />
        <div>
          {#if maxPages.length > 1}
            <span>
              страница
              <select bind:value={numOfpage}>
                {#each maxPages as num}
                  <option>{num}</option>
                {/each}
              </select>
            </span>
          {/if}
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
    </div>
    <div class="grid grid-{numOfTh}">
      <!-- <thead> -->
      <div class="th">Название</div>
      <div class="th">Признаки</div>
      <!-- </thead> -->
      <!-- <tbody> -->
      {#each temp.slice((numOfpage - 1) * itemsPerPage, numOfpage * itemsPerPage) as content}
        <Feat {content} {collapsibleContent} />
      {/each}
      <!-- </tbody> -->
    </div>
  </div>
</div>
