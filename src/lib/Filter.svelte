<script lang="ts">
  import type { unionFilters } from "../types";

  export let filters: unionFilters;
  export let filterFunction = () => {};
  export let collapsible = false;
  const filterKeys = Object.keys(filters) as Array<keyof typeof filters>;
</script>

<div class="filters" style="max-height:{collapsible ? '100vh' : '0px'}; border-width:{collapsible ? '1px' : '0px'}">
  {#each filterKeys as key}
    <label>
      <span>{filters[key].name}</span>
      {#if filters[key].multiply !== undefined}
        <div>
          Должен присутствовать каждый признак
          <input type="checkbox" bind:checked={filters[key].multiply} on:change={filterFunction} />
        </div>
      {/if}
      {#if filters[key].selection.includes("Radio")}
        <div class="filters_item">
          {#each filters[key].options as val}
            <label class="checkOption">
              {val}
              <input
                type="checkbox"
                disabled={filters[key].disabled.includes(val) && filters[key].multiply}
                bind:group={filters[key].value}
                value={val}
                on:change={filterFunction}
              />
            </label>
          {/each}
        </div>
      {:else}
        <div class="filters_item">
          <label
            >мин
            <select bind:value={filters[key].value[0]} on:change={filterFunction}>
              {#each filters[key].options.filter((opt) => parseInt(opt) <= parseInt(filters[key].value[1])) as option}
                <option>{option}</option>
              {/each}
            </select>
          </label>
          <label>
            макс
            <select bind:value={filters[key].value[1]} on:change={filterFunction}>
              {#each filters[key].options.filter((opt) => parseInt(opt) >= parseInt(filters[key].value[0])) as option}
                <option>{option}</option>
              {/each}
            </select>
          </label>
        </div>
      {/if}
    </label>
  {/each}
  <slot />
</div>

<style lang="scss">
  .filters {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid black;
    border-radius: 10px;
    padding: 1px;
    justify-content: space-around;
    align-items: center;
    transition: all 1s ease-out;
    overflow: hidden;
    & > label {
      margin: 0 0.25rem 1rem;
    }
  }
  .filters_item {
    padding: 0.5rem 0.25rem;
    display: flex;
    flex-wrap: wrap;
    max-height: 75px;
    overflow-y: auto;
    width: fit-content;
    justify-content: space-between;
    gap: 0.35rem;
    border: 1px dashed black;
  }
  .checkOption {
    border: 1px solid black;
    padding: 0 2px;
    cursor: pointer;
    & input {
      cursor: pointer;
    }
    &:has(> input:checked) {
      background-color: rgba(0, 255, 0, 0.3);
    }
    &:has(> input:disabled) {
      color: grey;
      background-color: rgba(255, 0, 0, 0.3);
      cursor: not-allowed;
      & input {
        cursor: not-allowed;
      }
    }
  }
</style>
