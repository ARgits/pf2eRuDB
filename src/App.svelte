<script lang="ts">
  import { writable } from "svelte/store";
  import * as data from "./assets/data.json";
  import Backgrounds from "./lib/backgrounds.svelte";
  import Feats from "./lib/feats.svelte";
  import { prepareData } from "./lib/prepareData";
  import Spells from "./lib/spells.svelte";
  import type { Tabs } from "./types";
  import { setContext } from "svelte";

  const dataStore = writable(prepareData(data));
  setContext("data", dataStore);
  const { backgrounds, feats, spells, traits, paragraphs } = $dataStore;
  const tabs: Tabs = {
    feats: {
      component: Feats,
      data: feats,
      visible: false,
    },
    backgrounds: {
      component: Backgrounds,
      data: backgrounds,
      visible: false,
    },
    spells: {
      component: Spells,
      data: spells,
      visible: true,
    },
  };
  let currentTab = "spells";
  console.log([...paragraphs].sort((a, b) => a.localeCompare(b)));
</script>

<main>
  {#if Object.values(tabs).filter((val) => val.visible).length > 1}
    {#each Object.keys(tabs) as key}
      {#if tabs[key].visible}
        <button on:click={() => (currentTab = key)}>{key}</button>
      {/if}
    {/each}
  {/if}

  <svelte:component this={tabs[currentTab].component} />
</main>

<style>
</style>
