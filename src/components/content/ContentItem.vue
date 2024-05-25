<script setup lang="ts">
import { computed, ref, type Ref, } from "vue"

import type { generalContent } from '@types';
import ContentDescription from "./ContentDescription.vue";
import ContentTraits from "./ContentTraits.vue";
import ContainerSlideTransition from "@components/transitions/ContainerSlideTransition.vue";
import FavoriteButton from "./FavoriteButton.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCaretDown, faSquareXmark, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import RotateTransition from "@components/transitions/RotateTransition.vue";
import { useModalWindows } from "@stores/modalWindows";
import { useRoute, useRouter } from "vue-router";

const props = defineProps<{ content: generalContent, modal?: boolean, isDescOpened?: boolean }>()
const router = useRouter();
const route = useRoute()
const isStandAlone = computed(() => route.path.includes('content') && route.params.id === props.content.id)
const { closeModal } = useModalWindows()

const itemElem: Ref<HTMLDivElement | null> = ref(null);
const nameElem: Ref<HTMLDivElement | null> = ref(null);
// const { height, width } = useElementSize(itemElem)
const isDescVisible = ref(props.isDescOpened ?? false)

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
function openInOthertab() {

  const routeData = router.resolve({ path: `/content/${props.content.id}`, });
  window.open(routeData.href, '_blank');
}
</script>
<template>
  <div class="content_item" ref="itemElem">
    <div class="name" ref="nameElem">
      <button @click="close" class="close" v-if="modal">
        <FontAwesomeIcon :icon="faSquareXmark"></FontAwesomeIcon>
      </button>
      <button @click="openInOthertab" v-if="!isStandAlone">
        <FontAwesomeIcon :icon="faArrowUpRightFromSquare"></FontAwesomeIcon>
      </button>
      <FavoriteButton :id="content.id" :dataType="content.dataType"></FavoriteButton>

      <div v-if="content.name">
        <div>{{ content.name }}</div>
        <div>{{ content.originalName }}</div>
        <div v-if="'level' in content">Уровень: {{ content.level }}</div>
      </div>
      <div v-else v-html="content.fullName"></div>
      <hr />
    </div>
    <ContentTraits v-if="content.traits?.length" :content="content"></ContentTraits>
    <button @click="showHideDesc" v-if="!isStandAlone">
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
  background: var(--background-img);

  &>button {
    background-color: hsla(0, 0%, 0%, .1);
  }

  & .name button {
    border: none;
    display: inline;
    float: right;
    margin: 5px;
    // height: 1.5rem;
  }
}

button .close {
  display: inline;
  padding: 0;
  float: right;
  border: 0;
  background: none;
  margin: 5px;
  height: 1.5rem;
}

.name {

  &>div {
    font-size: 110%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
}

@media (max-aspect-ratio: 1/1) {
  .content_item {
    --max-width: 100%;
  }
}
</style>