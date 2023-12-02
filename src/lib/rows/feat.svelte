<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import type { Content, TableData, tableHeadersGeneral } from "../../types";
  import { tick } from "svelte";

  export let dataKey: keyof TableData;
  export let content: Content[typeof dataKey];
  export let collapsibleContent: Map<string, boolean>;
  export let tableHeaders: tableHeadersGeneral;
  export let even: boolean;

  async function collapse() {
    console.log(content)
    const isCollapsed = collapsibleContent.get(content.fullName);
    collapsibleContent.set(content.fullName, !isCollapsed);
    collapsibleContent = collapsibleContent;
    await tick();
    if (!isCollapsed) {
      description.querySelectorAll('span[class^="c-"]').forEach((el) => {
        el.addEventListener("mouseover", () => {
          console.log("hovering over");
        });
      });
      setTimeout(() => description.scrollIntoView({ block: "nearest", inline: "start", behavior: "smooth" }), 400);
    }
  }
  let description: HTMLDivElement;
  let isHover: boolean = false;
  function mouseEnter() {
    isHover = true;
    getClass();
  }
  function mouseLeave() {
    isHover = false;
    getClass();
  }

  function getClass() {
    let cls = "";
    cls += collapsibleContent.get(content.fullName) ? " expanded" : "";
    cls += even ? " even" : "";
    cls += isHover ? " hover" : "";
    tdClass = cls;
  }
  let tdClass = "";
  getClass();
</script>

{#each tableHeaders as header, key}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="td{tdClass} {key === 0 ? 'first' : key === tableHeaders.length - 1 ? 'last' : ''}"
    on:click|preventDefault={collapse}
    on:mouseenter={mouseEnter}
    on:mouseleave={mouseLeave}
  >
    {#if header.value === "fullName"}
      <div>{@html content.fullName}</div>
    {:else if header.value === "traits"}
      {#each content.traits as trait}
        <span class="trait_item">{trait}</span>
      {/each}
    {:else if Array.isArray(content[header.value])}
      <div style="display: flex; justify-content:center; flex-wrap:wrap; gap:0.25rem;">
        {#each content[header.value] as subVal,key}
          <div>{key+1}. {Array.isArray(subVal)?subVal.join(' или '):subVal}</div>
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
  <div bind:this={description} class="td description {tdClass}" on:mouseenter={mouseEnter} on:mouseleave={mouseLeave}>
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
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    &.expanded {
      border-bottom: 0;
    }
    &:not(.first) {
      border-left: 0;
    }
  }
  .td.description {
    border-top: 0;
    border-right: 0;
    grid-column: span var(--col-number);
    &:last-child {
      border-bottom: 1px solid black;
    }
  }
  .td.hover {
    box-sizing: border-box;
    border: 1px solid red;

    &:not(.description) {
      &:not(.first) {
        border-left: 0;
      }
      &.last {
        border-right: 1px solid red;
      }
    }
    &.description {
      border-top: 0;
    }
  }
</style>
