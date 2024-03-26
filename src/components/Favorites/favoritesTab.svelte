<script lang="ts">
  import { favoriteItems, favoriteTabName } from "@stores/favoritesStore";
  import Masonry from "../masonry.svelte";
  import FavoritesButton from "./favoritesButton.svelte";
  import { tooltip } from "@components/tooltip/tooltip";
  const favorites = [
    { key: "spells", name: "Заклинания" },
    { key: "feats", name: "Способности" },
    { key: "actions", name: "Действия" },
    { key: "backgrounds", name: "Происхождения" },
  ];
  console.log();
</script>

<div class="content">
  <div class="header">
    {#each favorites as favor}
      {#if $favoriteItems[favor.key].length}
        <button class:active={$favoriteTabName === favor.key} on:click={() => ($favoriteTabName = favor.key)}
          >{favor.name}</button
        >
      {/if}
    {/each}
  </div>
  {#if $favoriteItems[$favoriteTabName]?.length}
    {#key $favoriteTabName}
      <Masonry data={$favoriteItems[$favoriteTabName]}>
        <div slot="item" class="slot" let:item>
          <div><span>{item.name}</span> <FavoritesButton itemId={item.id} /></div>
          <div use:tooltip>{@html item.desc}</div>
        </div>
      </Masonry>
    {/key}
  {/if}
</div>

<style lang="scss">
  .active {
    background-image: linear-gradient(rgba(255, 255, 255, 0.1), transparent);
  }
  button {
    border-color: black;
  }
  .slot div:first-child {
    display: flex;
    & span {
      margin: 0 auto;
    }
  }
</style>
