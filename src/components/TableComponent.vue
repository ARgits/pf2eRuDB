<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useContentStore } from "@stores/content"
import PaginationComponent from "@components/PaginationComponent.vue";
import SearchComponent from '@components/SearchComponent.vue';
import ContentContainer from '@components/content/ContentContainer.vue';
import { isVertical } from '@/mediaGetters';
const contentStore = useContentStore()
const { filteredData } = storeToRefs(contentStore)
</script>
<template>
  <div class="content_main" v-if="filteredData.length">
    <SearchComponent v-if="!isVertical"></SearchComponent>
    <ContentContainer class="content_group"></ContentContainer>
    <PaginationComponent></PaginationComponent>
  </div>
  <div v-else class="loading">
    <span>Пусто :(
    </span>
  </div>

</template>
<style scoped lang="scss">
.content_main {
  display: flex;
  flex-direction: column;
  flex-basis: 70%;
  gap: 10px;
}


.loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  position: relative;
}



.loading {
  align-self: center;
}

@media (max-aspect-ratio: 1/1) {

  div.content_main {
    flex-basis: 100%;
    //position: absolute;
    width: calc(100% - 0rem);
    height: 100%;
    transition: opacity .5s ease;

    &.hidden {
      flex-basis: 0;
      // display: none;
      z-index: -1;
      opacity: 0;
    }
  }

  // div.content_group {
  //   margin: 0 .5rem
  // }
}
</style>