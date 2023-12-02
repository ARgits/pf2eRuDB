<script lang="ts">
  import Backgrounds from "./lib/backgrounds.svelte";
  import Feats from "./lib/feats.svelte";
  import Spells from "./lib/spells.svelte";
  import type { Tabs, tableHeaders } from "./types";
  import { setContext } from "svelte";
  import { filters } from "./lib/filter";
  import { readyData } from "./lib/readyData";
  import { writable } from "svelte/store";
  setContext("data", readyData);
  setContext("filters", filters);
  setContext("numOfElems",writable(null))
  const tabs: Tabs = {
    feats: {
      component: Feats,
      visible: true,
      name: "Способности",
      key: "feats",
    },
    backgrounds: {
      component: Backgrounds,
      visible: true,
      name: "Происхождения",
      key: "backgrounds",
    },
    spells: {
      component: Spells,
      visible: true,
      name: "Заклинания",
      key: "spells",
    },
  };
  const tableHeaders: tableHeaders = {
    feats: [
      {
        name: "Название",
        value: "fullName",
      },
      {
        name: "Признаки",
        value: "traits",
      },
    ],
    backgrounds: [
      {
        name: "Название",
        value: "fullName",
      },
      {
        name: "Редкость",
        value: "rarity",
      },
      {
        name: "Повышение характеристики",
        value: "attributeValue",
      },
    ],
    spells: [
      {
        name: "Название",
        value: "fullName",
      },
      {
        name: "Признаки",
        value: "traits",
      },
      {
        name: "Обычай",
        value: "tradition",
      },
    ],
  };
  let currentTab: keyof Tabs = "feats";
</script>

<main>
  <div class="header">
    {#if Object.values(tabs).filter((val) => val.visible).length > 1}
      {#each Object.values(tabs) as val}
        {#if val.visible}
          <div class={currentTab === val.key ? "active" : ""}>
            <button class="tab" on:click={() => (currentTab = val.key)}>
              {val.name}
            </button>
          </div>
        {/if}
      {/each}
    {/if}
  </div>
  {#key currentTab}
    <Feats dataKey={currentTab} tableHeaders={tableHeaders[currentTab]} />
  {/key}
</main>

<style>
</style>
