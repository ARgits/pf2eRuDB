<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import type { Content, TableData, tableHeadersGeneral } from "../types";
  import { tooltip } from "./tooltip/tooltip";
  import { tick } from "svelte";
  import TooltipFromAction from "./tooltip/TooltipFromAction.svelte";
  import html2canvas from "html2canvas";
  import { favoritesStore } from "../store";
  // onMount(() => {
  //   console.log("mounted", content.id);
  // });
  // onDestroy(() => {
  //   console.log("destroyed", content.id);
  // });
  export let content: Content[keyof TableData];
  export let collapsibleContent: Map<string, boolean>;
  export let tableHeaders: tableHeadersGeneral;
  export let even: boolean;
  async function collapse() {
    const isCollapsed = collapsibleContent.get(content.fullName);
    collapsibleContent.set(content.fullName, !isCollapsed);
    collapsibleContent = collapsibleContent;
    getClass();
    if (collapsibleContent.get(content.fullName)) {
      await tick();
      console.log("tooltip", content);
      tooltip(description);
    }
  }
  let description: HTMLDivElement;

  function getClass() {
    let cls = "";
    cls += collapsibleContent.get(content.fullName) ? " expanded" : "";
    cls += (!even && tableHeaders.length === 1) || (even && !(tableHeaders.length === 1)) ? " even" : "";
    tdClass = cls;
  }
  let tdClass = "";
  getClass();
  function download() {
    const tooltipCard = new TooltipFromAction({
      props: {
        data: content,
        isScreenshot: true,
        onClick: () => {
          tooltipCard.$destroy();
        },
      },
      target: document.body,
    });
    console.log("created");
    html2canvas(document.querySelector(`#${content.id}.message`)).then((value) => {
      console.log(value);
      const img = value.toDataURL("image/webp");
      const link = document.createElement("a");
      link.download = content.name;
      link.href = img;
      link.click();
    });
    tooltipCard.$destroy();
    console.log("destroyed");
  }
  let cellElem: HTMLDivElement;
  function setFavorite(){
    if($favoritesStore.includes(content)){
      const index = $favoritesStore.findIndex((val)=>val.id===content.id)
      $favoritesStore.splice(index,1)
      $favoritesStore = $favoritesStore
    }else{
      $favoritesStore = [...$favoritesStore, content]
    }
  }
</script>

{#each tableHeaders as header, key}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="td{tdClass} {key === 0 ? 'first' : key === tableHeaders.length - 1 ? 'last' : ''}" on:click|preventDefault={collapse} bind:this={cellElem}>
    <!-- {#if key === tableHeaders.length - 1}
      <button class="download" on:click|preventDefault|stopPropagation={download}>
        <i class="fa-solid fa-download"></i>
      </button>
    {/if} -->
    {#if key === tableHeaders.length - 1}
      <button class="icon favorite" on:click|stopPropagation={()=>favoritesStore.setFavorite(content)}>
        {#if $favoritesStore.includes(content)}
          <i class="fa-solid fa-bookmark"></i>
        {:else}
          <i class="fa-regular fa-bookmark"></i>
        {/if}
      </button>
    {/if}
    {#if header.value === "fullName"}
      <div>{@html content.fullName}</div>
    {:else if header.value === "traits"}
      {#each content.traits as trait}
        <span class="trait_item">{trait}</span>
      {/each}
    {:else if Array.isArray(content[header.value])}
      <div style="display: flex; text-align:left;text-indent:-1rem;margin-left:1rem; flex-wrap:wrap; gap:0.25rem; flex-direction:column">
        {#each content[header.value] as subVal, key}
          <div>{key + 1}. {Array.isArray(subVal) ? subVal.join(" или ") : subVal}</div>
        {/each}
      </div>
    {:else}
      <div>
        {content[header.value]}
      </div>
    {/if}
  </div>
{/each}
{#if collapsibleContent.get(content.fullName)}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div bind:this={description} class="td description {tdClass}">
    <div class="item_content" transition:slide={{ duration: 500 }}>
      {#if content.traits && !tableHeaders.filter((header) => header.value === "traits").length}
        <div class="traits">
          {#each content.traits as trait}
            <span class="trait_item">{trait}</span>
          {/each}
        </div>
      {/if}
      {@html content.desc}
    </div>
    <button class="collapsible_button" on:click={collapse} transition:fade={{ duration: 400 }}> Скрыть описание </button>
  </div>
{/if}

<style lang="scss">
  .download {
    padding: 5px;
    height: fit-content;
    float: right;
    & i {
      width: 25px;
    }
  }
  .even {
    background-image: var(--cell-even-background-image);
  }
  .td {
    // display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    border: 1px solid black;
    border-top-color: transparent;
    &.expanded {
      border-bottom-color: transparent;
    }
    border-left-color: transparent;
  }
  .td.description {
    grid-column: span var(--col-number);
    &:last-child {
      border-bottom: 1px solid black;
    }
    & .item_content {
      text-align: justify;
      padding: 0 0.5rem;
    }
  }
</style>
