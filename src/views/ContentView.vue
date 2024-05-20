<script setup lang="ts">
import { watch } from 'vue';
import MobileMainLayout from '@/components/layout/MobileMainLayout.vue';
import DesktopMainLayout from '@/components/layout/DesktopMainLayout.vue';

import { useRoute } from 'vue-router';
import { isVertical } from '@/mediaGetters';

const route = useRoute()
watch(route, () => console.log(route))
</script>
<template>
  <main>
    <MobileMainLayout v-if="isVertical"></MobileMainLayout>
    <DesktopMainLayout v-else></DesktopMainLayout>
  </main>
</template>

<style scoped lang="scss">
main {
  flex-basis: 90%;
  display: flex;
  padding: 0 2rem;
  gap: 10px;
  justify-content: center;
  background-color: rgba(grey, .15);
  border: 1px solid transparent;
  border-radius: var(--border-radius);
}

@media (max-aspect-ratio: 1/1) {
  main {
    flex-basis: 95%;
    position: relative;
    padding: 0;
    flex-direction: column;
    //align-items: stretch;
    justify-content: space-around;
    background-color: unset;
  }


}
</style>
