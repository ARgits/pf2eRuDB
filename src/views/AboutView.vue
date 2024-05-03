<script setup lang="ts">
import { computed } from 'vue';
import { useRoute,  } from 'vue-router';

const route = useRoute()
const dataType = computed(() => route.path.replace("/", ""))
console.log(dataType.value)
</script>
<template>
  <div class="about">
    <h1>This is an {{ dataType }} page</h1>
  </div>

</template>

<style scoped></style>
