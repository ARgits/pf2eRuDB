<script lang="ts">
  export let icon: string;
</script>

<!-- <img height="15px" src={icon.src} class={icon.class} alt="something" /> -->
{#if icon.includes("check")}
  <i class="fa-solid fa-square-check"></i>
{:else if icon.includes("xmark")}
  <i class="fa-solid fa-square-xmark"></i>
{:else}
  <i class="fa-regular fa-square"></i>
{/if}

<style lang="scss">
  // .fa-square {
  //   &-check {
  //     color: green;
  //   }

  //   &-xmark {
  //     color: red;
  //   }
  // }
</style>
