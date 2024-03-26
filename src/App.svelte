<script lang="ts">
  import { setContext } from "svelte";
  import { decode } from "js-base64";
  import { gsap } from "gsap";
  import { Draggable } from "gsap/Draggable";

  import type { Tabs, tableHeaders } from "./types";
  import { currentTab, watch } from "./stores/store";
  import { dataStore } from "@stores/dataStore";
  import { filters } from "@stores/filterStore";

  import { changeUrlOnFilter } from "@components/filter/filterData";
  import Table from "@components/table.svelte";
  import FavoritesTab from "@components/Favorites/favoritesTab.svelte";
  import { writable } from "svelte/store";
  gsap.registerPlugin(Draggable);
  gsap.registerEffect({
    name: "fade",
    defaults: { duration: 2, onComplete: () => {} }, //defaults get applied to the "config" object passed to the effect below
    effect: (targets, config) => {
      return gsap.to(targets, { duration: config.duration, opacity: 0, onComplete: config.onComplete });
    },
  });
  setContext("currentTab", currentTab);

  const tabs: Tabs = {
    feats: {
      visible: true,
      name: "Способности",
      key: "feats",
      maxItems: 3784,
    },
    backgrounds: {
      visible: true,
      name: "Происхождения",
      key: "backgrounds",
      maxItems: 220,
    },
    spells: {
      visible: true,
      name: "Заклинания",
      key: "spells",
      maxItems: 1091,
    },
    actions: {
      visible: true,
      name: "Действия",
      key: "actions",
      maxItems: 192,
    },
    creatures: {
      visible: true,
      name: "Бестиарий",
      key: "creatures",
      maxItems: null,
    },
    favorites: {
      visible: true,
      name: "Избранное",
      key: "favorites",
      maxItems: null,
    },
  };

  const urlParams = new URLSearchParams(window.location.search);

  for (const [key, param] of urlParams.entries()) {
    if (key === "tab" && Object.keys(tabs).includes(param)) $currentTab = param as keyof Tabs;
    if (key === "filter") {
      const parsedFilterValue = JSON.parse(base64ToStr(param));
      console.log(parsedFilterValue);
      for (const [k, val] of Object.entries($filters[$currentTab])) {
        //@ts-ignore
        parsedFilterValue[k] = { ...val, ...parsedFilterValue[k] };
      }
      $filters[$currentTab] = parsedFilterValue;
    }
  }
  watch([filters, currentTab], ([$filters, $currentTab]) => {
    console.log("filters changed", $filters);
    changeUrlOnFilter($filters[$currentTab], $currentTab);
  });
  function base64ToStr(base64: string) {
    const binString = decode(base64);
    return new TextDecoder().decode(Uint8Array.from(binString, (m) => m.codePointAt(0)));
  }
  setContext("tableView", writable("table"));
  dataStore.getData().then(() => console.log($dataStore.backgrounds));
  setContext("filters", filters);

  const tableHeadersValue: tableHeaders = {
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
    actions: [
      {
        name: "Название",
        value: "fullName",
      },
    ],
    favorites: [],
    creatures: [{ name: "Название", value: "fullName" }],
  };
  let headerHeight: number;
</script>

<main style="--header-height:{headerHeight}px">
  <div class="header" bind:clientHeight={headerHeight}>
    {#if Object.values(tabs).filter((val) => val.visible).length > 1}
      {#each Object.values(tabs).filter((val) => val.visible) as val}
        <div class={$currentTab === val.key ? "active" : ""}>
          <button
            class="tab"
            on:click={() => {
              $currentTab = val.key;
              // window.history.replaceState({ tab: currentTab }, "", `?tab=${currentTab}`);
            }}
          >
            {val.name}
          </button>
          {#if val.maxItems !== $dataStore[val.key]?.length && val.maxItems !== null}
            <progress max={val.maxItems} value={$dataStore[val.key].length} />
          {/if}
        </div>
      {/each}
    {/if}
  </div>
  {#key $currentTab}
    <div class="main">
      {#if $currentTab !== "favorites"}
        <Table tableHeaders={tableHeadersValue[$currentTab]} />
      {:else}
        <FavoritesTab />
      {/if}
    </div>
  {/key}
</main>

<style lang="scss">
  main {
    height: calc(100vh - 2rem);
    height: calc(100dvh - 2rem);
  }

  .header {
    height: fit-content;
    max-height: 10%;
  }
  div.main {
    flex-direction: row-reverse;
    height: calc(100% - var(--header-height, 0px) - 1rem);
    @media (max-aspect-ratio: 1.1/1) {
      gap: 0;
    }
  }
  button.tab {
    font-size: 150%;
  }
</style>
