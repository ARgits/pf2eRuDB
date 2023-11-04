<script lang="ts">
  import type { Background, backgroundFilters } from "../types";

  export let data: Background[] = [];
  const bgList = data;
  const filters: backgroundFilters = {
    rarity: { name: "редкость", value: "-" },
    attributeValue: { name: "Повышение характеристики", value: "-" },
    src: { name: "Источник", value: "-" },
  };
  function filt() {
    tempBG = bgList
      .filter((bg) => {
        const filtAR = Object.entries(filters);
        let criteria = 0;
        for (const [key, val] of filtAR) {
          criteria += bg[key as keyof backgroundFilters].includes(val.value) || val.value === "-" ? 1 : 0;
        }
        console.log(bg, criteria);
        return criteria === filtAR.length;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }
  let tempBG = [...bgList].sort((a, b) => a.name.localeCompare(b.name));
</script>

<main>
  <label>
    Редкость
    <select bind:value={filters.rarity} on:change={() => filt()}>
      <option>-</option>
      <option>Обычный</option>
      <option>Необычный</option>
      <option>Редкий</option>
    </select>
  </label>
  <label
    >Характеристика
    <select bind:value={filters.attributeValue} on:change={() => filt()}>
      <option>-</option>
      <option>Сила</option>
      <option>Ловкость</option>
      <option>Телосложение</option>
      <option>Интеллект</option>
      <option>Мудрость</option>
      <option>Харизма</option>
    </select>
  </label>
  <div class="table">
    <div class="header">Имя</div>
    <div class="header">Источник</div>
    <div class="header">Повышение характеристик</div>
    <div class="header desc">Описание</div>
    {#each tempBG as bg}
      <div>{bg.name}</div>
      <div>{bg.src}</div>
      <div>
        {#if bg.attributeValue[0] !== ""}
          {#each bg.attributeValue.split(", ") as val, ind}
            <p>{ind + 1}. {val}</p>
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
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
  }
  .table > * {
    align-items: center;
    flex-basis: 15%;
    padding: 5px;
    border-bottom: 1px rgba(0, 0, 0, 0.5) solid;
  }
  .desc {
    flex-basis: 50%;
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
