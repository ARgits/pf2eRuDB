<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { usePaginationStore } from '@stores/pagination';

const paginationStore = usePaginationStore()
</script>
<template>
    <div class="pagination" v-if="paginationStore.numOfPages > 1">
        <button @click="paginationStore.changePage(paginationStore.currentPage - 1)"
            :class="{ hidden: paginationStore.currentPage === 0 }">
            <FontAwesomeIcon :icon="faArrowLeft"></FontAwesomeIcon>
        </button>
        <div v-for="(page, index) of paginationStore.pages" :key="index">
            <button v-if="page !== '...'" @click="paginationStore.changePage(page)"
                :class="{ active: paginationStore.currentPage === page }">{{ page + 1 }}</button>
            <span v-else>{{ page }}</span>
        </div>
        <button @click="paginationStore.changePage(paginationStore.currentPage + 1)"
            :class="{ hidden: paginationStore.currentPage === paginationStore.numOfPages - 1 }">
            <FontAwesomeIcon :icon="faArrowRight"></FontAwesomeIcon>
        </button>
    </div>
</template>
<style lang="scss">
.pagination {
    flex-basis: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & button {
        height: 1.5rem;
        aspect-ratio: 1/1;
        border-radius: var(--border-radius);
        background-color: rgba(grey, .1);
        transition: all .5s ease;

        &.active {
            background-color: green;
        }

        &.hidden {
            opacity: 0
        }

        &:active {
            background-color: grey;
        }
    }
}
</style>