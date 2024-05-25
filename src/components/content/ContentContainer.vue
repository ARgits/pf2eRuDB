<script setup lang="ts">
import {usePaginationStore} from '@/stores/pagination';
import ContentItem from './ContentItem.vue';
import {storeToRefs} from 'pinia';
import {computed, onMounted, onUnmounted, ref, type Ref, watch} from 'vue';
import {useContentStore} from '@/stores/content';
import type {generalContent} from '@/types';

const {filteredData} = storeToRefs(useContentStore())
const paginationStore = usePaginationStore()
const {itemsPerPage} = storeToRefs(paginationStore)
const dataSliceStart = computed(() => itemsPerPage.value * paginationStore.currentPage)
const dataSliceEnd = computed(() => itemsPerPage.value * (paginationStore.currentPage + 1))
const data = computed(() =>
    filteredData.value.slice(dataSliceStart.value, dataSliceEnd.value)
)
const numOfColumns = ref(1)
const columns: Ref<generalContent[][]> = ref([])
onMounted(() => {
  onResize()
  window.addEventListener("resize", onResize)

})
onUnmounted(() => {
  window.removeEventListener("resize", onResize)
})

function onResize() {
  console.log('resize')
  const contentMain = document.querySelector('.content_main')!
  const numOfColumns = Math.floor(contentMain?.clientWidth / 300)
  console.log(numOfColumns)
  columns.value = []
  for (const num in [...Array(numOfColumns).keys()]) {
    columns.value.push([])
  }
  for (const [num, content] of Object.entries(data.value)) {
    columns.value[parseInt(num) % numOfColumns].push(content)

  }
}

watch(data, onResize)
</script>
<template>
  <div class="main" v-if="data.length">
    <ContentItem v-for="content in data" :key="content.id" :content="content"></ContentItem>
  </div>
  <div class="main" v-else>
    <span>Пусто :(
    </span>
    
  </div>
</template>
<style scoped lang="scss">
.main {
  // display: flex;
  display: grid;
  grid-template-columns: repeat(var(--numOfColumns, 1), 1fr);
  grid-template-rows: auto;
  gap: 10px;
  flex: 1 0 auto;
  overflow-y: auto;
  height: 0;
}

.column {
  // display: flex;
  // flex-direction: column;
  gap: 10px;
  flex: 1;
}
</style>