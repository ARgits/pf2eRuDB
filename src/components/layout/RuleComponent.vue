<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {pg as dbObject} from "@/main.ts"
type rule = { original_name:string, aon_id:string, name:string, children:rule[], level:number }
const {original_name, aon_id, name, children,level} = defineProps<rule>()
const route = useRoute()
const router = useRouter()
const canManualClose = ref(true)
const isOpened = ref(false)
function openArticle(){
  router.push({name:"currentRule",params:{id:aon_id}})
  if(!children.length||!canManualClose.value) return
  isOpened.value=!isOpened.value
}
watch(()=>route.params.id,async()=>{
  await dbObject.waitReady
  const queryRes = (await dbObject.query<{ breadcrumbs:string[] }>(`select breadcrumbs from rules where aon_id='${route.params.id}'`)).rows[0]
  console.log(queryRes)
  if(queryRes&&queryRes.breadcrumbs.includes(original_name)){
    isOpened.value=true
    canManualClose.value=false
  }
},{immediate:true})
</script>
<template>
  <li>
    <label
      :class="{active:aon_id===route.params.id}"
      :data-level="level"
      @click="openArticle"
    >{{ name.length?name:original_name }}</label>
    <ul v-if="children.length&&isOpened">
      <li
        v-for="child of children"
        :key="child.aon_id"
      >
        <RuleComponent v-bind="{...child,level:level+1}" />
      </li>
    </ul>
  </li>
</template>
<style lang="scss">
.active{
    font-weight: bolder;
}
</style>