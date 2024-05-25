<script setup lang="ts">
import {RouterView, useRoute} from 'vue-router'
import FooterComponent from "@components/layout/FooterComponent.vue"
import HeaderComponent from '@components/layout/header/HeaderComponent.vue';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap"
import {Draggable} from 'gsap/Draggable'
import ModalWindow from '@components/ModalWindow.vue';
import {useModalWindows} from '@stores/modalWindows';
import {isVertical} from '@/mediaGetters';
import {useContentStore} from '@stores/content';
import {storeToRefs} from 'pinia';
import {useFilterStore} from "@stores/filter";
import type {DataRoutes} from '@types';
import {computed, watch} from 'vue';

const route = useRoute()
const modalStore = useModalWindows()
gsap.registerPlugin(Draggable)
const contentStore = useContentStore()
const {isDataFetched, isFetchedByKey} = storeToRefs(contentStore)
const dataRouteName = computed(() => (route.name as string)?.replace('favorite', '').toLowerCase())
const {fetchData} = contentStore
const {fetchData: fetchFilters} = useFilterStore()
if (!isDataFetched.value) {
  fetchData().then(() => {
    console.log('data is fetched')
  })
  fetchFilters()
}
watch(route, () => console.log(route.name, route.path, route.path.includes('content')))
const isFetched = computed(() => isFetchedByKey.value[dataRouteName.value as DataRoutes] ?? null)
</script>

<template>
  <HeaderComponent/>
  <template v-if="isFetched || route.path.includes('content')">
    <RouterView/>
  </template>
  <template v-else>
    <div class="loading">
      <FontAwesomeIcon :icon="faSpinner" spin></FontAwesomeIcon>
    </div>
  </template>
  <FooterComponent v-if="!isVertical"/>
  <Teleport to="body">
    <ModalWindow v-for="[key, data] of modalStore.modalData" :key="key" :id="key" :show="data.show"></ModalWindow>
  </Teleport>
</template>

<style scoped lang="scss"></style>
