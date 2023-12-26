<script lang="ts">
  import { onMount, tick } from "svelte";
  import { Draggable } from "gsap/Draggable";
  import { tooltip } from "./tooltip";
  import { slide } from "svelte/transition";
  export let data: any;
  export let isScreenshot: boolean = false;
  export let onClick: () => void;
  let card: HTMLDivElement;
  let height: number;
  let width: number;
  onMount(() => {
    card.focus();
    tooltip(card);
    Draggable.create(`#${data.id}.message`, { dragClickables: true, trigger: `#${data.id}.message > .header`, allowEventDefault:true });
  });
  let isCollapsed = false;
  async function collapse(e: Event) {
    console.log("collapse", e);
    isCollapsed = !isCollapsed;
    await tick();
    tooltip(card);
  }
</script>

<div class="message" bind:this={card} bind:clientHeight={height} style="--card-height:{height}px;" id={data.id}>
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
    margin: 0 1rem;
    top: calc(50% - var(--card-height) / 2);
    left: max(15%, 50px);
    right: max(15%, 50px);
    text-align: justify;
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
        display: hidden;
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
