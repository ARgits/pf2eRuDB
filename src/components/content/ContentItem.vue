<script setup lang="ts">
import { ref, type Ref, } from "vue"

import type { generalContent } from '@types';
import ContentDescription from "./ContentDescription.vue";
import ContentTraits from "./ContentTraits.vue";
import ContainerSlideTransition from "@components/transitions/ContainerSlideTransition.vue";
import FavoriteButton from "./FavoriteButton.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import RotateTransition from "@components/transitions/RotateTransition.vue";
import { useModalWindows } from "@stores/modalWindows";
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
const props = defineProps<{ content: generalContent, inGrid: boolean, modal?: boolean }>()

const { closeModal } = useModalWindows()

const itemElem: Ref<HTMLDivElement | null> = ref(null);
const nameElem: Ref<HTMLDivElement | null> = ref(null);
// const { height, width } = useElementSize(itemElem)
const isDescVisible = ref(false)
function showHideDesc() {
    isDescVisible.value = !isDescVisible.value
    console.log(props.content)
    if (isDescVisible.value) {
        itemElem.value!.scrollIntoView({ behavior: 'smooth' })

    } else {
        itemElem.value!.children.item(1)!.scrollTop = 0
    }
}
function close() {
    closeModal(props.content.id)
}
</script>
<template>
    <div class="content_item" ref="itemElem">
        <div class="name" ref="nameElem">
            <button @click="close" class="close" v-if="modal">
                <FontAwesomeIcon :icon="faSquareXmark"></FontAwesomeIcon>
            </button>
            <FavoriteButton :id="content.id" :dataType="content.dataType"></FavoriteButton>
            <span v-if="content.name">{{ content.name }} ({{ content.originalName }}) {{
                "level" in content ? `/
                ${content.level}` : ''
              }}</span>
            <span v-else v-html="content.fullName"></span>
            <hr />
        </div>
        <ContentTraits v-if="content.traits?.length" :content="content"></ContentTraits>
      <button @click="showHideDesc">
        <RotateTransition angle="180deg" :trigger="isDescVisible">
          <FontAwesomeIcon :icon="faCaretDown"></FontAwesomeIcon>
        </RotateTransition>
        Описание
        <RotateTransition angle="180deg" :trigger="isDescVisible">
          <FontAwesomeIcon :icon="faCaretDown"></FontAwesomeIcon>
        </RotateTransition>
      </button>
        <ContainerSlideTransition>
            <ContentDescription v-if="isDescVisible" :description="content.desc">
            </ContentDescription>
        </ContainerSlideTransition>


    </div>
</template>
<style lang="scss" scoped>
.content_item {
    border: 1px solid black;
    border-radius: var(--border-radius);
    padding: 5px;
    width: calc(100% - 12px);
    max-width: 100%;
    max-height: 500px;
    scrollbar-gutter: stable;
    height: min-content;
    display: flex;
    flex-direction: column;
    transition: 1s;

}

.close {
    display: inline;
    padding: 0;
    float: right;
    border: 0;
    background: none;
    margin: 5px;
    height: 1.5rem;
}

.name {

    & span {
        font-size: 110%;
        width: min-content;
    }
}

@media (max-aspect-ratio:1/1) {
    .content_item {
        --max-width: 100%;
    }
}
</style>