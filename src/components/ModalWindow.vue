<script setup lang="ts">
import { useModalWindows } from '@stores/modalWindows';
import type { generalContent } from '@types';
import { Draggable } from 'gsap/Draggable';
import { ref, type Ref, watch } from 'vue';
import ContentItem from './content/ContentItem.vue';
const props = defineProps<{ id: generalContent["id"], show: boolean }>()
const { getData } = useModalWindows()
const containerRef: Ref<HTMLElement | null> = ref(null)
watch(containerRef, () => {
    if (containerRef.value) { new Draggable(containerRef.value) }
})
const data = getData(props.id)
</script>
<template>
    <Transition name="fade">
        <div class="container" v-if="$props.show" ref="containerRef">
            <ContentItem :content="data" v-if="data" :in-grid="false" :modal="true"></ContentItem>
        </div>
    </Transition>
</template>
<style scoped lang="scss">
.container {
    position: absolute;
    border: 1px solid black;
    background: inherit;
    width: max-content;
    height: max-content;
    max-width: 50%;
    max-height: 50%;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.close {
    position: absolute;
    right: 0;
    top: 0;
    aspect-ratio: 1/1;
    border-color: transparent;

}

.fade {

    &-enter-active,
    &-leave-active {
        transition: all .5s ease;
    }

    &-enter-from,
    &-leave-to {
        opacity: 0
    }
}
</style>