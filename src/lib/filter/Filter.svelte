<script lang="ts">
  import { getContext } from "svelte";
  import type { globalFilter, filterUnion, TableData } from "../../types";
  import type { Writable } from "svelte/store";
  import SubFilter from "./SubFilter.svelte";
  import filterIcon from "@fortawesome/fontawesome-free/svgs/solid/filter.svg";
  import Counter from "../utilityComponents/Counter.svelte";

  export let dataKey: keyof TableData = "feats";
  export let filterFunction = () => {};
  let collapsed = true;
  const globalFilters: Writable<globalFilter> = getContext("filters");
  const filterKeys = Object.keys($globalFilters[dataKey]) as Array<keyof filterUnion>;
</script>

<div class="filter_container {collapsed ? ' collapsed' : ''}">
  <button
    class="filter_button"
    on:click={() => {
      collapsed = !collapsed;
    }}
  >
    <!-- <img src={filterIcon} alt="вкл/выкл фильтр" /> -->
    <i class="fa-solid fa-filter"></i>
  </button>

  <div class="filter_content{collapsed ? ' collapsed' : ''}">
    {#if !collapsed}
      <Counter inFilter={true} />
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
    border-radius: var(--border-radius);
    overflow-y: auto;
  }
  .filter_button {
    height: fit-content;
    position: absolute;
    // top: 1.5rem;
    // left: -1px;
    padding: 0.25rem 0.25rem;
    z-index: 3;
    display: none;
    background-image: var(--background-image);
    align-items: center;
    & i {
      font-size: 150%;
    }
    &:not(:has(+ .collapsed)) {
      border-top-color: black;
      border-top-right-radius: 0;
      border-left-color: black;
      border-bottom-left-radius: 0;
    }
  }

  @media (max-aspect-ratio: 1.1/1) {
    .filter_button {
      display: block;
    }
  }
</style>
