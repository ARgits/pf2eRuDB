<script setup lang="ts">
import { ref,watch } from "vue";
import { useRoute } from "vue-router";
import {pg as dbObject} from "@/main.ts"
import RuleComponent from "./RuleComponent.vue";
import { useViewStore } from "@/stores/viewStore";
import { storeToRefs } from "pinia";

const route = useRoute()
const {ruleStructure} = storeToRefs( useViewStore())
const openedBooks = ref<Record<string,boolean>>({})

// watch(route,fetchRules,{immediate:true})
watch([()=>route.params.id,ruleStructure],async()=>{

  //   console.log(Object.keys(openedBooks.value))
  if(!Object.keys(openedBooks.value).length){
    for(const book of ruleStructure.value){
      openedBooks.value[book.name]=false
    }
  }
  const queryRes = (await dbObject.query<{ source:string }>(`select unnest(source) as source from content where aon_id='${route.params.id}'`)).rows[0]
  if(queryRes)
    openBook(queryRes.source,"open")

}, {immediate:true})

// watch(data,()=>{
//   for(const key in data){
//     openedBooks.value[key]=false
//   }
// })
function openBook(key:string,setState?:"close"|"open"){
  if(openedBooks.value[key]===undefined) return
  openedBooks.value[key] =setState==="close"?false:setState==="open"?true: !openedBooks.value[key]
}
</script>
<template>
  <div class="sidebar">
    <ul class="ul">
      <li
        v-for="book in ruleStructure"
        :key="book.name"
      >
        <label @click="openBook(book.name)">{{ book.name }}</label>
        <ul v-if="book.children.length&&openedBooks[book.name]">
          <RuleComponent
            v-for="article in book.children"
            v-bind="{...article,level:2}"
            :key="article.aon_id"
          />
        </ul>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
.sidebar{
  flex: .3 0 min(15%,fit-content);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}
.ul{
    flex: 1 1 auto;
    overflow-y: scroll;
    height:0;
}
</style>