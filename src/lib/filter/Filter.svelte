<script lang="ts">
  import { getContext, setContext } from "svelte";
  import type { globalFilter, filterUnion, TableData } from "../../types";
  import { writable, type Writable } from "svelte/store";
  import SubFilter from "./SubFilter.svelte";
  import Counter from "../utilityComponents/Counter.svelte";

  const dataKey: Writable<keyof TableData> = getContext("currentTab");
  let collapsed = true;
  const globalFilters: Writable<globalFilter> = getContext("filters");
  const filterKeys = Object.keys($globalFilters[$dataKey]) as Array<keyof filterUnion>;
  const shownSubfilter = writable('')
  setContext('subFilterKey', shownSubfilter)
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
      <SubFilter {key} />
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
    // overflow-y: hidden;
    top: 0;
    // scrollbar-gutter: stable;
    flex-basis:30%;
    @media (max-aspect-ratio: 1.1/1){
      flex-basis: 100%;
      &.collapsed {
        flex: 0 0 0;
        & .filter_content {
          border: 0;
          flex: 0 0 0;
          :global(.filter_item){
            display: none;
          }
        }
      }
    }
  }
  .filter_content {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: var(--border-radius);
    // overflow-y: auto;
    flex: 1;
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
