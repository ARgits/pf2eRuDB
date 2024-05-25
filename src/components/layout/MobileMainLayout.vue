<script setup lang="ts">
import FilterComponent from '@components/filter/FilterComponent.vue';
import SearchComponent from '@components/SearchComponent.vue';
import { currentMobileMenu } from "@/mediaGetters"
// import ContentContainer from '../content/ContentContainer.vue';
import TableComponent from '@components/TableComponent.vue';
import { useRoute } from "vue-router";
import FooterComponent from "@components/layout/FooterComponent.vue";
import { computed } from "vue";

const route = useRoute()
const routeName = computed(() => route.name as string)
const nameToTab: Record<string, string> = {
  spells: 'Заклинания',
  backgrounds: 'Происхождения',
  actions: 'Действия',
  feats: 'Способности',
  creatures: 'Бестиарий',
  ancestries: 'Родословные'
}
const tabName = computed(() => {
  console.log(routeName.value)
  let name = ''
  if (routeName.value.includes('favorite')) {
    name += 'Избранное: '
  }
  name += nameToTab[routeName.value.replace('favorite', '').toLowerCase()]
  return name
})
</script>
<template>
  <template v-if="currentMobileMenu === 'content'">
    <h3>{{ tabName }}</h3>
    <TableComponent></TableComponent>
  </template>
  <template v-else-if="currentMobileMenu === 'filterSearch'">
    <SearchComponent></SearchComponent>
    <FilterComponent></FilterComponent>
  </template>
  <template v-else-if="currentMobileMenu === 'router'">

    <RouterLink :to="{ name: 'backgrounds' }">Происхождения</RouterLink>
    <RouterLink :to="{ name: 'feats' }">Способности</RouterLink>
    <RouterLink :to="{ name: 'actions' }">Действия</RouterLink>
    <RouterLink :to="{ name: 'creatures' }">Бестиарий</RouterLink>
    <RouterLink :to="{ name: 'spells' }" v-if="route.name !== 'spells'">Заклинания</RouterLink>
    <RouterLink :to="{ name: 'ancestries' }" v-if="route.name !== 'ancestries'">Родословные</RouterLink>

  </template>
  <template v-else-if="currentMobileMenu === 'favorites'">
    <div>Избранное</div>
    <RouterLink :to="{ name: 'favoriteBackgrounds' }" v-if="route.name !== 'favoriteBackgrounds'">Происхождения
    </RouterLink>
    <RouterLink :to="{ name: 'favoriteFeats' }" v-if="route.name !== 'favoriteFeats'">Способности</RouterLink>
    <RouterLink :to="{ name: 'favoriteActions' }" v-if="route.name !== 'favoriteActions'">Действия</RouterLink>
    <RouterLink :to="{ name: 'favoriteCreatures' }" v-if="route.name !== 'favoriteCreatures'">Бестиарий</RouterLink>
    <RouterLink :to="{ name: 'favoriteSpells' }" v-if="route.name !== 'favoriteSpells'">Заклинания</RouterLink>
    <RouterLink :to="{ name: 'favoriteAncestries' }" v-if="route.name !== 'ancestries'">Родословные</RouterLink>
  </template>
  <template v-else-if="currentMobileMenu === 'about'">
    <FooterComponent></FooterComponent>
  </template>
</template>
<style lang="scss" scoped>
* {
  text-align: center;
}

h3 {
  margin: 0;
}

a {
  flex: 1;
  border: 1px solid black;
  border-radius: var(--border-radius);
  padding: .5rem;
  margin: 0 auto;
  text-decoration: unset;
}
</style>