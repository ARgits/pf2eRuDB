<script lang="ts">
  export let icon: string;
</script>

<!-- <img height="15px" src={icon.src} class={icon.class} alt="something" /> -->
{#if icon.includes("square-")}
  <i class="fa-solid {icon}"></i>
{:else}
  <i class="fa-regular {icon}"></i>
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
