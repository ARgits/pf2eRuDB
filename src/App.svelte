<script lang="ts">
  import { writable } from "svelte/store";
  import * as data from "./assets/data.json";
  import Backgrounds from "./lib/backgrounds.svelte";
  import Feats from "./lib/feats.svelte";
  import { prepareData } from "./lib/prepareData";
  import Spells from "./lib/spells.svelte";
  import type { Tabs } from "./types";
  import { onMount, setContext } from "svelte";
  import PF_action_1 from "./assets/PF_action_1.webp";
  import PF_action_2 from "./assets/PF_action_2.webp";
  import PF_action_3 from "./assets/PF_action_3.webp";
  import PF_action_reaction from "./assets/PF_action_reaction.webp";
  import PF_action_free from "./assets/PF_action_free.webp";
  import backgroundImage from "./assets/parchmentBackground.jpg"

  onMount(() => {
    const imgArr = [PF_action_1, PF_action_2, PF_action_3, PF_action_free, PF_action_reaction];
    for (let src of imgArr) {
      let img = new Image();
      img.src = src;
    }
  });
  const dataStore = writable(prepareData(data));
  setContext("data", dataStore);
  const { backgrounds, feats, spells, paragraphs } = $dataStore;
  const tabs: Tabs = {
    feats: {
      component: Feats,
      data: feats,
      visible: false,
      name: "Черты",
      key: "feats",
    },
    backgrounds: {
      component: Backgrounds,
      data: backgrounds,
      visible: true,
      name: "Происхождения",
      key: "backgrounds",
    },
    spells: {
      component: Spells,
      data: spells,
      visible: true,
      name: "Заклинания",
      key: "spells",
    },
  };
  let currentTab: keyof Tabs = "spells";
  console.log([...paragraphs].sort((a, b) => a.localeCompare(b)));
</script>

<main style="--background-image:url({backgroundImage})">
  <div class="header">
    {#if Object.values(tabs).filter((val) => val.visible).length > 1}
      {#each Object.values(tabs) as val}
        {#if val.visible}
          <button class={currentTab === val.key ? "active" : ""} on:click={() => (currentTab = val.key)}>
            {val.name}
          </button>
        {/if}
      {/each}
    {/if}
  </div>

  <svelte:component this={tabs[currentTab].component} />
</main>

<style>
  .active {
    background-color: rgba(127, 255, 144, 0.5);
  }
</style>
