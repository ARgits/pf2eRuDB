<script setup lang="ts">
import { RouterView } from 'vue-router'
import FooterComponent from "@components/layout/FooterComponent.vue"
import HeaderComponent from '@components/layout/HeaderComponent.vue';
import gsap from "gsap"
import { Draggable } from 'gsap/Draggable'
import ModalWindow from '@components/ModalWindow.vue';
import { useModalWindows } from '@stores/modalWindows';
const modalStore = useModalWindows()
gsap.registerPlugin(Draggable)
</script>

<template>
  <HeaderComponent />
  <RouterView />
  <FooterComponent />
  <Teleport to="body">
    <ModalWindow v-for="[key, data] of modalStore.modalData" :key="key" :id="key" :show="data.show"></ModalWindow>
  </Teleport>
</template>

<style scoped lang="scss"></style>
