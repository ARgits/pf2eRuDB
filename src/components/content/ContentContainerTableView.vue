<script setup lang="ts">
import { capitalize, computed} from "vue";
import { storeToRefs } from "pinia";
import { useContentStore } from "@/stores/content";
import { useViewStore } from "@/stores/viewStore";
import ContentItemTableView from "./ContentItemTablewView.vue"

const viewStore = useViewStore()
const { currentContent } = storeToRefs(useContentStore())
const { currentColumns} = storeToRefs(viewStore)
const shownColumns = computed(()=>currentColumns.value.filter((v)=>v.isShown))

</script>
<template>
  <table class="table">
    <th
      v-for="column in shownColumns"
      :key="column.key"
      class="th"
    >
      <span>{{ capitalize(column.name) }}</span>
    </th>


    <tr
      v-for="(content,index) in currentContent"
      :key="content.id"
      class="tr"
    >
      <ContentItemTableView
        :content="content"
        :index="index"
      />
    </tr>
  </table>
</template>
<style lang="scss" scoped>
.table{
  display: block;
  overflow: auto;
  border-collapse: collapse;
  .th{
    top:-1px;
    position:sticky;
    border:1px solid rgb(var(--border-color));
    text-align: center;
    vertical-align: middle;
    padding: var(--main-padding-half);
    background-color: rgb(var(--background-secondary));
  }
  .tr{
    :deep(.td){
    background-color: rgb(var(--background-primary-transparent));
  }
    &:nth-child(even) :deep(.td){
      background-color: rgb(var(--background-secondary-transparent));
    }
  }
}
</style>