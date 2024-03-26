<script lang="ts">
  import { getWindowWidth, masonryLayoutForFavorites, windowWidthStore } from "@stores/masonryStore";
  import FavoritesButton from "./favoritesButton.svelte";
</script>

<svelte:window on:resize={() => windowWidthStore.set(getWindowWidth())} />

<div class="favorites">
  {#each $masonryLayoutForFavorites as column}
    <div class={$masonryLayoutForFavorites.length > 1 ? "column" : "row"}>
      {#each column as item (item.id)}
        <div class="favorite_item">
          <div class="content">
            <div class="name">
              <span>{item.name}</span>
              <FavoritesButton itemId={item.id} />
            </div>
            <div class="description">
              {@html item.desc}
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/each}
  <!-- {#each $favoriteItems[$favoriteTabName] as item (item.id)}
      <div class="favorite_item">
        <div class="content">
          <div class="name">
            <span>{item.name}</span>
            <FavoritesButton itemId={item.id} />
          </div>
          <div class="description">
            {@html item.desc}
          </div>
        </div>
      </div>
    {/each} -->
</div>

<style lang="scss">
  .favorites {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-content: flex-start;
    margin-top: 10px;
    overflow-y: auto;
    height: 75dvh;
    .favorite_item {
      display: flex;
      gap: 10px;
      border: 1px solid black;
      justify-content: space-between;
      padding: 5px;
      overflow-x: hidden;
      // aspect-ratio: 2/3;
      width: fit-content;
      height: fit-content;
      max-width: 300px;
      .content {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        width: 100%;
      }
    }
  }
  .name,
  .description {
    width: 100%;
  }
  .name span {
    margin: 0 auto;
  }
  .description {
    overflow-y: auto;
  }
  .row {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .column {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
