<script setup lang="ts">
import DesktopHeader from "@components/layout/DesktopHeader.vue"
import MobileHeader from "@components/layout/MobileHeader.vue"
</script>
<template>
    <header>
        <DesktopHeader></DesktopHeader>
        <MobileHeader></MobileHeader>
    </header>
</template>
<style scoped lang="scss">
header {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex-basis: 5%;
    // margin: 0 auto;
    max-width: calc(100% - 4rem);
    width: fit-content;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0 2rem;
}
@media (max-aspect-ratio: 1/1) {
  header{
    flex-basis: 0;
  }
}
</style>