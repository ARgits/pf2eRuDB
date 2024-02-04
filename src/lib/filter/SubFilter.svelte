<script lang="ts">
  import { getContext } from "svelte";
  import type { globalFilter, filterUnion, TableData } from "../../types";
  import type { Writable } from "svelte/store";
  import { fade, slide } from "svelte/transition";
  import StatusIcon from "../utilityComponents/statusIcon.svelte";

  export let key: keyof filterUnion;
  const shownSubfilter:Writable<string> = getContext('subFilterKey')
  const dataKey: Writable<keyof TableData> = getContext("currentTab");
  const globalFilters: Writable<globalFilter> = getContext("filters");
  function getStateIcon(key: keyof filterUnion, val: string) {
    const excluded = $globalFilters[$dataKey][key].excluded.includes(val) ? " excluded" : "";
    if ($globalFilters[$dataKey][key].value.includes(val)) return "fa-square-check" + excluded;
    if ($globalFilters[$dataKey][key].disabled.includes(val)) return "fa-square-xmark" + excluded;
    return "fa-square" + excluded;
  }
  /**q
   * Меняем значение фильтра между 3 состояниями: учитывать, строго не учитывать, не учитывать
   * @param key - ключ фильтра
   * @param val - значение
   */
  function changeOptionState(key: keyof filterUnion, val: string) {
    const { disabled, value } = $globalFilters[$dataKey][key];
    if (disabled.includes(val)) {
      const ind = disabled.findIndex((v: string) => val === v);
      disabled.splice(ind, 1);
    } else if (value.includes(val)) {
      const ind = value.findIndex((v: string) => val === v);
      value.splice(ind, 1);
      disabled.push(val);
    } else {
      value.push(val);
    }
    $globalFilters[$dataKey][key] = { ...$globalFilters[$dataKey][key], disabled, value };
  }
  function getMinArr(key: keyof filterUnion) {
    return $globalFilters[$dataKey][key].options.filter((opt: string) => parseInt(opt) <= parseInt($globalFilters[$dataKey][key].value[1]));
  }
  function getMaxArr(key: keyof filterUnion) {
    return $globalFilters[$dataKey][key].options.filter((opt: string) => parseInt(opt) >= parseInt($globalFilters[$dataKey][key].value[0]));
  }
  function optionSearch(val: string) {
    return val.toLowerCase().includes($globalFilters[$dataKey][key].search.toLowerCase());
  }
  function changeVisibility() {
    $shownSubfilter = $shownSubfilter===key?'':key
  }
</script>

<div class="filter_item">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="filter_label" on:click={changeVisibility}>
    <span>{$globalFilters[$dataKey][key].name}</span>
    {#if $shownSubfilter!==key}
      <i class="fa-solid fa-caret-down"></i>
    {:else}
      <i class="fa-solid fa-caret-up"></i>
    {/if}
  </div>
  {#if $shownSubfilter===key}
    <div class="filter_item_content" transition:slide={{ duration: 250 }}>
      {#if $globalFilters[$dataKey][key].hasSearch}
        <input type="text" bind:value={$globalFilters[$dataKey][key].search} placeholder="поиск" />
      {/if}
      {#if $globalFilters[$dataKey][key].multiply !== undefined}
        <label>
          Должен присутствовать каждый признак
          <input type="checkbox" bind:checked={$globalFilters[$dataKey][key].multiply} />
        </label>
      {/if}
      {#if $globalFilters[$dataKey][key].selection.includes("Radio")}
        <div class="option_container">
          {#each $globalFilters[$dataKey][key].options as val}
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-label-has-associated-control -->
            {#if optionSearch(val)}
              <label
                transition:fade={{ duration: 200 }}
                class="option_item"
                on:click={() => {
                  changeOptionState(key, val);
                }}
              >
                {val}
                <StatusIcon icon={getStateIcon(key, val)} />
              </label>
            {/if}
          {/each}
        </div>
      {:else}
        <div class="option_item">
          <label>
            мин
            <select bind:value={$globalFilters[$dataKey][key].value[0]}>
              {#each getMinArr(key) as option}
                <option>{option}</option>
              {/each}
            </select>
          </label>
          <label>
            макс
            <select bind:value={$globalFilters[$dataKey][key].value[1]}>
              {#each getMaxArr(key) as option}
                <option>{option}</option>
              {/each}
            </select>
          </label>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  .filter_item {
    display: flex;
    flex-direction: column;
    min-height: 1.5rem;
    &:not(:first-child) {
      border-top: 1px solid black;
    }
    &_content {
      overflow-y: auto;
      scrollbar-gutter: stable;
    }
  }
  .filter_label {
    display: flex;
    > * {
      margin-left: auto;
    }
  }
  .option_container {
    padding: 0.5rem 0.25rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.35rem;
    border: 1px dashed black;
  }
  .option_item {
    border: 1px solid black;
    padding: 0 2px;
    cursor: pointer;
    user-select: none;
    &:has(> .fa-square-check) {
      background-color: rgba(0, 255, 0, 0.4);
    }
    &:has(> .excluded) {
      background-color: rgba(0, 0, 0, 0.1);
      color: grey;
    }
    &:has(> .fa-square-xmark) {
      background-color: rgba(255, 0, 0, 0.4);
    }
  }
</style>
