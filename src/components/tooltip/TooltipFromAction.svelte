<script lang="ts">
  import { onMount, tick } from "svelte";
  import { Draggable } from "gsap/Draggable";
  import { tooltip } from "./tooltip";
  import { slide } from "svelte/transition";
  import type { generalContent } from "../../types";
  export let data: generalContent;
  // biome-ignore lint/style/useConst: <explanation>
  export let isScreenshot = false;
  export let onClick: () => void;
  let card: HTMLDivElement;
  onMount(() => {
    card.focus();
    tooltip(card);
    new Draggable(`#${data.id}.message`, {
      dragClickables: true,
      trigger: `#${data.id}.message > .header`,
      allowEventDefault: true,
      zIndexBoost: true,
    });
  });
  let isCollapsed = false;
  async function collapse(e: Event) {
    console.log("collapse", e);
    isCollapsed = !isCollapsed;
    await tick();
    tooltip(card);
  }
</script>

<div class="message" bind:this={card} id={data.id}>
  <div class="header" transition:slide={{ delay: 100 }}>
    <div>{@html data.fullName}</div>
    {#if !isScreenshot}
      <div class="buttons">
        <button on:click|preventDefault={collapse}>
          <i class="fa-regular fa-window-minimize"></i>
        </button>
        <button on:click={onClick}>
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    {/if}
  </div>
  {#if !isCollapsed}
    <div class="content" transition:slide={{ delay: 100 }}>
      {#if data.traits?.length}
        <div class="traits">
          {#each data.traits as trait}
            <span class="trait_item">{trait}</span>
          {/each}
        </div>
      {/if}
      <div>{@html data.desc}</div>
    </div>
  {/if}
</div>

<style lang="scss">
  .message {
    border: 2px solid black;
    background-image: var(--background-image);
    border-radius: 4px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    height: fit-content;
    min-width: 200px;
    max-width: 90dvw;
    width: fit-content;
    // top: calc(50% - var(--card-height) / 2);
    // left: max(15%, 50px);
    // right: max(15%, 50px);
    text-align: justify;
    z-index: 100;
    & .content {
      max-height: 75dvh;
      overflow-y: scroll;
      overflow-x: hidden;
      scrollbar-gutter: stable;
      padding: 4px;
      & .traits {
        display: flex;
        flex-wrap: wrap;
      }
      &::-webkit-scrollbar {
        display: none;
      }
      &:hover ::-webkit-scrollbar {
        display: unset;
      }
    }
    & .header {
      gap: 1rem;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      padding: 4px;
      color: #cbc18f;
      background-color: #522e2c;
      & :global(a.reference.external) {
        color: inherit;
      }
    }
  }
  .buttons {
    display: flex;
    gap: 0.5rem;
  }
  button {
    border: none;
    padding: 0;
    // background-color: unset;
    border-radius: unset;
    background: unset;
    font-size: 150%;
    text-align: center;
  }
</style>
