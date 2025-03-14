<script setup lang="ts">
import { devLog } from "@/utils";
import type { DataRoutes } from "@/types";
import { computed } from "vue";
import type { RouteRecordRaw } from "vue-router";

// import { prop } from "node_modules/cheerio/dist/esm/api/attributes";

const props = defineProps<{ route:RouteRecordRaw&{ meta:{ label:string } } }>()
console.log(props)
const routeName = computed(()=>props.route.name as string)
const data_type = computed(() => routeName.value.replace("favorite", "").toLocaleLowerCase() as DataRoutes | "")
devLog(`data_type in custom link component: ${data_type.value}`)
</script>
<template>
  <RouterLink :to="{ name: routeName }">
    {{ route.meta.label }}
  </RouterLink>
</template>
<style lang="scss" scoped>
a {
    background: rgba(var(--background-secondary));
    padding-inline: var(--main-padding);
    border-radius:var(--border-radius);

    &.router-link-active {
        background:rgba(var(--background-secondary-transparent));
    }
}
</style>