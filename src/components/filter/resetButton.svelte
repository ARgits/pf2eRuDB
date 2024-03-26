<script lang="ts">
  import { filters } from "@stores/filterStore";
  import type { filterUnion } from "../../types";
  import { currentTab } from "@stores/store";

  export let key: keyof filterUnion | undefined;
  function clearFilter() {
    if (key) {
      $filters[$currentTab][key].value = [...$filters[$currentTab][key].defaultValue];
      $filters[$currentTab][key].disabled = [];
    } else {
      for (const filtKey of Object.keys($filters[$currentTab])) {
        $filters[$currentTab][filtKey].value = [...$filters[$currentTab][filtKey].defaultValue];
        $filters[$currentTab][filtKey].disabled = [];
      }
    }
  }
</script>

<button class="reset" on:click|stopPropagation={clearFilter}><i class="fa-solid fa-ban"></i></button>

<style lang="scss">
  button {
    height: 100%;
    padding: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1/1;
    // margin-left: auto;
  }
</style>
