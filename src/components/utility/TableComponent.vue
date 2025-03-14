<script setup lang="ts">
import PaginationComponent from "@components/utility/PaginationComponent.vue";
import ContentContainer from "@components/content/ContentContainer.vue";
</script>
<template>
  <div class="main content">
    <ContentContainer class="content_group" />
    <PaginationComponent />
  </div>
</template>
<style scoped lang="scss">
.main.content {
  display: flex;
  flex-direction: column;
  flex-basis: calc(70% - var(--gap));
  flex-grow:1;
  gap: 10px;
}


.loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  position: relative;
}



.loading {
  align-self: center;
}
</style>