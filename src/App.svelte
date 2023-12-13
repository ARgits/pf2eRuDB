<script async script lang="ts">
  import { decode } from "js-base64";
  import Table from "./lib/table.svelte";
  import type { Tabs, tableHeaders } from "./types";
  import { setContext } from "svelte";
  import { filters } from "./lib/filter/filter";
  import { writable } from "svelte/store";
  import { data } from "./lib/getData";
  import { gsap } from "gsap";
  import { Draggable } from "gsap/Draggable";
  gsap.registerPlugin(Draggable);
  let currentTab: keyof Tabs = "feats";
  const tabs: Tabs = {
    feats: {
      visible: true,
      name: "Способности",
      key: "feats",
    },
    backgrounds: {
      visible: true,
      name: "Происхождения",
      key: "backgrounds",
    },
    spells: {
      visible: true,
      name: "Заклинания",
      key: "spells",
    },
    actions: {
      visible: true,
      name: "Действия",
      key: "actions",
    },
  };
  const urlParams = new URLSearchParams(window.location.search);

  for (const [key, param] of urlParams.entries()) {
    if (key === "tab" && Object.keys(tabs).includes(param)) currentTab = param as keyof Tabs;
    if (key === "filter") {
      const parsedFilterValue = JSON.parse(base64ToStr(param));
      for (const [k, val] of Object.entries($filters[currentTab])) {
        parsedFilterValue[k] = { ...val, ...parsedFilterValue[k] };
      }
      $filters[currentTab] = parsedFilterValue;
    }
  }
  function base64ToStr(base64: string) {
    const binString = decode(base64);
    return new TextDecoder().decode(Uint8Array.from(binString, (m) => m.codePointAt(0)));
  }
  setContext("data", data);
  setContext("filters", filters);
  setContext("numOfElems", writable(null));

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
    actions: [
      {
        name: "Название",
        value: "fullName",
      },
    ],
  };
  let headerHeight: number;
</script>

<main style="--header-height:{headerHeight}px">
  <div class="header" bind:clientHeight={headerHeight}>
    {#if Object.values(tabs).filter((val) => val.visible).length > 1}
      {#each Object.values(tabs).filter((val) => val.visible) as val}
        <div class={currentTab === val.key ? "active" : ""}>
          <button
            class="tab"
            on:click={(e) => {
              currentTab = val.key;
              window.history.replaceState({ tab: currentTab }, "", `?tab=${currentTab}`);
            }}
            on:auxclick={(e) => {
              console.log(e, "aux click");
            }}
            on:contextmenu={(e) => {
              console.log(e, "context menu");
            }}
          >
            {val.name}
          </button>
        </div>
      {/each}
    {/if}
  </div>
  {#key currentTab}
    <div class="main">
      <Table dataKey={currentTab} tableHeaders={tableHeaders[currentTab]} />
    </div>
  {/key}
</main>

<style>
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
