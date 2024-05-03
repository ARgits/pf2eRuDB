<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia'
import { useContentStore } from "@stores/content"
import { usePaginationStore } from '@stores/pagination';
import PaginationComponent from "@components/PaginationComponent.vue";
import MansonryGrid from "@components/MansonryGrid.vue"
import ContentItem from './content/ContentItem.vue';
const contentStore = useContentStore()
const { isDataFetched, filteredData, searchItem, sortBy } = storeToRefs(contentStore)
const { fetchData } = contentStore
const paginationStore = usePaginationStore()
const { itemsPerPage } = storeToRefs(paginationStore)
const dataSliceStart = computed(() => itemsPerPage.value * paginationStore.currentPage)
const dataSliceEnd = computed(() => itemsPerPage.value * (paginationStore.currentPage + 1))
const data = computed(() => {
    if (isDataFetched.value) {
        return filteredData.value.slice(dataSliceStart.value, dataSliceEnd.value)
    } else {
        return []
    }
})
if (!isDataFetched.value) {
    fetchData().then(() => { console.log('data is fetched') })
}

</script>
<template>
    <div class="content_main" v-if="data.length">
        <div class="content_search"  style="margin-bottom: 10px;">
            <div>
                <input v-model="searchItem" placeholder="Поиск по названию (Ru/En)">
            </div>
            <div>
                <span>Сортировка: </span>
                <select v-model="sortBy">
                    <option value="0">-</option>
                    <option v-if="'level' in data[0]" value="1">Уровень по возрастанию</option>
                    <option v-if="'level' in data[0]" value="2">Уровень по убыванию</option>
                    <option value="3">Название А-Я</option>
                    <option value="4">Название Я-А</option>
                    <option value="5">Оригинальное название A-Z</option>
                    <option value="6">Оригинальное название Z-A</option>
                </select>
            </div>
            <div>
                <span>Показывать по: </span>
                <select v-model="itemsPerPage">
                    <option value=10>10</option>
                    <option value=25>25</option>
                    <option value=50>50</option>
                    <option value=100>100</option>
                </select>
            </div>
        </div>

        <MansonryGrid class="content_group">
            <ContentItem v-for="(content) of data" :content="content" :inGrid="true" :key="content.id" />
        </MansonryGrid>
        <PaginationComponent />
    </div>
  <div v-else>Пусто :(</div>
</template>
<style scoped lang="scss">
.content_main {
    display: flex;
    flex-direction: column;
    flex-basis: 70%;
    flex-grow: 1;
}

.container {
    position: relative;
}


div.content {
    &_group {
        display: flex;
        // flex-wrap: wrap;
        flex-direction: column;
        padding: .5rem;
        overflow-y: auto;
        overflow-x: hidden;
        height: 0;
        flex: 1 1 auto;
        align-content: flex-start;
        position: relative;
        border: 1px solid black;
        border-radius: 5px;
    }

    &_search {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding: .5rem;
        border: 1px solid black;
        border-radius: 5px;
    }

}

@media (max-aspect-ratio:1/1) {

    div.content_main {
        flex-basis: 100%;
        position: absolute;
        width: calc(100% - 4rem);
        height: 100%;
        transition: opacity .5s ease;

        &.hidden {
            flex-basis: 0;
            // display: none;
            z-index: -1;
            opacity: 0;
        }
    }
}
</style>