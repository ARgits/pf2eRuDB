<script lang="ts">
  import type { generalContent } from "../../types";
  import { favoritesStore } from "@stores/favoritesStore";
  import { gsap } from "gsap";
  export let itemId: generalContent["id"];
  //because  svelte transition triggers regardless source of element mount/deletion, we set fade animation via GSAP only when delete content from Favorites list
  async function setFavorite(e: MouseEvent & { currentTarget: HTMLButtonElement }): Promise<void> {
    if (e.currentTarget.closest(".favorite_item")) {
      gsap.effects.fade(e.currentTarget.closest(".favorite_item"), {
        duration: 0.25,
        onComplete: () => favoritesStore.setFavorite(itemId),
      });
    } else {
      favoritesStore.setFavorite(itemId);
    }
    // await tick();
    // f
  }
</script>

<button class="icon favorite" on:click|stopPropagation={setFavorite}>
  {#if $favoritesStore.includes(itemId)}
    <i class="fa-solid fa-bookmark"></i>
  {:else}
    <i class="fa-regular fa-bookmark"></i>
  {/if}
</button>

<style lang="scss">
  :global(div):has(> button) {
    position: relative;
  }
  button {
    position: absolute;
    right: 10px;
    top: 0;
  }
</style>
