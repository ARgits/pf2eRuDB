<script setup lang="ts">
import { useContentStore } from "@stores/content";
import { usePaginationStore } from "@stores/pagination";
import { storeToRefs } from "pinia";
import ItemsCounterComponent from "@components/utility/ItemsCounterComponent.vue";
import ContentViewSettings from "./ContentViewSettings.vue"

import CustomInputComponent from "./CustomInputComponent.vue";
const { searchItem, duplicateVersion, isDataFetched} = storeToRefs(useContentStore())
const { itemsPerPage } = storeToRefs(usePaginationStore())
function changeSearchItem(e: Event) {
  const eventTarget = e.target as EventTarget & { value?: string }
  if (eventTarget.value === undefined) return
  searchItem.value = eventTarget.value
}
</script>
<template>
  <div
    v-if="isDataFetched"
    class="search"
  >
    <CustomInputComponent
      type="text"
      :on-change-func="changeSearchItem"
      :data-value="searchItem"
      label-text="Поиск по названию (Ru/En)"
    />
    <label>
      Версия дубликатов:
      <select
        v-model="duplicateVersion"
        class="select"
      >
        <option value="remaster">Ремастер</option>
        <option value="legacy">Легаси</option>
        <option value="both">Обе</option>
      </select>
    </label>
    <label>Показывать по:
      <select
        v-model="itemsPerPage"
        class="select"
      >
        <option value="10">
          10
        </option>
        <option value="25">
          25
        </option>
        <option value="50">
          50
        </option>
        <option value="100">
          100
        </option>
      </select>
    </label>

    <ItemsCounterComponent />
    <ContentViewSettings />
  </div>
</template>
<style lang="scss" scoped>
.search {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
    padding: var(--main-padding);
    border: var(--basic-border);
    border-radius: var(--border-radius);
    justify-content: center;
    align-items: center;
}

// @media (max-aspect-ratio:1/1) {
//     .search {
//         margin: 0 .5rem 0 3rem;
//     }
// }</style>