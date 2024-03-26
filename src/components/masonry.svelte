<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import { fade, fly, slide } from "svelte/transition";

  export let data: any[];
  export let columnWidth = 300;
  export let gap = 10;
  export let isSortedByHeight: boolean = true;
  let columns: { key: number; dataArr: typeof data }[] = [];
  let colDiv: HTMLDivElement[] = [];
  // let node: HTMLDivElement;
  let lastWinWidth = window.innerHeight;
  function masonry(node: HTMLDivElement, dataParam: typeof data) {
    async function renderMasonry(ev: UIEvent) {
      if (!node) return;
      console.log("begin masonry");
      const numOfColumns = Math.floor(node.clientWidth / (columnWidth + gap));
      if (
        columns.length === numOfColumns &&
        Math.abs(lastWinWidth - window.innerHeight) < columnWidth + gap &&
        Math.abs(lastWinWidth - window.innerHeight) !== 0
      )
        return;
      console.log("need to rerender");
      lastWinWidth = window.innerHeight;
      columns = [];
      for (const num of Array(numOfColumns).keys()) {
        columns = [...columns, { key: num, dataArr: [] }];
      }

      if (isSortedByHeight) {
        await tick();
        const colDivWithoutNull = colDiv.filter((col) => col);
        for (const item of [...data].sort((a, b) => b.desc.length - a.desc.length)) {
          const minHeightDivInd = Math.max(
            colDivWithoutNull.findIndex(
              (elem) => elem && elem.clientHeight === Math.min(...colDivWithoutNull.map((el) => el?.clientHeight ?? 0)),
            ),
            0,
          );

          columns[minHeightDivInd].dataArr = [...columns[minHeightDivInd].dataArr, item];
          await tick();
        }
      } else {
        let colInd = 0;
        for (const item of data) {
          columns[colInd].dataArr = [...columns[colInd].dataArr, item];
          colInd = colInd === columns.length - 1 ? 0 : colInd + 1;
        }
      }
    }
    console.log("onMount");
    window.addEventListener("resize", renderMasonry);
    renderMasonry(null);
    return {
      update(dataParam) {
        console.log("update");
        renderMasonry(null);
      },
      destroy() {
        console.log("onDestroy");
        window.removeEventListener("resize", renderMasonry);
      },
    };
  }
</script>

<div class="container masonry" use:masonry={data}>
  <!-- <div class="container masonry" bind:this={masonryNode}> -->
  {#each columns as col, colInd (col.key)}
    <div class="slot-column" bind:this={colDiv[col.key]}>
      {#each col.dataArr as item, ind (item.id)}
        <div class="slot" in:fade={{ duration: 50, delay: ind * 25 + colInd * 25 }}>
          <slot name="item" {item} />
        </div>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  .container {
    overflow-y: auto;
    height: 80dvh;
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  .slot-column {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: fit-content;
  }
  .slot {
    height: fit-content;
    width: 300px;
    border: 1px solid black;
    font-size: medium;
  }
</style>
