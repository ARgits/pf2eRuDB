<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import { fade } from "svelte/transition";
  const numOfElems: Writable<number> = getContext("numOfElems");
  // biome-ignore lint/style/useConst: <explanation>
  export let inFilter: boolean = false;
  function formatResult(val: number) {
    if (!val) return "Ничего не найдено";
    const tempval = val % 100;
    const num = tempval % 10;
    if (tempval > 10 && tempval < 20) return `Найдено ${val} элементов`;
    if (num > 1 && num < 5) return `Найдено ${val} элемента`;
    if (num === 1) return `Найден ${val} элемент`;
    return `Найдено ${val} элементов`;
  }
</script>

<div class:filter={inFilter}>
  {#key $numOfElems}
    <span in:fade={{ duration: 250 }}>{formatResult($numOfElems)}</span>
  {/key}
</div>

<style>
  div {
    position: sticky;
    top: 0;
  }
  .filter {
    background-image: var(--background-image);
  }
</style>
