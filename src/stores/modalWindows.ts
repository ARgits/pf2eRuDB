import type { generalContent } from "@types";
import { defineStore } from "pinia";
import { ref, watch, type Ref } from "vue";
import { useContentStore } from "./content";

export const useModalWindows = defineStore('modalWindows', () => {
    const modalData: Ref<Map<generalContent["id"], { dataType: generalContent["dataType"], show: boolean }>> = ref(new Map())
    function addData(id: generalContent["id"], dataType: generalContent["dataType"]) {
        if (modalData.value.has(id)) {
            return
        }
        modalData.value.set(id, { dataType, show: false })
    }
    function showModal(id: generalContent["id"], dataType: generalContent["dataType"]) {
        if (!modalData.value.has(id)) {
            addData(id, dataType)
        }
        modalData.value.set(id, { dataType, show: true })

    }
    function closeModal(id: generalContent["id"]) {
        if (!modalData.value.has(id)) return
        const dataType = modalData.value.get(id)!.dataType
        modalData.value.set(id, { dataType, show: false })
        modalData.value.delete(id)
    }
    function getData(id: generalContent["id"]) {
        if (modalData.value.has(id)) {
            const dataType = modalData.value.get(id)!.dataType
            const contentStore = useContentStore()
            return contentStore.contentData[`${dataType}s`].find((v) => v.id === id)
        }
        return null
    }
    watch(modalData, () => console.log(modalData.value))
    return { modalData, addData, showModal, closeModal, getData }
})