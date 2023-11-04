<script lang="ts">
  import type { Background, backgroundFilters } from "../types";

  export let data: Background[] = [];

  const filters: backgroundFilters = {
    rarity: "-",
    attributeValue: "-",
    src: "",
  };
  function filt() {
    tempBG = data
      .filter((bg) => {
        const filtAR = Object.entries(filters);
        let criteria = 0;
        for (const [key, val] of filtAR) {
          criteria += bg[key as keyof backgroundFilters].includes(val) || val === "-" ? 1 : 0;
        }
        console.log(bg, criteria);
        return criteria === filtAR.length;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }
  let tempBG = [...data];
</script>

<main>
  {#each data as el}
    {@html el}
  {/each}
</main>

<style>
  .table {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
  }
  .table > * {
    align-items: center;
    flex-basis: 15%;
    padding: 5px;
    border-bottom: 1px rgba(0, 0, 0, 0.5) solid;
  }
  .desc {
    flex-basis: 50%;
    text-align: left;
  }
  .header {
    text-align: center;
    font-size: larger;
    border-bottom: 1px black solid;
    position: sticky;
    top: 20px;
    background-color: white;
  }
</style>
