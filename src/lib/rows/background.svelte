<script lang="ts">
  import type { Background } from "../../types";
  import { fade, slide } from "svelte/transition";

  export let content: Background;
  export let collapsibleContent: Map<string, boolean>;
  function collapse() {
    console.log(content);
    collapsibleContent.set(content.fullName, !collapsibleContent.get(content.fullName));
    collapsibleContent = collapsibleContent;
  }
</script>

<tr
  transition:fade|global={{ duration: 200 }}
  class="item {collapsibleContent.get(content.fullName) ? 'expanded' : ''}"
  on:click={collapse}
>
  <td class="item_name">
    <div>{content.name}</div>
    <div>{content.originalName}</div>
  </td>
  <td>
    <div>{content.rarity}</div>
  </td>
  <td>
    {#each content.attributeValue.split("/").join(" или ").split(", ") as attr, key}
      <div>
        {key + 1}. {attr || "Свободное"}
      </div>
    {/each}
  </td>
</tr>
{#if collapsibleContent.get(content.fullName)}
  <tr class="collapsible">
    <td class="description" colspan="3">
      <div class="item_content" transition:slide={{ duration: 500 }}>{@html content.desc}</div>
      <button on:click={collapse} transition:fade={{ duration: 400 }}> Скрыть описание </button>
    </td>
  </tr>
{/if}
