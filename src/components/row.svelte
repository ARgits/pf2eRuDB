<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { tick } from "svelte";
  import html2canvas from "html2canvas";
  import type { Content, TableData, tableHeadersGeneral } from "../types";
  import { tooltip } from "@components/tooltip/tooltip";
  import TooltipFromAction from "@components/tooltip/TooltipFromAction.svelte";
  import FavoritesButton from "@components/Favorites/favoritesButton.svelte";
  export let content: Content[keyof TableData];
  export let collapsibleContent: Map<string, boolean>;
  export let tableHeaders: tableHeadersGeneral;
  export let even: boolean;
  if (content.id.includes("bestiary")) console.log(tableHeaders);
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
</script>

{#each tableHeaders as header, key}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="td{tdClass} {key === 0 ? 'first' : key === tableHeaders.length - 1 ? 'last' : ''}"
    on:click|preventDefault={collapse}
    bind:this={cellElem}
  >
    {#if header.value === "fullName"}
      <div>{@html content.fullName}</div>
    {:else if header.value === "traits"}
      <div>
        {#each content.traits as trait}
          <span class="trait_item">{trait}</span>
        {/each}
      </div>
    {:else if Array.isArray(content[header.value])}
      <p style="margin:0; text-align:left;text-indent:-1rem;margin-left:1rem">
        {#each content[header.value] as subVal, key}
          <div>{key + 1}. {Array.isArray(subVal) ? subVal.join(" или ") : subVal}</div>
        {/each}
      </p>
    {:else}
      <div>
        {content[header.value]}
      </div>
    {/if}
    {#if key === tableHeaders.length - 1}
      <FavoritesButton itemId={content.id} />
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
    <button class="collapsible_button" on:click={collapse} transition:fade={{ duration: 400 }}>
      Скрыть описание
    </button>
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
  .td.last {
    display: flex;
    flex-direction: column;
  }
</style>
