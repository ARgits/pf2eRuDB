<script setup lang="ts">
import {useContentStore} from '@stores/content';
import {usePaginationStore} from '@stores/pagination';
import {storeToRefs} from 'pinia';
import ItemsCounterComponent from '@components/ItemsCounterComponent.vue';
import {isVertical} from '@/mediaGetters';
import {ref, watch} from 'vue';

const emit = defineEmits(['changeNumOfColumns'])
const {filteredData, searchItem, sortBy,} = storeToRefs(useContentStore())
const {itemsPerPage} = storeToRefs(usePaginationStore())
const numOfColumns = ref(1)
watch(numOfColumns, () => {
  emit('changeNumOfColumns', numOfColumns.value)
})
</script>
<template>
  <div class="search">
    <div>
      <input v-model="searchItem" placeholder="Поиск по названию (Ru/En)">
    </div>
    <div>
      <select v-model="sortBy">
        <option v-if="'level' in filteredData[0]" value="1">Уровень по возрастанию</option>
        <option v-if="'level' in filteredData[0]" value="2">Уровень по убыванию</option>
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
    <ItemsCounterComponent></ItemsCounterComponent>
    <input v-if="!isVertical" v-model="numOfColumns" type="number" min="1"/>
  </div>
</template>
<style lang="scss" scoped>
.search {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: .5rem;
  border: 1px solid black;
  border-radius: 5px;
  justify-content: center;
}

// @media (max-aspect-ratio:1/1) {
//     .search {
//         margin: 0 .5rem 0 3rem;
//     }
// }</style>