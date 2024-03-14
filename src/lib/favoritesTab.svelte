<script lang="ts">
  import { derived } from "svelte/store";
  import { dataStore, favoritesStore } from "../store.js";
  import { fade } from "svelte/transition";
  const favoriteSpells = derived([dataStore, favoritesStore], ([data, favorites]) => {
    return data.spells.filter((v) => favorites.includes(v.id));
  });
  const favoriteBackgrounds = derived([dataStore, favoritesStore], ([data, favorites]) => {
    return data.backgrounds.filter((v) => favorites.includes(v.id));
  });
  const favoriteFeats = derived([dataStore, favoritesStore], ([data, favorites]) => {
    return data.feats.filter((v) => favorites.includes(v.id));
  });
  const favoriteActions = derived([dataStore, favoritesStore], ([data, favorites]) => {
    return data.actions.filter((v) => favorites.includes(v.id));
  });
  const favorites = {
    spells:{name:'Заклинания',data:$favoriteSpells},
    feats:{name:'Способности',data:$favoriteFeats},
    backgrounds:{name:'Происхождения',data:$favoriteBackgrounds},
    actions:{name:'Действия',data:$favoriteActions}
  }
</script>
<main>
{#each Object.values(favorites) as dataContainer}
{#if dataContainer.data.length}
  <h2>{dataContainer.name}</h2>
<div class="favorites">
  {#each dataContainer.data as item (item.id)}
    <div class="favorite_item" transition:fade={{ duration: 250 }}>
      <div class="content">
        <div>
          {item.name}
        </div>
        <div>
          {@html item.desc}
        </div>
      </div>

      <button class="icon favorite" on:click|stopPropagation={() => favoritesStore.setFavorite(item.id)}>
        {#if $favoritesStore.includes(item.id)}
          <i class="fa-solid fa-bookmark"></i>
        {:else}
          <i class="fa-regular fa-bookmark"></i>
        {/if}
      </button>
    </div>
  {/each}
</div>
  {/if}
  {/each}
</main>
<style lang="scss">
  main{
    max-height: 100dvh;
    overflow-y: auto;
  }
  .favorites {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    //overflow-y: auto;
    //height: 90%;
    align-content: flex-start;
    .favorite_item {
      display: flex;
      gap: 10px;
      border: 1px solid black;
      justify-content: space-between;
      padding: 5px;
      flex: 1 0 200px;
      .content {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
      }
    }
    button.favorite {
      position: unset;
      align-self: flex-start;
    }
  }
</style>
