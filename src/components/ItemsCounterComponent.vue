<script setup lang="ts">
import { useContentStore } from '@/stores/content';
import { storeToRefs } from 'pinia';
import { reactive, watch } from 'vue';
import gsap from 'gsap';
const { numOfItems } = storeToRefs(useContentStore())
const tweenNumber = reactive({ number: numOfItems.value })
watch(numOfItems, (n) => gsap.to(tweenNumber, { duration: .5, number: Number(n) || 0 }))
</script>
<template>
    <div>Найдено: {{ tweenNumber.number.toFixed(0) }}</div>
</template>
<style scoped lang="scss"></style>