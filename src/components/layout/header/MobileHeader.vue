<script setup lang="ts">
import { watch } from 'vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars, faStar, faFilter, faInfo } from '@fortawesome/free-solid-svg-icons';
import { useRoute } from 'vue-router';
import { currentMobileMenu } from '@/mediaGetters';
// const isVisible = ref(false)
const route = useRoute()
watch(route, () => currentMobileMenu.value = 'content')
function changeMenu(menuName: 'router' | 'about' | 'favorites' | 'filterSearch') {
  currentMobileMenu.value = currentMobileMenu.value === menuName ? 'content' : menuName
}
</script>
<template>
  <header class="mobile">
    <button @click="changeMenu('router')">
      <FontAwesomeIcon :icon="faBars" size="3x"></FontAwesomeIcon>
    </button>
    <button @click="changeMenu('favorites')">
      <FontAwesomeIcon :icon="faStar" size="3x"></FontAwesomeIcon>
    </button>
    <button @click="changeMenu('filterSearch')">
      <FontAwesomeIcon :icon="faFilter" size="3x"></FontAwesomeIcon>
    </button>
    <button @click="changeMenu('about')">
      <FontAwesomeIcon :icon="faInfo" size="3x"></FontAwesomeIcon>
    </button>
  </header>
</template>
<style lang="scss" scoped>
header.mobile {
  // display: flex;
  max-width: 100%;
  width: auto;
  gap: 10px;
  // max-height: 100%;
}

button {
  flex: 1;
  border: none;
}
</style>