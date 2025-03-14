<script setup lang="ts">
import { ref, type Ref } from "vue";

type definePropsType = {
  labelText: string,
  min?: number,
  max?: number,
  onChangeFunc:(e:Event)=>void,
  type:"number"|"text",
  dataValue:string|number
}

type selectionType = 
  {
    has:true,
    start:number,
    end:number 
  } |
  {
    has:false,
    start:null,
    end:null 
  }

const {
  labelText,
  min,
  max,
  onChangeFunc,
  type,
  dataValue 
} = defineProps<definePropsType>()

const selection:Ref<selectionType > = ref({
  has:false,
  start:null,
  end:null 
})
function validateNumber(e:KeyboardEvent){
  const eventTarget = e.target as EventTarget&{ value?:string }
  if(!eventTarget.value) return
  if(type==="number"){
    if(e.key.match(/[^0-9-]/gm)) {
      if(!["Arrow","Home","End","Backspace"].some(s=>e.key.includes((s)))){
        e.preventDefault()
        e.stopImmediatePropagation()
        return
      }
    }
    const {value} = eventTarget
    const valueWithSelection = selection.value.has?
      value.slice(0,selection.value.start)+value.slice(selection.value.start,selection.value.end).replace(/.*/,e.key)+value.slice(selection.value.end):
      value+e.key
    if(parseInt(valueWithSelection)<min!||parseInt(valueWithSelection)>max!){
      e.preventDefault()
      e.stopImmediatePropagation()
      return 
    }
  }
  selection.value.has = false
}
function getSelect(e:Event){
  const eventTarget = e.target as EventTarget&{
    selectionStart:number|null,
    selectionEnd:number|null 
  }
  if(!eventTarget) return
  selection.value.has = true
  selection.value.start = eventTarget.selectionStart
  selection.value.end = eventTarget.selectionEnd
}
</script>
<template>
  <label
    class="label"
    :class="{number:type==='number'}"
  >
    <span :class="{ text: !(min || max) }">{{ labelText }}</span>
    <input
      :value="dataValue"
      class="input"
      :class="{ notEmpty: type==='text'&&typeof dataValue==='string'&&dataValue.length, text:type==='text' }"
      @select="getSelect"
      @keydown="validateNumber"
      @input="onChangeFunc"
    >
               
  </label>
</template>
<style scoped lang="scss">
.label {
    padding: 0 var(--main-padding-half);
    border: 1px solid rgba(var(--border-color));
    border-radius: var(--border-radius);
    font-family: "Times New Roman", serif;
    position: relative;
    height: 2rem;

    &:not(:first-child) {
        margin-left: 10px;
    }

    &:focus-within {
        border-color: darkorange;
    }
    &.number{
        display: flex;
        align-items: center;
        justify-content: center
    }
    & span{
        flex-basis: 100%;
        &.text {
        position: absolute;
        font-size: 90%;
        transition: transform .5s ease, color .5s ease;
        // margin-top: .25rem;
        transform-origin: left;
        color:rgb(var(--text-primary));
        &:has(+input:focus, +input:focus-visible, +input.notEmpty) {
            margin-top: 0;
            transform: scale(.6);
            color:rgb(var(--text-secondary))
        }
    }
    }

    & .input {
        background-color: unset;
        border: none;
        width: fit-content;
        height: inherit;
        &:not(.text){
            width: 3rem;
            text-align: center;
        }
        &.notEmpty {
            margin-top: .25rem;
        }

        &:focus,
        &:focus-visible {

            border: none;
            outline: none;

            &.text {
                margin-top: .25rem;
            }
        }
    }
}
</style>