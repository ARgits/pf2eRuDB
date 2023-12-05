<script lang="ts">
  import check from "@fortawesome/fontawesome-free/svgs/solid/square-check.svg";
  import xmark from "@fortawesome/fontawesome-free/svgs/solid/square-xmark.svg";
  import square from "@fortawesome/fontawesome-free/svgs/regular/square.svg";
  import { getContext } from "svelte";
  import type { globalFilter, filterUnion } from "../../types";
  import type { Writable } from "svelte/store";
  import { fade } from "svelte/transition";
  import StatusIcon from "../utilityComponents/statusIcon.svelte";

  export let key: keyof filterUnion;
  export let dataKey: string;
  export let filterFunction = () => {};

  const globalFilters: Writable<globalFilter> = getContext("filters");
  function getStateIcon(key: keyof filterUnion, val: string) {
    const excluded = $globalFilters[dataKey][key].excluded.includes(val) ? " excluded" : "";
    if ($globalFilters[dataKey][key].value.includes(val)) return { src: check, class: "check" + excluded };
    if ($globalFilters[dataKey][key].disabled.includes(val)) return { src: xmark, class: "xmark" + excluded };
    return { src: square, class: "square" + excluded };
  }
  /**
   * Меняем значение фильтра между 3 состояниями: учитывать, строго не учитывать, не учитывать
   * @param key - ключ фильтра
   * @param val - значение
   */
  function changeOptionState(key: keyof filterUnion, val: string) {
    const { disabled, value } = $globalFilters[dataKey][key];
    if (disabled.includes(val)) {
      const ind = disabled.findIndex((v: string) => val === v);
      disabled.splice(ind, 1);
      $globalFilters[dataKey][key].disabled = [...disabled];
    } else if (value.includes(val)) {
      const ind = value.findIndex((v: string) => val === v);
      value.splice(ind, 1);
      $globalFilters[dataKey][key].value = [...value];
      $globalFilters[dataKey][key].disabled = [...disabled, val];
    } else {
      $globalFilters[dataKey][key].value = [...value, val];
    }
    filterFunction();
  }
  function getMinArr(key: keyof filterUnion) {
    return $globalFilters[dataKey][key].options.filter(
      (opt: string) => parseInt(opt) <= parseInt($globalFilters[dataKey][key].value[1])
    );
  }
  function getMaxArr(key: keyof filterUnion) {
    return $globalFilters[dataKey][key].options.filter(
      (opt: string) => parseInt(opt) >= parseInt($globalFilters[dataKey][key].value[0])
    );
  }
  $: options = ($globalFilters[dataKey][key].options as string[]).filter((v: string) =>
    v.includes($globalFilters[dataKey][key].search.toLowerCase())
  );
  // .sort((a, b) => $globalFilters[dataKey][key].value.includes(b) - $globalFilters[dataKey][key].value.includes(a));
</script>

<label class="filter_item">
  <span>{$globalFilters[dataKey][key].name}</span>
  {#if $globalFilters[dataKey][key].hasSearch}
    <input type="text" bind:value={$globalFilters[dataKey][key].search} placeholder="поиск" />
  {/if}
  {#if $globalFilters[dataKey][key].multiply !== undefined}
    <div>
      Должен присутствовать каждый признак
      <input type="checkbox" bind:checked={$globalFilters[dataKey][key].multiply} on:change={filterFunction} />
    </div>
  {/if}
  {#if $globalFilters[dataKey][key].selection.includes("Radio")}
    <div class="option_container">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      {#each options as val}
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- <label
              class="checkOption{!val.includes($globalFilters[dataKey][key].search) ? ' hidden' : ''}"
              on:click={() => {
                changeOptionState(key, val);
              }}
            > -->
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
      {/each}
    </div>
  {:else}
    <div class="option_item">
      <label>
        мин
        <select bind:value={$globalFilters[dataKey][key].value[0]} on:change={filterFunction}>
          {#each getMinArr(key) as option}
            <option>{option}</option>
          {/each}
        </select>
      </label>
      <label>
        макс
        <select bind:value={$globalFilters[dataKey][key].value[1]} on:change={filterFunction}>
          {#each getMaxArr(key) as option}
            <option>{option}</option>
          {/each}
        </select>
      </label>
    </div>
  {/if}
</label>

<style lang="scss">
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
    &:has(> .check) {
      background-color: rgba(0, 255, 0, 0.4);
    }
    &:has(> .excluded) {
      background-color: rgba(0, 0, 0, 0.1);
      color: grey;
    }
    &:has(> .xmark) {
      background-color: rgba(255, 0, 0, 0.4);
    }
  }
</style>