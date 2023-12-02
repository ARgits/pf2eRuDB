<script lang="ts">
  import type { Spell } from "../../types";
  import { fade, slide } from "svelte/transition";

  export let spell: Spell;
  export let collapsibleContent: Map<string, boolean>;
  function collapse() {
    collapsibleContent.set(spell.fullName, !collapsibleContent.get(spell.fullName));
    collapsibleContent = collapsibleContent;
  }
</script>

<tr
  transition:fade|global={{ duration: 200 }}
  class="item {collapsibleContent.get(spell.fullName) ? 'expanded' : ''}"
  on:click={collapse}
>
  <td class="item_name">
    <div>{spell.name}</div>
    <div>{spell.originalName}</div>
    <div>{spell.type} {spell.level}</div>
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
{#if collapsibleContent.get(spell.fullName)}
  <tr class="description{collapsibleContent.get(spell.fullName) ? ' extended' : ''}">
    <td class="description" colspan="2">
      <div class="item_content" transition:slide={{ duration: 500 }}>{@html spell.desc}</div>
      <button class="collapsible_button" on:click={collapse} transition:fade={{ duration: 400 }}>
        Скрыть описание
      </button>
    </td>
  </tr>
{/if}

<style lang="scss">
  .tradition {
    text-align: left;
    border-bottom: 1px dotted black;
    padding: 1px;
  }
</style>
