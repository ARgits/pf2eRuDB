<script setup lang="ts">
import { storeToRefs } from "pinia";
import CustomLinkComponent from "../utility/CustomLinkComponent.vue";
import { useContentStore } from "@/stores/content";
import { useRoute, type RouteRecordRaw } from "vue-router";
import { computed } from "vue";
import type { Routes } from "@/types";
const {isDataFetched} = storeToRefs(useContentStore())
const route = useRoute()
const routeChildren = computed(()=>route.matched[0].children as (RouteRecordRaw&{ name:Routes })[])
</script>
<template>
  <div class="sidebar">
    <div
      v-if="routeChildren.length&&isDataFetched"
      class="sub-nav"
    >
      <template
        v-for="child of routeChildren"
        :key="child.name"
      >
        <!-- <CustomLinkComponent
          v-if="filteredData![child.name.toLowerCase()]?.numOfItems>0||route.name===child.name"
          :route="child"
        /> -->
        <CustomLinkComponent :route="child" />
      </template>
    </div>
  </div>
</template>
<style  scoped>
.sidebar{
  flex: .3 0 min(15%,calc(400px - var(--gap)));
  overflow-y: scroll;
}
.sub-nav{
  display: flex;
  flex-direction: column;
  gap:var(--gap);
  /* flex-wrap: wrap; */
}
</style>
