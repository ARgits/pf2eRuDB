<script lang="ts">
  import { decode } from "js-base64";
  import Table from "./lib/table.svelte";
  import type { Tabs, tableHeaders } from "./types";
  import { setContext } from "svelte";
  import { filters, currentTab, watch, favoritesStore } from "./store";
  // import { data } from "./lib/getData";
  import { gsap } from "gsap";
  import { Draggable } from "gsap/Draggable";
  import { dataStore } from "./store";
  import { changeUrlOnFilter } from "./lib/filter/filterData";
  import { fade, slide } from "svelte/transition";
  // import { getData } from "./lib/getData";
  gsap.registerPlugin(Draggable);
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
    console.log("filters changed");
    changeUrlOnFilter($filters[$currentTab], $currentTab);
  });
  function base64ToStr(base64: string) {
    const binString = decode(base64);
    return new TextDecoder().decode(Uint8Array.from(binString, (m) => m.codePointAt(0)));
  }
  dataStore.getData();
  // console.log(data);
  // setContext("data", data);
  setContext("filters", filters);

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
    favorites: [],
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
          {#if val.maxItems !== $dataStore[val.key]?.length && val.key !== "favorites"}
            <progress max={val.maxItems} value={$dataStore[val.key].length} />
          {/if}
        </div>
      {/each}
    {/if}
  </div>
  {#key $currentTab}
    <div class="main">
      {#if $currentTab !== "favorites"}
        <Table tableHeaders={tableHeaders[$currentTab]} />
      {:else}
        <div class="favorites">
          {#each $favoritesStore as item (item.id)}
            <div class="favorite_item" transition:fade={{duration:250}}>
              <div class="content">
                <div>
                  {item.name}
                </div>
                <div>
                  {@html item.desc}
                </div>
              </div>

              <button class="icon favorite" on:click|stopPropagation={() => favoritesStore.setFavorite(item)}>
                {#if $favoritesStore.includes(item)}
                  <i class="fa-solid fa-bookmark"></i>
                {:else}
                  <i class="fa-regular fa-bookmark"></i>
                {/if}
              </button>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/key}
</main>

<style lang="scss">
  main {
    height: calc(100vh - 2rem);
    height: calc(100dvh - 2rem);
  }
  .favorites {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    overflow-y: auto;
    height: 90%;
    align-content: flex-start;
    .favorite_item {
      display: flex;
      gap: 10px;
      border: 1px solid black;
      justify-content: space-between;
      padding: 5px;
      flex:1 0 200px;
      .content {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
      }
    }
    button.favorite {
      position: unset;
      align-self: flex-start;
    }
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
