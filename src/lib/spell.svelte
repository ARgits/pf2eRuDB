<script lang="ts">
  import type { Spell } from "../types";
  import { fade, slide } from "svelte/transition";

  export let spell: Spell;
  export let collapsibleSpells: Map<string, boolean>;
  function collapse() {
    console.log("collapse");
    collapsibleSpells.set(spell.fullName, !collapsibleSpells.get(spell.fullName));
    collapsibleSpells = collapsibleSpells;
  }
</script>

<tr
  transition:fade|global={{ duration: 200 }}
  class="item {collapsibleSpells.get(spell.fullName) ? 'expanded' : ''}"
  on:click={collapse}
>
  <td class="item_name">
    {spell.fullName}
  </td>
  <td>
    {#if spell.tradition.length}
      <div class="tradition"><strong>Обычай:</strong> {spell.tradition.join(", ")}</div>
    {/if}
    <div class="trait">
      <span> <strong>Признаки: </strong></span>
      {#each spell.traits as trait}
        <span class="trait_item">{trait}</span>
      {/each}
    </div>
  </td>
</tr>
{#if collapsibleSpells.get(spell.fullName)}
  <tr class="collapsible">
    <td class="description" colspan="2">
      <span transition:slide={{ duration: 500 }} class="titleSeparator" />
      <div class="item_content" transition:slide={{ duration: 500 }}>{@html spell.desc}</div>
      <button on:click={collapse} transition:fade={{ duration: 250 }}> Скрыть описание </button>
    </td>
  </tr>
{/if}

<style lang="scss">
  tr.item {
    &:nth-child(even of .item) {
      background-color: rgba(0, 0, 0, 0.1);
      & + tr.collapsible {
        background-color: rgba(0, 0, 0, 0.1);
        &:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
      }
      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
        & + tr.collapsible {
          background-color: rgba(255, 255, 255, 0.3);
        }
      }
      &:has(+ tr.collapsible:hover) {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
    & + tr.collapsible:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
    &:hover {
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.3);
      & + tr.collapsible {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
    &:has(+ tr.collapsible:hover) {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
  td {
    border: 1px solid black;
    border-bottom-width: 0;
  }
  .collapsible {
    & button {
      position: relative;
      z-index: 1;
      padding: 0;
      border: 1px solid black;
      height: 10%;
      width: 100%;
      background-image: var(--background-image);
      box-shadow: 1px 1px 1px black;
      &:hover {
        border-color: red;
      }
    }
    & td {
      border-top-width: 0;
    }
  }
  .item {
    &.expanded td {
      border-bottom-width: 0;
      border-right-width: 0;
    }
  }
  .item_name {
    &:not(:last-child) {
      color: var(--Header_Color_Main);
      font-weight: bold;
    }
    // &:hover {
    //   text-decoration: underline;
    //   color: red;
    // }
  }
  .item_content {
    margin-top: 1%;
    padding: 0.25rem;
    text-align: left;
  }
  td.description {
    position: relative;
    height: 90%;
  }
  .titleSeparator {
    position: absolute;
    width: 100%;
    text-indent: initial;
    display: block;
    column-span: all;
    -webkit-column-span: all;
    height: 90%;
    padding-top: 5px;
    background-color: var(--Header_Color_Main);
    mask-repeat: no-repeat;
    //mask-position: 0px 10px;
    mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 155.97 4.83" ><path d="M71.9 0c-.32 0-.64.06-.94.16-.35.12-.7.34-1.18.6a4.1 4.1 0 0 1-1.04.5H0v.46h70.63l-.06.33c-.04.26.17.48.32.6s.52.3.52.3l-.18-.42c-.2-.5.3-.98.84-.88.54.1.94.15 1.2 1.25.2.77 1.41 1.94 2.65 1.93.69-.01 1.25-.15 1.65-.52l.42-.53.41.53c.4.37.97.5 1.65.52 1.24.01 2.46-1.16 2.65-1.93.26-1.1.67-1.15 1.2-1.25.54-.1 1.05.38.84.88l-.18.42s.37-.18.52-.3c.16-.12.36-.34.32-.6l-.05-.33h70.62v-.46H87.24a4.1 4.1 0 0 1-1.04-.5c-.48-.26-.84-.48-1.18-.6-.6-.2-1.3-.23-1.83 0-.53.22-.78.41-1.11.93l-.4.62-.25-.31c-.14-.17-.5-.38-.68-.43-.45-.11-1.12.17-1.3.49-.16.31-.05.75.27.98-.1-.33.03-.8.75-.6.24.1.31.24.31.58 0 .93-1.23 1.44-1.89.78-.22-.23-.3-.45-.3-.97 0-.57.13-.73.33-.98.13-.17.14-.15.45-.36-.17 0-.78.23-1 .47l-.38.42-.39-.42a2.08 2.08 0 0 0-1-.47c.3.2.32.19.46.36.19.25.31.41.31.98 0 .52-.06.74-.29.97-.66.66-1.89.15-1.89-.78 0-.34.08-.48.32-.58.72-.2.85.27.75.6.3-.23.43-.67.26-.98-.17-.32-.85-.6-1.3-.5-.18.06-.54.27-.67.44l-.25.3-.4-.61c-.34-.52-.59-.7-1.12-.93A2.21 2.21 0 0 0 71.9 0z"/></svg>');
    -webkit-mask-repeat: no-repeat;
    //-webkit-mask-position: 0px 10px; preserveAspectRatio="none"
    -webkit-mask-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 155.97 4.83" ><path d="M71.9 0c-.32 0-.64.06-.94.16-.35.12-.7.34-1.18.6a4.1 4.1 0 0 1-1.04.5H0v.46h70.63l-.06.33c-.04.26.17.48.32.6s.52.3.52.3l-.18-.42c-.2-.5.3-.98.84-.88.54.1.94.15 1.2 1.25.2.77 1.41 1.94 2.65 1.93.69-.01 1.25-.15 1.65-.52l.42-.53.41.53c.4.37.97.5 1.65.52 1.24.01 2.46-1.16 2.65-1.93.26-1.1.67-1.15 1.2-1.25.54-.1 1.05.38.84.88l-.18.42s.37-.18.52-.3c.16-.12.36-.34.32-.6l-.05-.33h70.62v-.46H87.24a4.1 4.1 0 0 1-1.04-.5c-.48-.26-.84-.48-1.18-.6-.6-.2-1.3-.23-1.83 0-.53.22-.78.41-1.11.93l-.4.62-.25-.31c-.14-.17-.5-.38-.68-.43-.45-.11-1.12.17-1.3.49-.16.31-.05.75.27.98-.1-.33.03-.8.75-.6.24.1.31.24.31.58 0 .93-1.23 1.44-1.89.78-.22-.23-.3-.45-.3-.97 0-.57.13-.73.33-.98.13-.17.14-.15.45-.36-.17 0-.78.23-1 .47l-.38.42-.39-.42a2.08 2.08 0 0 0-1-.47c.3.2.32.19.46.36.19.25.31.41.31.98 0 .52-.06.74-.29.97-.66.66-1.89.15-1.89-.78 0-.34.08-.48.32-.58.72-.2.85.27.75.6.3-.23.43-.67.26-.98-.17-.32-.85-.6-1.3-.5-.18.06-.54.27-.67.44l-.25.3-.4-.61c-.34-.52-.59-.7-1.12-.93A2.21 2.21 0 0 0 71.9 0z"/></svg>');
  }
  .tradition {
    text-align: left;
    border-bottom: 1px dotted black;
    padding: 1px;
  }
  div:has(> .trait) {
    text-align: left;
  }
  .trait {
    display: flex;
    flex-wrap: wrap;
  }
  .trait_item {
    font-family: "Roboto Condensed", sans-serif;
    border-color: #dac68a;
    border: 1px solid #dac68a;
    border-left: 2px solid #dac68a;
    border-right: 2px solid #dac68a;
    border-radius: 2px;
    background-color: #58180d;
    color: white;
    text-align: center;
    margin-top: 2px;
    margin-right: 2px;
    min-width: 30px;
    float: left;
    padding-left: 3px;
    padding-right: 3px;
    //text-transform: uppercase;
  }
</style>
