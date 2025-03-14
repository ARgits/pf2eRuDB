<script setup lang="ts">
import SubFilterComponent from "@components/filter/SubFilterComponent.vue"
import { useContentStore } from "@/stores/content";
import { storeToRefs } from "pinia";

const { currentFilter, routeName } = storeToRefs(useContentStore())

</script>
<template>
  <div class="container">
    <div
      v-for="subFilt in currentFilter"
      :key="subFilt.filter_name + routeName"
    >
      <SubFilterComponent :sub-filter="subFilt" />
    </div>
  </div>
</template>
<style scoped lang="scss">

div.filter_main {
  // flex-basis: 30%;
  // max-width: 30%;
  display: flex;
  gap: var(--gap);
  flex-direction: column;
  flex-shrink: 0;

}

.container {
  flex: 1 1 auto;
  height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scrollbar-gutter: stable;
  gap:var(--gap);
}
</style>