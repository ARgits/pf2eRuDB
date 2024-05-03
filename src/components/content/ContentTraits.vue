<script setup lang="ts">
import type { generalContent } from '@types';

defineProps<{ content: generalContent }>()
</script>
<template>
    <div class="container">
        <div v-for="trait in content.traits" :key="content.id + trait">
            {{ trait }}
        </div>
    </div>
    <hr />
</template>
<style lang="scss" scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    gap: .25rem;

    &>* {
        font-family: Roboto Condensed, sans-serif;
      border: 1px solid #dac68a;
      border-right-width: 2px;
      border-left-width: 2px;
      border-radius: 2px;
        background-color: #59180df2;
        color: #fff;
        text-align: center;
        margin-top: 2px;
        margin-right: 2px;
        min-width: 30px;
        float: left;
        padding-left: 3px;
        padding-right: 3px;
    }
}
</style>