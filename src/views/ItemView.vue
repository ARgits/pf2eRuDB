<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import ContentItem from '@/components/content/ContentItem.vue';
import { storeToRefs } from 'pinia';
import { useContentStore } from '@/stores/content';
import type { generalContent } from '@/types';

const route = useRoute()
const id = computed(() => route.params.id as generalContent['id'])
watch(route, () => console.log('content id ', route.params.id))
const { globalIndex, isDataFetched } = storeToRefs(useContentStore())
const content = computed(() => {
    if (!isDataFetched.value) return null
    return globalIndex.value[id.value]
})
</script>
<template>
    <ContentItem v-if="content" :content :isDescOpened="true"></ContentItem>
</template>
<style scoped lang="scss"></style>