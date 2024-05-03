<script setup lang="ts">
import { useModalWindows } from '@stores/modalWindows';
import type { generalContent } from '@types';
import { useEventListener } from '@vueuse/core';
import { onMounted, onUpdated, ref, type Ref } from 'vue';
const props = defineProps<{ description: generalContent["desc"] }>()
const descRef = ref(props.description)
const descElem: Ref<HTMLElement | null> = ref(null)
const { showModal } = useModalWindows()
onMounted(() => {
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = props.description
    for (const elem of tempDiv.querySelectorAll("[data-id]") as NodeListOf<HTMLElement>) {
        console.log(elem.outerHTML)
        elem.outerHTML = `<button data-id=${elem.dataset.id} data-type=${elem.dataset.type}>${elem.outerHTML}</button>`
    }
    descRef.value = tempDiv.innerHTML
})
onUpdated(() => {
    console.log('update', descElem.value)
    if (!descElem.value) return
    for (const button of descElem.value.querySelectorAll('button')) {
        useEventListener(button, 'click', () => {
            console.log('click', button.dataset.id)
            showModal(button.dataset.id as generalContent["id"], button.dataset.type as generalContent["dataType"])
        })
    }
})
</script>
<template>
    <div class="description" ref="descElem">
        <div v-html="descRef"></div>
    </div>
</template>
<style scoped lang="scss">
.description {
    overflow-y: auto;

    & :global(button[data-id]) {
        padding: 0 0.25rem;
        background: rgba(grey, 0.25);
    }
}
</style>