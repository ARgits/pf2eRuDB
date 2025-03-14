<script setup lang="ts">

//vue
import { RouterView, useRouter } from "vue-router"

//pinia and stores
import { storeToRefs } from "pinia"
import { useModalWindows } from "@stores/modalWindows"
import { useContentStore } from "@stores/content"

//components
import HeaderComponent from "@components/layout/header/HeaderComponent.vue"
import ModalWindow from "@components/utility/ModalWindow.vue"
import VercelSpeedInsights from "@/components/utility/VercelSpeedInsights.vue"
import ReloadPrompt from "@components/utility/ReloadPrompt.vue"


//gsap
import gsap from "gsap"
import {Draggable} from "gsap/Draggable"

//other
import { devLog, isProd } from "@/utils"

gsap.registerPlugin(Draggable) 
const modalStore = useModalWindows()
const contentStore = useContentStore()
const { isDataFetched } = storeToRefs(contentStore)
const { fetchData } = contentStore
useRouter()
    .isReady()
    .then(async () => {
      if (!isDataFetched.value) {
        await fetchData()
        devLog("data fetched")
      }
    })
</script>

<template>
  <HeaderComponent />
  <main class="main">
    <RouterView name="LeftSidebar" />
    <RouterView />
    <RouterView name="RightSidebar" />
  </main>
  <VercelSpeedInsights v-if="isProd" />
  <Teleport to="body">
    <ModalWindow
      v-for="[key, _] of modalStore.modalData"
      :id="key"
      :key="key"
    />
  </Teleport>
  <ReloadPrompt /> 
</template>

<style scoped lang="scss">
.main{
  display: flex;
  flex:1 0 90%;
}
.footer{
  flex:.1 0 5%;
}
</style>
