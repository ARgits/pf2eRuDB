<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ContainerSlideTransition from '@components/transitions/ContainerSlideTransition.vue';
import { useRoute } from 'vue-router';
import { useFavoritesStore } from '@stores/favorites';
const isVisible = ref(false)
const route = useRoute()
const routeName = computed(() => route.name as string)
const favoriteStore = useFavoritesStore()
watch(route, () => isVisible.value = false)
</script>
<template>
    <ContainerSlideTransition>
        <div class="nav" v-if="isVisible">
            <nav>
                <RouterLink to="/feats">Способности</RouterLink>
                <RouterLink to="/backgrounds">Происхождения</RouterLink>
                <RouterLink to="/spells">Заклинания</RouterLink>
                <RouterLink to="/creatures">Бестиарий</RouterLink>
                <RouterLink to="/actions">Действия</RouterLink>
                <RouterLink to="/favorites">Избранное</RouterLink>
            </nav>
            <nav v-if="routeName?.includes('favorite')" class="favorites">
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
            </nav>
        </div>
    </ContainerSlideTransition>
    <button @click="isVisible = !isVisible">
        <FontAwesomeIcon :icon="faBars" size="3x"></FontAwesomeIcon>
    </button>
</template>
<style lang="scss" scoped>
.nav {
    display: flex;
    gap: 10px;
    position: absolute;
    top: 0;
    left: 0;
    background: grey;
    z-index: 1;
  padding: 2rem 2rem 1rem;
  border: 1px solid transparent;
    border-radius: var(--border-radius);
}

button {
    position: absolute;
    border: none;
    aspect-ratio: 1/1;
    z-index: 1;

    & svg {
        width: 100%;
        height: 100%;
    }
}

nav {
    display: flex;
    flex-direction: column;

    &.favorites {}

    & a {
        &:hover {
            background-color: rgba(255, 255, 255, .2)
        }

        &:not(:last-child) {
            padding-bottom: .5rem;
        }
    }
}

@media (min-aspect-ratio:1/1) {

    nav,
    button {
        display: none;
    }
}
</style>