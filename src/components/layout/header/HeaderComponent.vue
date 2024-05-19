<script setup lang="ts">
import DesktopHeader from "@components/layout/header/DesktopHeader.vue"
import MobileHeader from "@components/layout/header/MobileHeader.vue"
import { isVertical } from "@/mediaGetters";
console.log(isVertical)
</script>
<template>
  <MobileHeader v-if="isVertical"></MobileHeader>
  <DesktopHeader v-else></DesktopHeader>
</template>
<style scoped lang="scss">
header {
  display: flex;
  // flex-direction: column;
  // align-items: flex-end;
  flex-basis: 5%;
  // margin: 0 auto;
  max-width: calc(100% - 4rem);
  width: fit-content;
  // overflow-x: auto;
  // overflow-y: hidden;
  // padding: 0 2rem;
}
</style>