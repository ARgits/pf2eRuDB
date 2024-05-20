<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useFavoritesStore } from "@stores/favorites"
import ContainerSlideTransition from '@/components/transitions/ContainerSlideTransition.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowTurnDown } from '@fortawesome/free-solid-svg-icons';
const route = useRoute()
const routeName = computed(() => route.name as string)
const favoriteStore = useFavoritesStore()
</script>
<template>
    <nav>
        <div>
            <RouterLink to="/feats">Способности</RouterLink>
            <RouterLink to="/backgrounds">Происхождения</RouterLink>
            <RouterLink to="/spells">Заклинания</RouterLink>
            <RouterLink to="/creatures">Бестиарий</RouterLink>
            <RouterLink to="/actions">Действия</RouterLink>
            <RouterLink to="/ancestries">Родословные</RouterLink>
            <RouterLink to="/favorites">Избранное</RouterLink>
        </div>
        <ContainerSlideTransition>
            <div v-if="routeName?.includes('favorite')">
                <RouterLink :to="{ name: 'favoriteFeats' }">Способности
                </RouterLink>
                <RouterLink :to="{ name: 'favoriteBackgrounds' }">
                    Происхождения
                </RouterLink>
                <RouterLink :to="{ name: 'favoriteSpells' }">Заклинания
                </RouterLink>
                <RouterLink :to="{ name: 'favoriteCreatures' }">Бестиарий
                </RouterLink>
                <RouterLink :to="{ name: 'favoriteActions' }">Действия
                </RouterLink>
                <RouterLink :to="{ name: 'favoriteAncestries' }">Родословные
                </RouterLink>
                <FontAwesomeIcon :icon="faArrowTurnDown" rotation="90" size="2x"></FontAwesomeIcon>
            </div>
        </ContainerSlideTransition>
    </nav>
</template>
<style scoped lang="scss">
nav {
    width: fit-content;
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    // gap: 10px;

    & a {
        padding: 0 1rem;
        border-radius: 5px 5px 0 0;
        background-color: rgba(grey, .55);
        font-size: 110%;
        // color: white;

        &.router-link-active {
            position: relative;
            background-color: rgba(grey, .15);
            color: black // transform: translateY(.5px);
                // top: 1px;
                // background-color: white
        }
    }

    &:not(:has(+ *)) a.router-link-active {
        background-color: unset;
        top: 0
    }
}

@media (max-aspect-ratio:1/1) {
    nav {
        display: none;
    }
}
</style>