<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSun,faMoon } from "@fortawesome/free-regular-svg-icons";

import { storeToRefs } from "pinia";
import { useViewStore } from "@/stores/viewStore";

const {currentTheme} = storeToRefs(useViewStore())
function changeTheme(){
  currentTheme.value=currentTheme.value==="dark"?"light":"dark"
}
</script>
<template>
  <button
    class="switch-appearance switch"
    type="button"
    role="switch"
    @click="changeTheme"
  >
    <span class="switch-check">
      <span class="switch-icon">
        <FontAwesomeIcon :icon="faSun" />
        <FontAwesomeIcon :icon="faMoon" />
      </span>
    </span>
  </button>
</template>
<style>
:root[data-theme="dark"]{
  .switch-check{
    transform:translate(18px);
    .fa-sun{
      opacity:0;
    }
    .fa-moon{
      opacity:1
    }
  }
}
</style>
<style lang="scss" scoped>
.fa-sun{
  opacity:1;
}
.fa-moon{
  opacity:0;
}
  .switch{
    position: relative;
    border-radius: 11px;
    display: block;
    width: 40px;
    height: 22px;
    flex-shrink: 0;
    border: 1px solid rgba(var(--border-color));
    background-color: rgba(var(--background-secondary));
    transition: border-color .25s, background-color .25s;
  }
  .switch-check{
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: rgba(var(--background-primary));
    box-shadow: var(--vt-shadow-1);
    transition: background-color .25s, transform .25s;
  }
  .switch-icon{
    position: relative;
    display: block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    overflow: hidden;
    svg{
      position: absolute;
      top: 0px;
      left: 3px;
      width: 12px;
      height: 12px;
      fill: var(--text-primary);
    }
  }
</style>