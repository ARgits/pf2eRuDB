<script setup lang="ts">
import ContentItem from "./ContentItem.vue";
import ContentContainerTableView from "./ContentContainerTableView.vue"
import { storeToRefs } from "pinia";
import { useContentStore } from "@/stores/content";
import { useViewStore } from "@/stores/viewStore";
import ContainerFadeSlideTransition from "@components/transitions/ContainerFadeSlideTransition.vue"
import {devLog} from "@/utils"
import {watch} from "vue"
const { numOfItems, currentContent } = storeToRefs(useContentStore())
const { viewType } = storeToRefs(useViewStore())
watch(currentContent,()=>{ devLog("ContentContainer: currentContent",currentContent.value, viewType.value) })
</script>
<template>
  <div v-if="numOfItems>0">
    <template v-if="viewType === 'list'">
      <ContainerFadeSlideTransition>
        <ContentItem
          v-for="content in currentContent"
          :key="content.id"
          :content="content"
        />
      </ContainerFadeSlideTransition>
    </template>
    <template v-else-if="viewType === 'table'">
      <ContentContainerTableView />
    </template>
  </div>
  <div
    v-else
    class="empty"
  >
    <span>Пусто :(
    </span>
  </div>
</template>
<style scoped lang="scss">
.empty {
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 200%;
}

.content_group {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap:var(--gap);
  flex: 1 0 auto;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 0;
}
</style>