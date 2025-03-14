<script setup lang="ts">
import FilterComponent from "@components/filter/FilterComponent.vue";
import SearchComponent from "@components/utility/SearchComponent.vue";
</script>
<template>
  <div class="sidebar">
    <SearchComponent />
    <FilterComponent />
  </div>
</template>
<style scoped lang="scss">
.sidebar{
  flex: .3 0 min(15%,calc(400px - var(--gap)));
  display: flex;
  flex-direction: column;
  gap:var(--gap);
}
</style>