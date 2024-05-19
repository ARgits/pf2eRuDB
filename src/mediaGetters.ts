import { ref, type Ref } from "vue";

export const isVertical = ref(window.matchMedia('(max-aspect-ratio:1/1)').matches)
window.matchMedia('(max-aspect-ratio:1/1)').addEventListener('change', (ev: MediaQueryListEvent) => {
    isVertical.value = (ev.currentTarget as MediaQueryList).matches
})
export const currentMobileMenu: Ref<"content" | "router" | "favorites" | "filterSearch" | "about"> = ref("content")