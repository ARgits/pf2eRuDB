<script setup lang="ts">
import { ref, watch, } from 'vue'
import gsap from 'gsap';
import { useElementSize } from '@vueuse/core';
const { maxHeight, onComplete, } = withDefaults(defineProps<{ maxHeight?: number, onComplete?: () => void }>(), { maxHeight: 500, onComplete: () => { } })
const elemRef = ref()
const { height } = useElementSize(elemRef)
const transitionDone = ref(true)

/**in cases where element changes its' height without transitioning (when we filter options for example) */
watch(height, () => {
    if (transitionDone.value) {
        console.log('onEnter')
        onEnter(elemRef.value, () => { })
    }
})
function onBeforeEnter(el: Element) {
    elemRef.value = el
    transitionDone.value = false
    gsap.set(el, {
        overflowY: "hidden",
        opacity: 0,
        minHeight: 0
    })
    gsap.to(el, {
        opacity: 1,
    })
}
function onEnter(el: Element, done: () => void) {
    const maxElemHeight = Math.min(el.getBoundingClientRect().height * 1.5, maxHeight) + "px"
    gsap.to(el, {
        maxHeight: maxElemHeight,
        onComplete: () => {
            gsap.set(el, { clearProps: "minHeight", overflowY: "auto", })
            done();
            onComplete();

        }
    })
}
function onAfterEnter(el: Element) {
    gsap.set(el, {
        onComplete: () => {
            transitionDone.value = true;
        }
    })
}

function onLeave(el: Element, done: () => void) {
    transitionDone.value = false
    console.log('leave')
    gsap.to(el, {
        maxHeight: 0,
        minHeight: 0,
        overflowY: "hidden",
        onComplete: () => {
            done();
            onComplete();
            transitionDone.value = true
        }
    })
}
</script>
<template>
    <Transition name="containerSlide" :css="false" @before-enter="onBeforeEnter" @enter="onEnter"
        @after-enter="onAfterEnter" @leave="onLeave" appear>
        <slot />
    </Transition>
</template>
<style lang="scss"></style>