<script lang="ts">
  import { getContext } from "svelte";
  import type { Data, spellsFilters } from "../types";
  import type { Writable } from "svelte/store";
  import { filt, searchByName, sortBy } from "./lib";
  import Counter from "./Counter.svelte";
  import Filter from "./Filter.svelte";
  import Spell from "./spell.svelte";

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
      options: [...new Set(data.map((spell) => spell.level.toString()))].sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true })
      ),
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
      options: [
        "реакция",
        "одиночное действие",
        "активность из 2-х действий",
        "активность из 3-х действий",
        "свободное действие",
      ],
    },
    castingType: {
      name: "Тип сотворения",
      disabled: [],
      selection: "multipleRadio",
      value: [],
      options: [...new Set(data.map((spell) => spell.castingType).flat())].sort((a, b) => a.localeCompare(b)),
    },
  };
  function filterFunction() {
    let { filteredData, pageNum, disabledTraits } = filt(data, filters, temp.length);
    filteredData = searchByName(filteredData, searchStr);
    temp = sortBy(filteredData, sortValues);
    if (hasEmpower) {
      filtEmpower();
    }
    numOfpage = pageNum;
    filters.traits.disabled = disabledTraits;
    collapsibleSpells.forEach((v, k) =>
      collapsibleSpells.set(k, temp.filter((spell) => spell.fullName === k).length === 1 ? v : false)
    );
    collapsibleSpells = collapsibleSpells;
  }
  function sortSpell() {
    temp = sortBy(temp, sortValues);
  }
  function filtEmpower() {
    temp = temp.filter((item) => item.desc.includes("<strong>Усиление"));
  }
  let temp = [...data];
  let numOfpage = 1;
  let sortVariants = [
    { name: "-", value: "-" },
    { name: "Название", value: "name", type: 1 },
    { name: "Уровень", value: "level", type: 2 },
    { name: "Ориг.название", value: "originalName", type: 1 },
  ];
  let sortValues: string[] = [];
  let itemsPerPage = 50;
  $: maxPages = Array(Math.ceil(temp.length / itemsPerPage))
    .fill(null)
    .map((_, ind) => ind + 1);
  let collapsibleFilter = false;
  let searchStr: string = "";
  $: numOfElems = temp.length;
  let collapsibleSpells = new Map();
  data.forEach((spell) => collapsibleSpells.set(spell.fullName, false));
</script>

<div class="main">
  <div class="search">
    <label>
      Поиск по названию
      <input placeholder="Перевод/оригинал" type="text" bind:value={searchStr} on:input={filterFunction} />
    </label>
    <button
      class="collapsible"
      on:click={() => {
        collapsibleFilter = !collapsibleFilter;
      }}
    >
      {collapsibleFilter ? "Скрыть" : "Раскрыть"} фильтр
    </button>
  </div>
  <Filter {filters} {filterFunction} collapsible={collapsibleFilter}>
    <div>Есть Усиление? <input type="checkbox" bind:checked={hasEmpower} on:change={filterFunction} /></div>
  </Filter>
  <div>
    <Counter {numOfElems} />
    <div>
      <span>
        страница
        {#if maxPages.length > 1}
          <select bind:value={numOfpage}>
            {#each maxPages as num}
              <option>{num}</option>
            {/each}
          </select>
        {/if}
      </span>
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
    <thead>
      <th style="width: 30%;">Название</th>
      <th>Обычай / Признак</th>
    </thead>
    <tbody>
      {#each temp.slice((numOfpage - 1) * itemsPerPage, numOfpage * itemsPerPage) as el}
        <Spell spell={el} bind:collapsibleSpells />
      {/each}
    </tbody>
  </div>
</div>

<style lang="scss">
  .search {
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
    display: table;
    border: 1px solid black;
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
  }
  th {
    border: 1px solid;
    position: sticky;
    top: 0;
    background-clip: content-box;
    padding: 0 1px;
    font-size: larger;
    background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), var(--background-image);
  }
</style>
