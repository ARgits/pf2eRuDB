<script lang="ts">
  import { getContext } from "svelte";
  import type { Data, spellsFilters } from "../types";
  import type { Writable } from "svelte/store";
  import { filt, searchByName, sortBy } from "./lib";
  import Counter from "./Counter.svelte";
  const contextData: Writable<Data> = getContext("data");
  const data = $contextData["spells"];
  let hasEmpower = false;
  const filters: spellsFilters = {
    type: {
      name: "тип",
      value: [],
      selection: "singleRadio",
      options: [...new Set(data.map((spell) => spell.type))],
      disabled: [],
    },
    level: {
      name: "уровень",
      selection: "minMax",
      value: ["1", "10"],
      options: [...new Set(data.map((spell) => spell.level.toString()))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
      disabled: [],
    },
    tradition: {
      name: "Обычай",
      value: [],
      selection: "multipleRadio",
      options: [...new Set(data.map((spell) => spell.tradition).flat())],
      disabled: [],
    },
    traits: {
      name: "Признаки",
      value: [],
      selection: "multipleRadio",
      options: [...new Set(data.map((spell) => spell.traits).flat())].sort((a, b) => a.localeCompare(b)),
      multiply: false,
      disabled: [],
    },
    rarity: {
      name: "Редкость",
      value: [],
      selection: "singleRadio",
      options: [...new Set(data.map((spell) => spell.rarity))],
      disabled: [],
    },
    action: {
      name: "Действие",
      disabled: [],
      selection: "singleRadio",
      value: [],
      options: ["реакция", "одиночное действие", "активность из 2-х действий", "активность из 3-х действий", "свободное действие"],
    },
  };
  function filtSpell() {
    let { filteredData, pageNum, disabledTraits } = filt(data, filters, temp.length);
    filteredData = searchByName(filteredData, searchStr);
    temp = sortBy(filteredData, sortValues);
    if (hasEmpower) {
      filtEmpower();
    }
    numOfpage = pageNum;
    filters.traits.disabled = disabledTraits;
  }
  function sortSpell() {
    temp = sortBy(temp, sortValues);
  }
  function filtEmpower() {
    temp = temp.filter((item) => item.desc.includes("<strong>Усиление"));
  }
  const filterKeys = Object.keys(filters) as Array<keyof typeof filters>;
  let temp = [...data];

  let numOfpage = 1;
  let sortVariants = [
    { name: "-", value: "-" },
    { name: "Название", value: "name", type: 1 },
    { name: "Уровень", value: "level", type: 2 },
    { name: "Ориг.название", value: "originalName", type: 1 },
  ];
  let sortValues: string[] = [];
  $: maxPages = Array(Math.ceil(temp.length / 50))
    .fill(null)
    .map((_, ind) => ind + 1);
  let collapsible = false;
  let filterBlock: HTMLDivElement;
  let searchStr: string;
  $: numOfElems = temp.length;
</script>

<div class="main">
  <div class='search'>
    <label>
      Поиск
      <input type="text" bind:value={searchStr} on:input={filtSpell} />
    </label>
    <button
      class="collapsible"
      on:click={() => {
        collapsible = !collapsible;
      }}
    >
      {collapsible ? "Скрыть" : "Раскрыть"} фильтр
    </button>
  </div>
  <div class="filters" bind:this={filterBlock} style="max-height:{collapsible ? '100vh' : '0px'}; border-width:{collapsible ? '1px' : '0px'}">
    {#each filterKeys as key}
      <label>
        <span>{filters[key].name}</span>
        {#if filters[key].multiply !== undefined}
          <div>
            Должен присутствовать каждый признак
            <input type="checkbox" bind:checked={filters[key].multiply} on:change={filtSpell} />
          </div>
        {/if}
        {#if filters[key].selection.includes("Radio")}
          <div class="filters_item">
            {#each filters[key].options as val}
              <label class="checkOption">
                {val}
                <input type="checkbox" disabled={filters[key].disabled.includes(val) && filters[key].multiply} bind:group={filters[key].value} value={val} on:change={filtSpell} />
              </label>
            {/each}
          </div>
        {:else}
          <div class="filters_item">
            <label
              >мин
              <select bind:value={filters[key].value[0]} on:change={filtSpell}>
                {#each filters[key].options.filter((opt) => parseInt(opt) <= parseInt(filters[key].value[1])) as option}
                  <option>{option}</option>
                {/each}
              </select>
            </label>
            <label>
              макс
              <select bind:value={filters[key].value[1]} on:change={filtSpell}>
                {#each filters[key].options.filter((opt) => parseInt(opt) >= parseInt(filters[key].value[0])) as option}
                  <option>{option}</option>
                {/each}
              </select>
            </label>
          </div>
        {/if}
      </label>
    {/each}
    <div>Есть Усиление? <input type="checkbox" bind:checked={hasEmpower} on:change={filtSpell} /></div>
  </div>
  <div>
    <Counter {numOfElems} />
    <span>
      {#if maxPages.length > 1}
        <select bind:value={numOfpage}>
          {#each maxPages as num}
            <option>{num}</option>
          {/each}
        </select>
      {/if}
    </span>
  </div>
  <div>
    <span>Сортировать по</span>
    <span>
      {#each sortVariants.slice(0, 2) as _, ind}
        <select bind:value={sortValues[ind]} on:change={sortSpell} disabled={ind > 0 && sortValues[0] === "-"}>
          {#each sortVariants as svar}
            <option value={svar.value} disabled={sortValues.includes(svar.value) && svar.value !== "-"}>
              {svar.name}
            </option>
          {/each}
        </select>
      {/each}
    </span>
  </div>
  <div class="table">
    {#each ["Название", "Обычай / Признак", "Описание"] as head}
      <div class="header">{head}</div>
    {/each}

    {#each temp.slice((numOfpage - 1) * 50, numOfpage * 50) as el}
      <div class="content">
        <div>{el.name}</div>
        <div>/ {el.type} {el.level} /</div>
        <div>{el.originalName}</div>
      </div>

      <div class="content">
        {#each el.tradition as trad}
          <div>{trad}</div>
        {/each}
        {#each el.traits as trait}
          <span class={filters.traits.value.includes(trait) ? "strong" : ""}>{" " + trait}</span>
        {/each}
      </div>
      <div class="content"><span>{@html el.desc}</span></div>
    {/each}
  </div>
</div>

<style lang="scss">
  .search{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .main {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  }
  .table {
    display: grid;
    grid-template-columns: repeat(auto-fill, 33.3%);
  }
  .table > *:not(.header) {
    &:nth-child(3n-2) {
      border-left: 1px solid black;
    }
    &:not(:nth-child(3n)) {
      border-right: 1px dashed black;
    }
    &:nth-child(3n) {
      border-right: 1px solid black;
    }
    &:nth-last-child(n) {
      border-bottom: 1px solid black;
    }
  }

  .header {
    border-bottom: thick double black;
    text-align: center;
    font-size: larger;
    position: sticky;
    top: 20px;
    margin-top: 1rem;
    background-color: var(--background-color);
    background-clip: content-box;
    z-index: 1;
    padding: 0 1px;
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
  .content {
    container-type: inline-size;
    padding: 0.25rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
    gap: 0 0.25rem;
    & > * {
      white-space: pre-line;
      word-break: break-word;

      //font-size: 15cqw;
    }
  }
  .strong {
    font-weight: bold;
  }
</style>
