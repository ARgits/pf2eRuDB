<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useFavoritesStore } from "@stores/favorites"
const route = useRoute()
const routeName = computed(() => route.name as string)
const favoriteStore = useFavoritesStore()
</script>
<template>
    <nav>
        <RouterLink to="/feats">Способности</RouterLink>
        <RouterLink to="/backgrounds">Происхождения</RouterLink>
        <RouterLink to="/spells">Заклинания</RouterLink>
        <RouterLink to="/creatures">Бестиарий</RouterLink>
        <RouterLink to="/actions">Действия</RouterLink>
        <RouterLink to="/ancestries">Родословные</RouterLink>
        <RouterLink to="/favorites">Избранное</RouterLink>
    </nav>
    <nav v-if="routeName?.includes('favorite')">
        <RouterLink :to="{ name: 'favoriteFeats' }" v-if="favoriteStore.data['feats'].length">Способности
        </RouterLink>
        <RouterLink :to="{ name: 'favoriteBackgrounds' }" v-if="favoriteStore.data['backgrounds'].length">
            Происхождения
        </RouterLink>
        <RouterLink :to="{ name: 'favoriteSpells' }" v-if="favoriteStore.data['spells'].length">Заклинания
        </RouterLink>
        <RouterLink :to="{ name: 'favoriteCreatures' }" v-if="favoriteStore.data['creatures'].length">Бестиарий
        </RouterLink>
        <RouterLink :to="{ name: 'favoriteActions' }" v-if="favoriteStore.data['actions'].length">Действия
        </RouterLink>
        <RouterLink :to="{ name: 'favoriteAncestries' }" v-if="favoriteStore.data['ancestries'].length">Родословные
        </RouterLink>
    </nav>

</template>
<style scoped lang="scss">
nav {
    &:not(:first-child) {
        width: fit-content;
        background-color: rgba(grey, .25);
        border-radius: 5px 0 5px 5px;
    }

    & a {
        padding: 0 1rem;
        border-radius: 5px 5px 0 0;

        &.router-link-active {
            position: relative;
            top: 2px;
            color: red;
            background-color: rgba(grey, .25);
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