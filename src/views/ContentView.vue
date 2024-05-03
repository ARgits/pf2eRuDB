<script setup lang="ts">
import { ref, watch } from 'vue';
import FilterComponent from "@components/filter/FilterComponent.vue"
import TableComponent from "@components/TableComponent.vue"
import { useRoute } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
const hidden = ref(false)
const route = useRoute()
watch(route, () => console.log(route))
</script>
<template>
  <main>
    <FilterComponent :class="{ hidden: !hidden }" />
    <TableComponent :class="{ hidden }" />
    <button @click="() => { hidden = !hidden }" class="filter-visibility">
    <FontAwesomeIcon :icon="faFilter"  size="3x"  />
    </button>
  </main>
</template>

<style scoped lang="scss">
main {
  flex-basis: 90%;
  display: flex;
  padding: 0 2rem;
  gap: 10px;
}

.filter-visibility {
  display: none;
  border: none;
  position: absolute;
  overflow: hidden;
  left: 0;
  top:2rem;
  aspect-ratio: 1/1;
}

@media (max-aspect-ratio:1/1) {
  main {
    position: relative;
  }

  .filter-visibility {
    display: block;
  }
}
</style>
