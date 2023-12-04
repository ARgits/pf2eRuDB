<script lang="ts">
  import arrowRight from "@fortawesome/fontawesome-free/svgs/solid/arrow-right-long.svg";
  import arrowLeft from "@fortawesome/fontawesome-free/svgs/solid/arrow-left-long.svg";
  import { slide } from "svelte/transition";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  export let numOfPage = 1;
  export let itemsPerPage: number;
  const numOfElems: Writable<number> = getContext("numOfElems");
  let arr: (number | "...")[] = [];
  getMaxPages(numOfPage);
  $: maxPages = Array(Math.ceil($numOfElems / itemsPerPage))
    .fill(null)
    .map((_, ind) => ind + 1);
  function getMaxPages(pageNum: number) {
    arr = [];
    let tempMaxPages = Array(Math.ceil($numOfElems / itemsPerPage))
      .fill(null)
      .map((_, ind) => ind + 1);
    const acceptablePages = [
      tempMaxPages.at(-1),
      tempMaxPages.at(-2),
      tempMaxPages[0],
      tempMaxPages[1],
      pageNum,
      pageNum - 1,
      pageNum + 1,
    ];
    const aspRatioBig = window.document.body.clientWidth / window.document.body.clientHeight > 1;
    if (aspRatioBig) {
      acceptablePages.push(pageNum - 2, pageNum + 2);
    }
    tempMaxPages = tempMaxPages.filter(
      (page) =>
        acceptablePages.includes(page) ||
        (page === 3 && page === pageNum - 3 && aspRatioBig) ||
        (page == tempMaxPages.at(-3) && page === pageNum + 3 && aspRatioBig)
    );
    tempMaxPages.forEach((page, key) => {
      {
        if (page + 1 !== tempMaxPages[key + 1] && key + 1 !== tempMaxPages.length) arr.push(page, "...");
        else if (page - 1 !== tempMaxPages[key - 1] && key !== 0 && arr.at(-1) !== "...") arr.push("...", page);
        else arr.push(page);
      }
    });
  }
</script>

<div class="pagination_container">
  <div class="pagination_config">
    Кол-во элементов на странице
    <select
      bind:value={itemsPerPage}
      on:change={() => {
        getMaxPages(numOfPage);
      }}
    >
      {#each [10, 20, 50, 100] as num}
        <option>{num}</option>
      {/each}
    </select>
  </div>
  {#if arr.length > 1}
    <div class="pagination_main" transition:slide={{ duration: 250, axis: "y" }}>
      <button
        disabled={numOfPage === 1}
        class="pagination_arrow"
        on:click={() => {
          numOfPage -= 1;
          getMaxPages(numOfPage);
        }}
      >
        <img src={arrowLeft} alt="предыдушая страница" />
      </button>
      {#each arr as page}
        <div
          class="pagination_item{page === numOfPage ? ' current' : ''}{page === '...' ? ' nothing' : ''}"
          on:click={() => {
            if (page !== "...") {
              numOfPage = page;
              getMaxPages(numOfPage);
            }
          }}
        >
          {page}
        </div>
      {/each}
      <button
        disabled={numOfPage === maxPages.length}
        class="pagination_arrow"
        on:click={() => {
          numOfPage += 1;
          getMaxPages(numOfPage);
        }}
      >
        <img src={arrowRight} alt="следующая страница" />
      </button>
    </div>
  {/if}
</div>

<style lang="scss">
  .pagination {
    &_container {
      padding: 0.25rem 0;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
    &_main {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &_item {
      border: 1px solid black;
      cursor: pointer;
      text-align: center;
      font-size: 0.8rem;
      border-radius: var(--border-radius);
      width: 1.5rem;
      height: 1.5rem;
      padding: 2px 1px 0px;
      user-select: none;
      &.current {
        background-color: rgba(250, 250, 250, 0.7);
      }
      &.nothing {
        border: none;
        cursor: default;
      }
    }
  }
  button {
    padding: 0.1rem 0.25rem;
  }
  img {
    width: 1.5rem;
  }
</style>
