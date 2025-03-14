<script setup lang="ts">
import { computed } from "vue";
import TableComponent from "@/components/utility/TableComponent.vue";
import { useContentStore } from "@/stores/content";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const contentStore = useContentStore()
const isFetched = computed(() => contentStore.isDataFetched)

</script>
<template>
  <template v-if="isFetched">
    <TableComponent />
  </template>
  <template v-else>
    <div class="loading">
      <FontAwesomeIcon
        :icon="faSpinner"
        spin
        size="5x"
      />
    </div>
  </template>
</template>
