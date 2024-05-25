<script setup lang="ts">
import { useContentStore } from '@/stores/content';
import type { DataRoutes } from '@/types';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const props = defineProps<{ name: string, label: string }>()
const dataType = computed(() => props.name.replace('favorite', '').toLocaleLowerCase() as DataRoutes | 's')
console.log(dataType.value)
const contentStore = useContentStore()
const { maxLengthContent } = contentStore
const { contentData } = storeToRefs(contentStore)
const length = computed(() => dataType.value !== 's' ? (contentData.value[dataType.value].length / maxLengthContent[dataType.value] * 100).toFixed(0) + "%" : '100%')
</script>
<template>
    <RouterLink :to="{ name: props.name }">{{ props.label }} {{ length !== "100%" ? ` (${length})` : '' }}</RouterLink>
</template>
<style lang="scss" scoped>
a {
    --fetchedColor: rgba(128, 128, 128, .55);
    background: linear-gradient(90deg, var(--fetchedColor) 0 v-bind(length), rgba(128, 128, 128, .85) v-bind(length) 100%);

    &.router-link-active {
        --fetchedColor: rgba(128, 128, 128, .15)
    }
}
</style>