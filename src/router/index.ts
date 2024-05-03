import { useFavoritesStore } from '@stores/favorites'
import type { DataRoutes } from '@types'
import { capitalize } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { path: '/backgrounds' }
    },
    {
      path: '/feats',
      name: "feats",
      component: () => import('@views/ContentView.vue'),
    },
    {
      path: '/backgrounds',
      name: "backgrounds",
      component: () => import('@views/ContentView.vue')
    },
    {
      path: '/spells',
      name: "spells",
      component: () => import('@views/ContentView.vue')
    },
    {
      path: '/actions',
      name: "actions",
      component: () => import('@views/ContentView.vue')
    },
    {
      path: '/creatures',
      name: "creatures",
      component: () => import('@views/ContentView.vue'),
    },
    {
      path: '/favorites',
      redirect: _ => {
        const favoritesStore = useFavoritesStore()
        for (const path of ['feats', 'spells', 'backgrounds', 'creatures', 'actions',] as DataRoutes[]) {
          if (favoritesStore.data[path].length) {
            return { name: `favorite${capitalize(path)}` }
          }
        }
        return { name: 'favoriteFeats' }
      },
      // component: () => import('@views/ContentView.vue'),
      children: [
        // { path: '', alias: 'favoriteFeats', component: () => import('@views/ContentView.vue') },
        { path: 'feats', name: "favoriteFeats", component: () => import('@views/ContentView.vue'), },
        { path: 'spells', name: "favoriteSpells", component: () => import('@views/ContentView.vue'), },
        { path: 'actions', name: "favoriteActions", component: () => import('@views/ContentView.vue'), },
        { path: 'backgrounds', name: "favoriteBackgrounds", component: () => import('@views/ContentView.vue'), },
        { path: 'creatures', name: "favoriteCreatures", component: () => import('@views/ContentView.vue'), },
        // { path: '/favorites/spells', component: () => import('@views/ContentView.vue') }
      ]
    },
    {
      path: '/content:id',
      component: () => import('@views/ItemView.vue')
    }
  ]
})

export default router
