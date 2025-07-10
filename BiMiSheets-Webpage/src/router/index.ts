import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/overview',
      name: 'overview',
      component: () => import('../views/SheetOverview.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/FilterSearch.vue'),
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateSheet.vue'),
    },
  ],
})

export default router
