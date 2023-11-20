<script lang="ts">
  import { getContext } from "svelte";
  import type { Data, backgroundFilters } from "../types";
  import type { Writable } from "svelte/store";
  import { filt, searchByName } from "./lib";
  import Filter from "./Filter.svelte";
  import Counter from "./Counter.svelte";

  const contextData: Writable<Data> = getContext("data");
  const data = $contextData["backgrounds"];
  const filters: backgroundFilters = {
    rarity: {
      name: "Редкость",
      value: [],
      selection: "singleRadio",
      options: [...new Set(data.map((bg) => bg.rarity))],
      disabled: [],
    },
    attributeValue: {
      disabled: [],
      name: "Повышение характеристики",
      value: [],
      selection: "multipleRadio",
      options: ["Сила", "Ловкость", "Интеллект", "Телосложение", "Харизма", "Мудрость"],
    },
  };
  function filterFunction() {
    let { filteredData, pageNum } = filt(data, filters, temp.length);
    filteredData = searchByName(filteredData, searchStr);
    temp = [...filteredData]
    //temp = sortBy(filteredData, sortValues);
    numOfpage = pageNum;
  }
  let temp = [...data];
  let numOfpage = 1;
  let searchStr = "";
  let collapsible = false;
  $:numOfElems=temp.length
  console.log(temp.map((bg)=>{return {name:bg.name,rarity:bg.rarity}}))
</script>

<main>
  <div class="search">
    <label>
      Поиск по названию
      <input placeholder="Перевод/оригинал" type="text" bind:value={searchStr} on:input={filterFunction} />
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
  <Filter {filters} {filterFunction} {collapsible} />
  <Counter {numOfElems}></Counter>
  <div class="table">
    <div class="header">Имя</div>
    <div class="header">Повышение характеристик</div>
    <div class="header desc">Описание</div>
    {#each temp as bg}
      <div>{bg.name}</div>
      <div>
        {#if bg.attributeValue[0] !== ""}
          {#each bg.attributeValue.split(", ") as val, ind}
            {#if val !== ""}
              <p>{ind + 1}. {val}</p>
            {/if}
          {/each}
        {:else}
          {bg.attributeDesc}
        {/if}
      </div>
      <div class="desc">{bg.desc}</div>
    {/each}
  </div>
</main>

<style>
  .table {
    display: grid;
    grid-template-columns: repeat(auto-fill, 33.3%);
  }
  .table > * {
    align-items: center;
    padding: 5px;
    border-bottom: 1px rgba(0, 0, 0, 0.5) solid;
  }
  .desc {
    text-align: left;
  }
  .header {
    text-align: center;
    font-size: larger;
    border-bottom: 1px black solid;
    position: sticky;
    top: 20px;
    background-color: white;
  }
</style>
