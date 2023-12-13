<script lang="ts">
  import Tooltip from "./tooltip/TooltipFromAction.svelte";
  import { fade, slide } from "svelte/transition";
  import type { Content, TableData, tableHeadersGeneral } from "../types";
  import { tick } from "svelte";
  import { tooltip } from "./tooltip/tooltip";
  import { data } from "./getData";

  export let content: Content[keyof TableData];
  export let collapsibleContent: Map<string, boolean>;
  export let tableHeaders: tableHeadersGeneral;
  export let even: boolean;

  async function collapse() {
    console.log(content);
    const isCollapsed = collapsibleContent.get(content.fullName);
    collapsibleContent.set(content.fullName, !isCollapsed);
    collapsibleContent = collapsibleContent;
    await tick();
    if (!isCollapsed) {
      //TODO: сделать адекватную функцию сроллинга к контенту для десктопа и мобильной версий
      // const parent = description.parentElement;
      // const descriptionTop = description.offsetTop;
      // const headerHeight = document.querySelector(".th").scrollHeight;
      // setTimeout(() => description.scrollIntoView({ block: "nearest", inline: "start", behavior: "smooth" }), 400);
      // setTimeout(() => (parent.scrollTop = descriptionTop + headerHeight), 500);

      // description.querySelectorAll('span[class^="c-"]').forEach((el: HTMLElement) => {
      //   tooltip(el);
      // });
      tooltip(description);
    } else {
      const parent = description.parentElement;
      parent.scrollBy({ top: -1 * description.clientHeight, behavior: "smooth" });
    }
  }
  function getTooltipText(element: HTMLElement) {}
  let description: HTMLDivElement;
  let isHover: boolean = false;

  function getClass() {
    let cls = "";
    cls += collapsibleContent.get(content.fullName) ? " expanded" : "";
    cls += (!even && tableHeaders.length === 1) || (even && !(tableHeaders.length === 1)) ? " even" : "";
    tdClass = cls;
  }
  let tdClass = "";
  getClass();
  let cellElem;
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
      {#each content.traits as trait}
        <span class="trait_item">{trait}</span>
      {/each}
    {:else if Array.isArray(content[header.value])}
      <div style="display: flex; justify-content:center; flex-wrap:wrap; gap:0.25rem;">
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
    <div class="item_content" transition:slide={{ duration: 500 }}>{@html content.desc}</div>
    <button class="collapsible_button" on:click={collapse} transition:fade={{ duration: 400 }}>
      Скрыть описание
    </button>
  </div>
{/if}

<style lang="scss">
  .even {
    background-image: var(--cell-even-background-image);
  }
  .td {
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
