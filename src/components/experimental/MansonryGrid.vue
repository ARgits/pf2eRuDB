<script setup lang="ts">
import { useResizeObserver, type UseResizeObserverReturn, type ResizeObserverEntry } from '@vueuse/core';
import { type Ref, ref, onUpdated, provide, onUnmounted } from 'vue';
const grid: Ref<HTMLDivElement | null> = ref(null);
// const empty: Ref<HTMLDivElement | null> = ref(null);
const renderDone = ref(false)
const resizeObserverArray: Ref<UseResizeObserverReturn[]> = ref([])
function anotherRedraw(entries: ReadonlyArray<ResizeObserverEntry>) {
    const entry = entries[0]
    const elem = entry.target as HTMLElement
    const { height } = entry.contentRect
    const gridRow = Math.min(50, Math.ceil((height + 12) / 20))
    elem.style.gridRow = `span ${gridRow}`
}


provide('mansonryGridDone', renderDone)
onUpdated(async () => {
    if (!grid.value?.children.length) return
    renderDone.value = false
    for (const observer of resizeObserverArray.value) {
        observer.stop()
    }
    resizeObserverArray.value = []
    for (const ind in [...grid.value.children] as HTMLDivElement[]) {
        // const emptyChild = grid.value.children.item(parseInt(ind)) as HTMLDivElement
        const gridChild = grid.value.children.item(parseInt(ind)) as HTMLDivElement
        const childOffsetH = Math.min(50, Math.ceil(gridChild.offsetHeight / 20));

        resizeObserverArray.value.push(useResizeObserver(gridChild, anotherRedraw))
        gridChild.style.gridRow = `span ${childOffsetH}`
        gridChild.dataset.gridCol = `${gridChild.style.gridColumnStart}`
        gridChild.dataset.gridRow = `${gridChild.style.gridRowStart}`
    }
    renderDone.value = true
    console.log('done')
})
onUnmounted(() => {
    for (const observer of resizeObserverArray.value) {
        observer.stop()
    }
})
</script>


<template>
    <div>
        <div class="grid" ref="grid">
            <slot></slot>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.empty {
    opacity: 0;
    position: absolute;
    z-index: -1;
    max-height: 100px;
    overflow-y: hidden;
}

.grid {
    --grid-column-gap: 10px;
    --grid-column-count: 4;
    --grid-item--min-width: 250px;
    --gap-count: calc(var(--grid-column-count) - 1);
    --total-gap-width: calc(var(--gap-count) * var(--grid-column-gap));
    --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr));
    column-gap: var(--grid-column-gap);
    // grid-template-rows: repeat(auto-fill, 10px);
    grid-auto-rows: auto;
    align-items: start;
    justify-items: center;
    justify-content: space-evenly;
    flex: 1 1 auto;
    overflow-y: auto;
    height: 0;
    // column-gap: .25rem;
    row-gap: 10px;

    &>:slotted(*) {
        grid-column: span 1;
    }

    @media (max-width:500px) {
        grid-template-columns: calc(1fr *0.95);
    }
}


// .content_transition {

//     &-enter-active,
//     &-leave-active,
//     &-move {
//         transition: all .25 ease-in
//     }

//     &-enter-from,
//     &-leave-to {
//         max-height: 0px;
//         max-width: 0px;
//     }
// }</style>