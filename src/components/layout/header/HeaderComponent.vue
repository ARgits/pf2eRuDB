<script setup lang="ts">

//vue
import { useRouter } from "vue-router"

//font-awesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import {faGithub} from "@fortawesome/free-brands-svg-icons"

//customComponents
import DesktopHeader from "@components/layout/header/DesktopHeader.vue"
import MobileHeader from "@components/layout/header/MobileHeader.vue"
import CustomLinkComponent from "@components/utility/CustomLinkComponent.vue"
import ThemeColorSwitch from "@components/utility/ThemeColorSwitch.vue"




import { isMobile } from "@/utils";

function openNavigation(){}
</script>
<template>
  <!-- <MobileHeader v-if="isMobile" />
  <DesktopHeader v-else /> -->
  <header class="header">
    <a class="logo">
      <img
        src="/icon.webp?url"
        alt=""
      >
    </a>
    
    <button
      v-if="isMobile"
      class="button navigation"
      @click="openNavigation"
    >
      <FontAwesomeIcon :icon="faBars" />
    </button>
    <div
      v-else
      ref="navRef"
      class="navigation"
    >
      <CustomLinkComponent
        v-for="route in useRouter().options.routes.filter(r=>r.meta?.level===1)"
        :key="route.name"
        :route="route"
      />
      <ThemeColorSwitch />
      <a        
        class="link-icon"
        href="https://github.com/ARgits/pf2eRuDB"
        target="_blank"
      >
        <FontAwesomeIcon :icon="faGithub" />
      </a>
    </div>
  </header>
</template>
<style scoped lang="scss">
.header{
  display: flex;
  position: relative;
  justify-content: space-between;
  gap:var(--gap);
  flex:.1 0 5%;
  align-items: center;
}
.navigation{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow:hidden;
  gap:var(--gap);
  >*{
    flex:0 0 auto;
    // height:calc(100% - var(--gap)*2)
  }
}
.global-search{
  border: 0;
  height:2rem;
  aspect-ratio: 1/1;
  margin-inline:0 auto;
}
@media (max-width){
  
}
</style>