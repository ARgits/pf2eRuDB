<script setup lang="ts">
import { devLog } from "@/utils"
import { useModalWindows } from "@stores/modalWindows"
import type { generalContent } from "@types"
import { useEventListener } from "@vueuse/core"
import { createDescHTML } from "@/markdown"
import { computed, nextTick, onMounted, ref, type Ref, watch } from "vue"

const {description} = defineProps<{ description: generalContent["description"] }>()
const descRef = ref(description)
const descComputed = computed(() => description)
const descElem: Ref<HTMLElement | null> = ref(null)
onMounted(() => {
  createDescHTML(description,descElem,descRef)
})

watch(descComputed, async () => {

  createDescHTML(description,descElem,descRef)
  await nextTick()
})
</script>
<template>
  <div
    ref="descElem"
    class="description"
    v-html="descRef"
  />
</template>
<style scoped lang="scss">
.description {
  overflow-y: auto;
  scrollbar-gutter: stable;

  & :global(button[data-id]) {
    padding: 0 0.25rem;
    background: rgba(grey, 0.25);
  }
}

p {
  color: transparent;
}
</style>