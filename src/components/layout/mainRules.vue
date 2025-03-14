<script setup lang="ts">
import { pg as dbObject } from "@/main";
import { createDescHTML } from "@/markdown";
import { useContentStore } from "@/stores/content";
import { useViewStore } from "@/stores/viewStore";
import { useElementVisibility, useIntersectionObserver, useParentElement } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, useTemplateRef, watch, watchEffect } from "vue";
const {level=1, id}=defineProps<{ level?:number,id:string }>()
const {isDataFetched} = storeToRefs(useContentStore())
const ruleHeadingElem=useTemplateRef<HTMLHeadingElement>("rule-heading")
const ruleTextElem = useTemplateRef<HTMLDivElement>("rule-text")
const ruleMarkdown = useTemplateRef<HTMLElement>("rule-markdown")

const ruleData = ref()
const ruleMarkdownString = ref("")

onMounted(()=>{
  createDescHTML(ruleData.value?.original_desc||"",ruleMarkdown,ruleMarkdownString,level)
})
watch([ruleData,ruleMarkdown],()=>{
  createDescHTML(ruleData.value?.original_desc||"",ruleMarkdown,ruleMarkdownString,level)
})
const { ruleStructure} = storeToRefs(useViewStore())
const computedChildren = computed(()=>{
  if(ruleData.value&&isDataFetched.value){
    const book = ruleStructure.value.find((v)=>v.name===ruleData.value.source)
    let article=null
    if(ruleData.value.breadcrumbs!=="{}"&&ruleData.value.breadcrumbs.length) {
      for(const child of ruleData.value.breadcrumbs){
        article = article?article.children.find(v=>v.original_name===child):book.children.find(v=>v.original_name===child)
      }
      article = article.children.find(v=>v.aon_id===id) }
    else{
      article = book.children.find(v=>v.original_name===ruleData.value.original_name)
    }
    return article.children
  }
  return []
})
const parentElement = useParentElement(ruleHeadingElem)
const parentHeading= computed(()=>level>2?parentElement.value?.previousElementSibling:null)
const top=computed(()=>ruleHeadingElem.value&&parentHeading.value?parseInt(getComputedStyle(parentHeading.value).top)+parentHeading.value!.offsetHeight+"px":"-1px")
watchEffect(async()=>{
  ruleData.value=(await dbObject.query<{ original_name:string,original_desc:string, breadcrumbs:string[],source:string }>(`select original_name, original_desc, breadcrumbs::text[], source[1] as source from content join rules on rules.id=content.id where aon_id='${id}'`)).rows[0] 
})
const targetIsVisible = useElementVisibility(ruleHeadingElem)
const textIsVisible = useElementVisibility(ruleTextElem)
useIntersectionObserver(ruleHeadingElem,([entry],_)=>{
  entry.target.classList.toggle("isSticky", entry.intersectionRatio<1)
},{threshold:[1],rootMargin:`${top.value==="-1px"?"-1px":-1*parseInt(top.value)+"px"} 0px 0px 0px`,root:parentElement})
useIntersectionObserver(ruleTextElem,([entry],_)=>{
  entry.target.classList.toggle("isStickyText",entry.intersectionRatio<1)
},{threshold:[0],root:parentElement,rootMargin:`${top.value==="-1px"?"-1px":-1*parseInt(top.value)+"px"} 0px 0px 0px`})
</script>
<template>
  <div
    v-if="level===1"
    class="div"
  >
    <template v-if="ruleData">
      <component
        :is="'h'+level"
        class="heading"
      >
        {{ ruleData.original_name }}
      </component>
      <div class="text">
        <div
          ref="rule-markDown"
          v-html="ruleMarkdownString"
        />

        <mainRules
          v-for="child in computedChildren"
          :id="child.aon_id"
          :key="child.aon_id"
          :level="level+1" 
        />
      </div>
    </template>
  </div>
  <template
    v-else
  >
    <template v-if="ruleData">
      <component
        :is="'h'+level"
        ref="rule-heading"
        class="heading"
        :class="{visible:targetIsVisible}"
      >
        {{ ruleData.original_name }}
      </component>
      <div
        ref="rule-text"
        :class="{visible:textIsVisible}"
      >
        <div
          ref="rule-markDown"
          v-html="ruleMarkdownString"
        />

        <mainRules
          v-for="child in computedChildren"
          :id="child.aon_id"
          :key="child.aon_id"
          :level="level+1" 
        />
      </div>
    </template>
  </template>
</template>
<style lang="scss">

.div{
    flex:1 0 70%;
    display: flex;
    flex-direction: column;
    position:relative;
}
.text{
    flex: 1 1 auto;
    height:0;
    overflow:scroll;
    .div{
      position:relative;
    }
}
.heading{
  // width: fit-content;
  // margin-right: auto;
  position:sticky;
    background-color: rgba(var(--background-primary));
    top:v-bind(top);
}
// h2,h3,h4,h5{
//   &:has(+.visible){
//     position:sticky;
//     background-color: rgba(var(--background-primary));
//     top:v-bind(top);
//   }
// }
// h3,h4,h5{&.heading{
//   top:v-bind(top);
// }}
// h3.heading{
//   top:4rem;
// }
// h4.heading{
//   top:8rem;
// }
// h5.heading{
//   top:12rem;
// }
// .isSticky{
//   position:sticky;
//   background-color:rgba(var(--background-primary));
//   top:0;
// }
h2.heading{
  color:red;
  z-index:4
}
h3.heading{
  color:green;
  z-index: 3;
}
h4.heading{
  color:peru;
  z-index: 2;
}
h5.heading{
  color:blue;
  z-index: 1;
}
h2,h3,h4,h5{
  //margin:0;
  //padding-block:var(--main-padding);
  //height:2rem;
}



</style>