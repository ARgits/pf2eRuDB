<script lang="ts">
  import { getContext } from "svelte";
  import type { globalFilter, filterUnion, TableData } from "../types";
  import type { Writable } from "svelte/store";
  import SubFilter from "./SubFilter.svelte";
  import filterIcon from "@fortawesome/fontawesome-free/svgs/solid/filter.svg";
  import Counter from "./Counter.svelte";

  export let dataKey: keyof TableData = "feats";
  export let filterFunction = () => {};
  let collapsed = true;
  const globalFilters: Writable<globalFilter> = getContext("filters");
  console.log($globalFilters, dataKey);
  const filterKeys = Object.keys($globalFilters[dataKey]) as Array<keyof filterUnion>;
</script>

<div class="filter_container {collapsed ? ' collapsed' : ''}">
  <button
    class="filter_button"
    on:click={() => {
      collapsed = !collapsed;
    }}
  >
    <img src={filterIcon} alt="вкл/выкл фильтр" />
  </button>

  <div class="filter_content{collapsed ? ' collapsed' : ''}">
    {#if !collapsed}
      <Counter />
    {/if}
    {#each filterKeys as key}
      <SubFilter {key} {dataKey} {filterFunction} />
    {/each}
    <slot />
  </div>
</div>

<style lang="scss">
  .filter_container {
    display: flex;

    padding: 1px;
    position: sticky;
    height: 100%;
    //overflow-y: auto;
    top: 0;
  }
  .filter_content {
    border: 1px solid black;
    border-radius: 10px;
    overflow-y: auto;
  }
  .filter_button {
    height: fit-content;
    position: absolute;
    top: 1.5rem;
    left: -1px;
    padding: 0.25rem 0.25rem;
    z-index: 3;
    display: none;
    // background-image: var(--background-image);
  }
  img {
    width: 1.5rem;
  }
  @media (max-aspect-ratio: 1/1) {
    .filter_button {
      display: block;
    }
  }
</style>
